// export interface Payload {
//     "module": "synchronizer",
//     "class": "action",
//     "content": {
//         "status": "start" | "end" | "kill",
//         "action": {
//             "actionName": string
//             "actionType": string
//             "actionParameters": {
//                 any: any
//             }
//         }
//     }

// }

// export interface JSONMsg {
//     "type": "report" | "request",
//     "messageId": string
//     "timestamp": string
//     "from": string
//     "to": string
//     "payload": Payload
// }

////

export interface RequestPayload {
    class: "hypo" | "??"
    content: {
        requestType: string
        requestParameters: {
            data: any
        }
    }
}

export interface RequestMessage {
    type: "request"
    messageId: string
    timestamp: string
    from: string
    to: string
    id: string
    payload: RequestPayload
}

export interface ResponsePayload {
    module: string
    class: "hypo" | "??"
    content: {
        requestType: string
        response: {
            status: "success" | "error"
            responseData: {
                data: any
            }
        }
    }
}

export interface ResponseMessage {
    type: "response" | "report"
    messageId: string
    timestamp: string
    from: string
    to: string
    id: string
    payload: ResponsePayload
}