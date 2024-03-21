export interface RequestPayload {
    module: string
    requestMethod: string
    requestParameters: {
        hypoId: string
    }
}

export interface ResponsePayload {
    module: string
    requestMethod: string
    response: {
        status: "success" | "error"
        responseData: {
            data: any
        }
    }
}

export interface ReportPayload {
    module: string | null
    class: "action" | "log"
    content: {
        data: any
    }
}

export interface Message {
    type: "request" | "response" | "report"
    messageId: string
    timestamp: string
    from: string
    to: string
    id: string
    payload: RequestPayload | ResponsePayload | ReportPayload
}