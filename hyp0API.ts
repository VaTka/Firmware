import { RequestPayload, ResponsePayload } from "./Type"
import { hiveClient } from "./router";


export class Hyp0API {
    private systemMetods: Map<string, Function>
    private storedData: RequestPayload
    private startTime: any

    constructor() {
        this.systemMetods = new Map([
            ["getUpTime", this.getUpTime.bind(this)]
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
        this.startTime = Date.now()
    }

    private getUpTime() {
        const lastTime: any = Date.now();  
        const data: ResponsePayload = {
            module: 'system',
            class: "hypo",
            content: {
                requestType: 'getUpTime',
                response: {
                    status: "success",
                    responseData: {
                        data: lastTime - this.startTime
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