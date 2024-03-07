import { RequestPayload, ResponsePayload } from "./Type"
import { hiveClient } from "./router";


export class Hyp0API {
    private systemMetods: Map<string, Function>
    private storedData: RequestPayload

    constructor() {
        this.systemMetods = new Map([
            ["getUpTime", this.getUpTime]
        ])
        this.storedData = {
            class: "hypo",
            content: {
                requestType: "",
                requestParameters: {
                    data: null
                }
            }
        }
    }

    private getUpTime() {
        const uptimeInSeconds = new Date;  
        const data: ResponsePayload = {
            module: 'system',
            class: "hypo",
            content: {
                requestType: 'getUpTime',
                response: {
                    status: "success",
                    responseData: {
                        data: uptimeInSeconds
                    }
                }
            }
        }
        return data
    }

    async receive(data: RequestPayload): Promise<any> {
        this.storedData = data
        hiveClient.receive(this.systemMetods.get(data.content.requestType)?.() ?? 'Error')
        return "ok"
    }
}