const {response, request} = require('express');


/*{
    ok: true,
    msg: 'Obtener eventos'
}*/

const getEvents = async(req = request, res = response) => {

    res.json({
        ok: true,
        msg: 'Obtener eventos'
    });
};

const createEvent = async(req = request, res = response) => {

    res.json({
        ok: true,
        msg: 'Crear evento'
    });
};

const updateEvent = async(req = request, res = response) => {

    res.json({
        ok: true,
        msg: 'Update evento'
    });
};

const deleteEvent = async(req = request, res = response) => {

    res.json({
        ok: true,
        msg: 'Borrar evento'
    });
};

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent,

}