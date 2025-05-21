const sender = require('../config/emailConfig');
const TicketRepository = require('../repository/ticket-repository');

 const repo = new TicketRepository();

const sendBasicEmail = async (mailFrom, mailTo, mailSubject, mailBody) => {
    try {
        const response = await sender.sendMail({
        from: mailFrom,
        to: mailTo,
        subject: mailSubject,
        text: mailBody
    });
    console.log(response);
} catch (error) {
    console.error('Error sending email:', error);
    }
}

const fetchPendingEmails = async (timestamp) => {
    try{
        const tickets = await repo.get({status: 'PENDING'});
        return tickets;
    } catch(err){
        console.error('Something went wrong while fetching tickets in service layer:', err);
    }
}

const updateTicket = async(ticketId , data) => {
    try{
        const response = await repo.update(ticketId, data);
        return response;
    }catch(error){
        console.log(error);
    }
}

const createNotification = async (data) =>{
    try{
        const response = await repo.create(data);
        return response;
    }catch(err){
        console.error('Something went wrong while creating tickets in service layer:', err);
    }
}

const subscribEvents = async (payload) => {
    let service = payload.service;
    let data = payload.data;
    switch(service){
        case 'CREATE_TICKET':
            await createNotification(data);
            break;
        case 'SEND_BASIC_EMAIL':
            await sendBasicEmail(data);
            break;
        default:
            console.log('No valid service found');
            break;
    }
}

module.exports = {
    sendBasicEmail,
    fetchPendingEmails,
    createNotification,
    updateTicket,
    subscribEvents
}