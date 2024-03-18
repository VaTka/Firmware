import { sysData } from "./InitialData";
import { RequestPayload, ResponsePayload } from "./Type"

class systemMetods {
    public systemMetods: Map<string, Function>

    constructor() {
        this.systemMetods = new Map([
            ["getUpTime", this.getUpTime.bind(this)]
        ])
    }

    private getUpTime() {
        const lastTime: number = Date.now();
        return (sysData.get("date") !== undefined) ? lastTime - sysData.get("date")! : 0;
    }
}

export class Hyp0API {
    private systemMethods: systemMetods

    constructor() {
        this.systemMethods = new systemMetods();
    }

    private createResponse(status: string, payload: RequestPayload, data: any) {
        return {
            module: payload.module,
            requestMethod: payload.requestMethod,
            response: {
                status: status,
                responseData: {
                    data
                }
            }
        }
    }

    async receive(payload: RequestPayload): Promise<any> {
        const data = await this.systemMethods.systemMetods.get(payload.requestMethod)?.() ?? 'Error'
        return this.createResponse('success', payload, data)
    }
}