import { EventPool } from "./EventPool"
import { HiveClient } from "./HiveClient"
import { RequestMessage, ResponseMessage } from "./Type"
import { Hyp0API } from "./hyp0API"

export class Router {
    recive(data: RequestMessage | ResponseMessage) {
        if (data.type == "request") {
            console.log("request");

            const hypo = new Hyp0API()
            hypo.recive(data.payload)

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

    }
}