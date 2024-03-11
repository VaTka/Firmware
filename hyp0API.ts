import { RequestPayload, ResponsePayload } from "./Type"
import { hiveClient } from "./router";


export class Hyp0API {
    private systemMetods: Map<string, Function>
    private startTime: any
    private respJson: ResponsePayload

    constructor() {
        this.respJson = {
            module: 'system',
            class: "hypo",
            content: {
                requestType: '',
                response: {
                    status: "error",
                    responseData: {
                        data: {}
                    }
                }
            }
        }
        this.systemMetods = new Map([
            ["getUpTime", this.getUpTime.bind(this)]
        ])
        this.startTime = Date.now()
    }

    private getUpTime() {
        const lastTime: any = Date.now();
        this.respJson.content.requestType = "getUpTime"
        this.respJson.content.response.status = "success"
        this.respJson.content.response.responseData.data = lastTime - this.startTime
        return this.respJson
    }

    async receive(data: RequestPayload): Promise<any> {
        hiveClient.receive(this.systemMetods.get(data.content.requestType)?.() ?? 'Error')
        return "ok"
    }
}