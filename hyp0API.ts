import { HiveClient } from "./HiveClient";
import { RequestPayload, ResponsePayload } from "./Type"

const getUpTime = () => {
    const uptimeInSeconds = Date.now();
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
export class Hyp0API {
    private systemMetods: Map<string, Function>
    private storedData: RequestPayload

    constructor() {
        this.systemMetods = new Map([
            ["getUpTime", getUpTime]
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

    async recive(data: RequestPayload): Promise<any> {
        this.storedData = data
        const hiveClient = new HiveClient
        hiveClient.recive(this.systemMetods.get(data.content.requestType)?.() ?? 'Error')
        return 'Ok'
    }
}