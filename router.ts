import { hypo } from "../src"
import { EventPool } from "./EventPool"
import { HiveClient } from "./HiveClient"
import { HiveConnector } from "./HiveConnector"
import { RequestMessage, ResponseMessage } from "./Type"

export const hiveClient = new HiveClient
export const eventPool = new EventPool
export const hiveConnector = new HiveConnector

export class Router {

    async requestHandles(request: any) {
        await this.receive(request)
        this.send(request, hiveClient.data)
    }

    receive = async (data: RequestMessage | ResponseMessage) => {
        if (data.type == "request") {
            console.log("Request");
            hypo.receive(data.payload)
        } else if (data.type == "response") {
            console.log("Response");
            hiveClient.receive(data.payload)
        } else if (data.type == "report") {
            console.log("Report");
            eventPool.receive(data.payload)
        }
    }

    send = async (data: any, payload: any) => {
        console.log("Send");
        const responsData = {
            type: "response",
            messageId: data.messageId,
            timestamp: data.timestamp,
            from: data.from,
            to: data.to,
            id: data.id,
            payload: payload
        }
        hiveConnector.sendToHive(responsData)
    } 
}