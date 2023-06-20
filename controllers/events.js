const {response, request} = require('express');
const Event = require('./../models/Event');


/*{
    ok: true,
    msg: 'Obtener eventos'
}*/

const getEvents = async(req = request, res = response) => {

    const events = await Event.find()
    .populate('user', 'name email');

    res.json({
        ok: true,
        events: events
    });
};

const createEvent = async(req = request, res = response) => {

    const event = new Event(req.body);

    try {

        event.user = req.uid;

        const eventDB = await event.save();

        res.status(201).json({
            ok: true,
            event: eventDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Please contact admin or support.'
        });
    }
};

const updateEvent = async(req = request, res = response) => {

    const eventId = req.params.id;
    const uid = req.uid;

    try {
        
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'No one event exists with that id.'
            });
        }

        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'User cannot edit event of another user.'
            });
        }

        const newEvent = {
            ...req.body,
            user: uid
        }

        const eventUpdated = await Event.findByIdAndUpdate(eventId, newEvent, {new: true});

        res.json({
            ok: true,
            event: eventUpdated
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Please contact admin or support.'
        });
    }
};

const deleteEvent = async(req = request, res = response) => {

    const eventId = req.params.id;
    const uid = req.uid;

    try {
        
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'No one event exists with that id.'
            });
        }

        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'User cannot delete event of another user.'
            });
        }

        const eventDeleted = await Event.findByIdAndDelete(eventId);

        res.json({
            ok: true,
            event: eventDeleted
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Please contact admin or support.'
        });
    }
};

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent,

}