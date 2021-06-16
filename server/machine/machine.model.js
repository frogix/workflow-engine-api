const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

/**
 * Machine Schema
 */
const MachineSchema = new mongoose.Schema({
    availableStates: [],
    availableTransitions: [],
    conditionalTriggers: [],
    eventTriggers: [],
    object: {
      fields: []
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    initialStateId: Number,
    currentStateId: Number
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
MachineSchema.method({
  applyChange: function(changeObj) {
    if (!changeObj) {
      const err = new APIError("Change object was not specified", httpStatus.BAD_REQUEST)
      return Promise.reject(err);
    }

    let obj = this.object

    let changedFields = changeObj.fields
    for (let changedField of changedFields) {
      for (let objField of obj.fields) {
        if (objField.name === changedField.fieldName) {
          objField.value = changedField.newValue
        }
      }
    }

    return this.save().then(this.checkConditions())
  },

  checkConditions: async function() {
    let conditions = this.conditionalTriggers
    let object = this.object
    let fields = object.fields

    let resultPromises = []

    for (let condition of conditions) {
      let {fieldName, conditionOperator, compareTo, nextStateId} = condition

      let fieldObj = fields.filter(field => field.name === fieldName)[0]
      let currentValue = fieldObj.value

      let isTriggered;
      switch (conditionOperator) {
        case "<":
          isTriggered = currentValue < compareTo
          break;
        case "<=":
          isTriggered = currentValue <= compareTo
          break;
        case ">":
          isTriggered = currentValue > compareTo
          break;
        case ">=":
          isTriggered = currentValue >= compareTo
          break;
        case "=":
          isTriggered = currentValue === compareTo
          break;
        case "!=":
          isTriggered = currentValue !== compareTo
          break;
        default:
          const err = new APIError("Specified conditional operator is not supported", httpStatus.BAD_REQUEST)
          return Promise.reject(err);
      }

      if (isTriggered) {
        await this.changeState(nextStateId)
      }
    }

    if (resultPromises.length) resultPromises.push(this.save())

    return Promise.all(resultPromises)
  },

  dispatchEvent: function(eventName) {
    let machineEvent = this.getEventTriggerByName(eventName)

    if (!machineEvent) {
      const err = new APIError("Specified event was not declared at initial state", httpStatus.BAD_REQUEST)
      return Promise.reject(err);
    }

    return this.changeState(machineEvent.nextStateId)
  },

  changeState: function(newStateId) {
    if (this.currentStateId === newStateId) return this.save()

    let availableTransitions = this.getAvailableTransitionsForNow()

    if (!availableTransitions.length) {
        const err = new APIError('There are no available transitions from current state', httpStatus.BAD_REQUEST);
        return Promise.reject(err);
    }

    let transition = availableTransitions.filter((transitionObj) => transitionObj.next.id === newStateId)[0]

    if (!transition) {
      const err = new APIError(`State transition is unavailable: ${this.currentStateId}->${newStateId}`, httpStatus.BAD_REQUEST);
        return Promise.reject(err);
    }

    this.currentStateId = transition.next.id
    return this.save()
  },

  getAvailableTransitionsForNow: function() {
    return this.availableTransitions.filter((transitionObj) => transitionObj.previous.id === this.currentStateId)
  },

  getEventTriggerByName: function(eventName) {
    return this.eventTriggers.filter( (triggerObj) => triggerObj.name === eventName)[0]
  },

  getCurrentStateObj: function() {
    return this.availableStates.filter((stateObj) => stateObj.id === this.currentStateId)[0]
  }
});

/**
 * Statics
 */
MachineSchema.statics = {
  /**
   * Get machine
   * @param {ObjectId} id - The objectId of machine.
   * @returns {Promise<Machine, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((machine) => {
        if (machine) {
          return machine;
        }
        const err = new APIError('No such machine exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List machines in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of machines to be skipped.
   * @param {number} limit - Limit number of machines to be returned.
   * @returns {Promise<Machine[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};

/**
 * @typedef Machine
 */
module.exports = mongoose.model('Machine', MachineSchema);
