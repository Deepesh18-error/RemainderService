const TicketService = require('../services/email-service');

const create = async (req, res) => {
    try{
        const response = await TicketService.createNotification(req.body);
        return res.status(201).json({
            success: true,
            message: 'Ticket created successfully',
            data: response,
            err: {}
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Unable to register an email remainder',
            data: {},
            err: error.message
        });
    }
}

module.exports = {
    create
}