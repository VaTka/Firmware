import { RequestMessage, RequestPayload, ResponsePayload } from "./Type"

const getUpTime = () => {
    const uptimeInSeconds = Date.now();
    console.log("getUpTime")
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

    recive(data: RequestPayload): void {
        this.storedData = data
        console.log(data.content.requestType);

        console.log(this.systemMetods.get(data.content.requestType)?.() ?? 'Error');
    }
}