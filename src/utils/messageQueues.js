const amqplib = require('amqplib');

const { MESSAGE_BROKER_URL, EXCHANGE_NAME } = require('../config/serverconfig');

const createChannel = async () => {
    try {
        const connection = await amqplib.connect('amqp://localhost');
        const channel = await connection.createChannel();
        await channel.assertExchange(EXCHANGE_NAME, 'direct', false);
        return channel;
    } catch (error) {
        console.error('Error creating channel:', error);
        throw error;
    }
} 


const subscribeMessage = async (channel , service , binding_key) => {
    try{
        const applicationQueue = await channel.assertQueue('REMAINDER_QUEUE');

        channel.bindQueue(applicationQueue.queue, EXCHANGE_NAME, binding_key);

        channel.consume(applicationQueue.queue, msg => {
            console.log('recieved data');
            console.log(msg.content.toString());
            const payload = JSON.parse(msg.content.toString());
            service(payload);
            channel.ack(msg);
        });
    } catch (error) {
        // console.error('Error subscribing to message:', error);
        throw error;
    }

}

const publishMessage = async (channel, message, binding_key) => {
    try {
        await channel.assertQueue('REMAINDER_QUEUE');
        await channel.publish(EXCHANGE_NAME, binding_key, Buffer.from(message));
        // console.log('Message published:', message);
    } catch (error) {
        // console.error('Error publishing message:', error);
        throw error;
    }
}

module.exports = {
    createChannel,
    subscribeMessage,
    publishMessage
}