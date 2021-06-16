const Machine = require('./machine.model');
const APIError = require('../helpers/APIError')
const httpStatus = require('http-status');

/**
 * Load machine and append to req.
 */
function load(req, res, next, id) {
  Machine.get(id)
    .then((machine) => {
      req.machine = machine; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get machine
 * @returns {Machine}
 */
function get(req, res) {
  return res.json(req.machine);
}

/**
 * Create new machine
 * @returns {machine}
 */
function create(req, res, next) {
  let body = req.body
  const machine = new Machine({
    availableStates: body.availableStates,
    availableTransitions: body.availableTransitions,
    conditionalTriggers: body.conditionalTriggers,
    eventTriggers: body.eventTriggers,
    object: body.object,
    initialStateId: body.initialStateId,
    currentStateId: body.initialStateId
  });

  machine.save()
    .then(savedMachine => res.json(savedMachine))
    .catch(e => next(e));
}

/**
 * Update existing machine
 * @property {string} req.body.machinename - The machinename of machine.
 * @property {string} req.body.mobileNumber - The mobileNumber of machine.
 * @returns {machine}
 */
function update(req, res, next) {
  const machine = req.machine;

  machine.applyChange(req.body)
    .then(stateObj => res.json(stateObj))
    .catch(e => next(e));
}

/**
 * Get machine list.
 * @property {number} req.query.skip - Number of machines to be skipped.
 * @property {number} req.query.limit - Limit number of machines to be returned.
 * @returns {Machine[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Machine.list({ limit, skip })
    .then(machines => res.json(machines))
    .catch(e => next(e));
}

/**
 * Delete machine.
 * @returns {Machine}
 */
function remove(req, res, next) {
  const machine = req.machine;
  machine.remove()
    .then(deletedMachine => res.json(deletedMachine))
    .catch(e => next(e));
}

function getState(req, res, next) {
  // if (!req.machine) {
  //   return next(new APIError("Machine not found", httpStatus.NOT_FOUND)
  // }

  let currentStateObj = req.machine.getCurrentStateObj()

  if (currentStateObj) {
    return res.send(currentStateObj)
  }

  next(new APIError("Current object state is not in available list", httpStatus.INTERNAL_SERVER_ERROR))
}

function dispatchEvent(req, res, next) {
  let machine = req.machine
  let eventName = req.body.name

  machine.dispatchEvent(eventName)
    .then(machine => res.send({stateId: machine.currentStateId}))
    .catch(e => next(e));
}

module.exports = { load, get, create, update, list, remove, getState, dispatchEvent };
