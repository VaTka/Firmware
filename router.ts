import { EventPool } from "./EventPool"
import { HiveClient } from "./HiveClient"
import { HiveConnector } from "./HiveConnector"
import { RequestMessage, ResponseMessage } from "./Type"
import { Hyp0API } from "./hyp0API"

export class Router {
    private savedData: RequestMessage | ResponseMessage

    constructor() {
        this.savedData = {
            type: "request",
            messageId: "",
            timestamp: "",
            from: "",
            to: "",
            id: "",
            payload: {
                class: "hypo",
                content: {
                    requestType: "",
                    requestParameters: {
                        data: {}
                    }
                }
            }
        }
    }

    recive(data: RequestMessage | ResponseMessage) {
        this.savedData = data
        console.log(this.savedData);
        if (data.type == "request") {
            console.log("request");

            const hypo = new Hyp0API()
            hypo.recive(data.payload).then(r => console.log(r))
        } else if (data.type == "response") {
            console.log("response");
            const hiveClient = new HiveClient
            hiveClient.recive(data.payload)
        } else if (data.type == "report") {
            console.log("report");
            const eventPool = new EventPool
            eventPool.recive(data.payload)
        }
    }
    send(data: any) {
        console.log(this.savedData);
        console.log("Send");
        const hiveConnector = new HiveConnector
        const responsData = {
            type: "response",
            messageId: this.savedData.messageId,
            timestamp: this.savedData.timestamp,
            from: this.savedData.from,
            to: this.savedData.to,
            id: this.savedData.id,
            payload: data
        }
        hiveConnector.recive(responsData)
    }
}