const express = require('express');
const {validate} = require('express-validation');
const paramValidation = require('../../config/param-validation');
const machineCtl = require('./machine.controller');

const router = express.Router();

router.route('/')
  /** GET /api/machine - Get list of machines */
  .get(machineCtl.list)

  /** POST /api/machine - Create new machine */
  // .post(validate(paramValidation.createMachine), machineCtl.create);
  .post(machineCtl.create)



router.route('/:machineId/state')
  /** GET /api/machine/:machineId/state - Get current state of the machine */
  .get(machineCtl.getState)


router.route('/:machineId/change')
  /** POST /api/machine/:machineId/change - Update machine to change */
  .post(machineCtl.update)

router.route('/:machineId/event')
  /** POST /api/machine/:machineId/event - Dispatch event */
  .post(machineCtl.dispatchEvent)


router.route('/:machineId')
  /** GET /api/machine/:machineId - Get machine */
  .get(machineCtl.get)

  /** PUT /api/machine/:machineId - Update machine */
  // .put(validate(paramValidation.updateMachine), machineCtl.update)
  // .put(machineCtl.create)

  /** DELETE /api/machine/:machineId - Delete machine */
  .delete(machineCtl.remove);

/** Load machine when API with machineId route parameter is hit */
router.param('machineId', machineCtl.load);

module.exports = router;
