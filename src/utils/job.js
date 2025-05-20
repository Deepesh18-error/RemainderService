const cron = require('node-cron');
const emailService = require('../services/email-service');
const sender = require('../config/emailConfig');
const { response } = require('express');
/**
 * 10:00 AM
 * every 5 minutes
 * we will check are theri any pending emails which was expected to be sent
 * by now and is pending
 * 
 */

const setupJobs = () => {
    cron.schedule('*/2 * * * *', async () => {
        const response = await emailService.fetchPendingEmails();
        response.forEach((email) => {
            sender.sendMail({
                to: email.receipentEmail,
                subject: email.subject,
                text: email.content
            }, async(err , data) => {
                if(err){
                    console.log(err);
                }else{
                    console.log(data);
                    await emailService.updateTicket(email.id , {status: 'SUCCESS'});
                }
            });
        });
        console.log(response);
    });
}

module.exports = setupJobs;