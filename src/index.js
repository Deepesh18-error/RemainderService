const express = require('express');
const bodyParser = require('body-parser');

const TicketController = require('./controllers/ticket-controller');

const { PORT } = require('./config/serverconfig');
// const { sendBasicEmail } = require('./services/email-service');
const cron = require('node-cron');
const jobs = require('./utils/job');
const setupAndStartServer = () => {
    
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.post('/api/v1/tickets', TicketController.create);
    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
        jobs();
        // sendBasicEmail(
        //     'support@admin.com',
        //     'temperror2025@gmail.com',
        //     'This is testing email',
        //     'Hey, how are you? , I hope you like the support'
        // );
    });

}

setupAndStartServer();