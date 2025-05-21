const express = require('express');
const bodyParser = require('body-parser');

const TicketController = require('./controllers/ticket-controller');
const EmailService = require('./services/email-service');


const { PORT, REMAINDER_BINDING_KEY } = require('./config/serverconfig');

const { createChannel, subscribeMessage } = require('./utils/messageQueues');
// const { sendBasicEmail } = require('./services/email-service');
const cron = require('node-cron');
const jobs = require('./utils/job');
const setupAndStartServer = async () => {
    
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.post('/api/v1/tickets', TicketController.create);

    const channel = await createChannel();
    subscribeMessage(channel, EmailService.subscribEvents, REMAINDER_BINDING_KEY);

    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
        // jobs();
        // sendBasicEmail(
        //     'support@admin.com',
        //     'temperror2025@gmail.com',
        //     'This is testing email',
        //     'Hey, how are you? , I hope you like the support'
        // );
    });

}

setupAndStartServer();