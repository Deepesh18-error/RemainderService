const express = require('express');
const bodyParser = require('body-parser');


const { PORT } = require('./config/serverconfig');
// const { sendBasicEmail } = require('./services/email-service');
const cron = require('node-cron');


const setupAndStartServer = () => {
    
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);

        // sendBasicEmail(
        //     'support@admin.com',
        //     'temperror2025@gmail.com',
        //     'This is testing email',
        //     'Hey, how are you? , I hope you like the support'
        // );
    });
    cron.schedule('*/1 * * * *', () => {
        console.log('Running cron job every minute');
        // sendBasicEmail(
        //     '
    });
}

setupAndStartServer();