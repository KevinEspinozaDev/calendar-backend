const express = require('express');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { validateJWT } = require('../middlewares/jwt-validators');

const router = express.Router();
router.use(validateJWT); // Every request will use validateJWT middleware

/*
Event routes
/api/events
*/

router.get('/', getEvents);

// Crear eventos
router.post('/', createEvent);

// Actualizar evento
router.put('/:id', updateEvent);

// Borrar evento
router.delete('/:id', deleteEvent);

module.exports = router;