const { Notification } = require('../models/index');
const { Op } = require('sequelize');
class TicketRepository {
    
    async getll(){
        try{
            const tickets = await Notification.findAll();
            return tickets;
        }catch(err){
            console.error('Something went wrong while fetching tickets:', err);
            throw err;
        }
    }

    async create(data){
        try{
            const ticket = await Notification.create(data);
            return ticket;
        }catch(error){
            console.error('Something went wrong while creating ticket in repositoy layer:', error);
            throw error;
        }
    }

    async get(filter){
        try{
            const tickets = await Notification.findAll({
                where: {
                    status: filter.status,
                    notificationTime: {
                        [Op.lte]: new Date()
                    }
                }
            });
            return tickets;
        } catch(err){
            console.error('Something went wrong while fetching tickets in repository layer');
            throw err;
        }
    }

    async update(ticketid, data){
        try{
            const ticket = await Notification.findByPk(ticketid);
            if(data.status){
                ticket.status = data.status;
            }
            await ticket.save();
            return ticket;
        }catch(error){
            throw error;
        }
    }
}

module.exports =  TicketRepository;