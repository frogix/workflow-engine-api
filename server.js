const express = require('express');
const machineRoutes = require('./server/machine/machine.route');

const router = express.Router(); // eslint-disable-line new-cap

// mount machine routes at /machine
router.use('/machine', machineRoutes);

module.exports = router;
