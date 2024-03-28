import { hiveClient, hiveConnector, hypoApi } from "./InitialData"
import { Message, ReportPayload, RequestPayload, ResponsePayload } from "./Type"

const send = (data: Message, payload: any) => {
    console.log("Send");
    const responsData = {
        type: "response",
        messageId: data.messageId,
        timestamp: new Date(),
        from: payload.module,
        to: data.to,
        id: data.id,
        payload: payload
    }
    hiveConnector.sendToHive(responsData)
}

export const Router = async (request: Message) => {
    let payloadData = {}
    if (request.type == "request") {
        console.log("Request");
        payloadData = await hypoApi.processRequest(request.payload as RequestPayload)
        send(request, payloadData)
    } else if (request.type == "response") {
        console.log("Response");
        payloadData = await hiveClient.receive(request.payload as ResponsePayload)
    } else if (request.type == "report") {
        console.log("Report");
    }
}