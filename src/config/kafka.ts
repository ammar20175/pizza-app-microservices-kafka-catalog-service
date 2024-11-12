import { Kafka, Producer } from 'kafkajs';
import { MessageProducerBroker } from '../common/types/broker';

export class KafkaProducerBroker implements MessageProducerBroker {
    private producer: Producer;

    constructor(clientId: string, brokers: string[]) {
        const kafka = new Kafka({ clientId, brokers });
        this.producer = kafka.producer();
    }

    /**
     * Connect the producer
     */
    async connect() {
        await this.producer.connect();
    }

    /**
     * Disconnect the producer
     */
    async disconnect() {
        if (this.producer) {
            await this.producer.disconnect();
        }
    }

    /**
     *
     * @param topic - topic to send message to
     * @param message - message that will be send
     * @throws {Error} - when producer is not connected
     */
    async sendMessage(topic: string, message: string) {
        await this.producer.send({
            topic,
            messages: [{ value: message }],
        });
    }
}
