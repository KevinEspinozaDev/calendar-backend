const express = require('express');
const {check} = require('express-validator');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { validateJWT } = require('../middlewares/jwt-validators');
const {validateFields} = require('./../middlewares/fields-validators');
const {isDate} = require('./../helpers/isDate');

const router = express.Router();
router.use(validateJWT); // Every request will use validateJWT middleware

/*
Event routes
/api/events
*/

// Get
router.get('/', getEvents);

// Create
router.post('/', 
    [
        check('title', 'Title is obligatory.').not().isEmpty(),
        check('start', 'Start date is obligatory.').custom(isDate), //Custom boolean validation
        check('end', 'End date is obligatory.').custom(isDate),
        validateFields
    ],
    createEvent
);

// Update
router.put('/:id', updateEvent);

// Delete
router.delete('/:id', deleteEvent);

module.exports = router;