import { RequestPayload } from "./Type"
import { APIModule, systemMetods } from './Methods/Methods'

export class Hyp0API {
    system: any
    public modules: any

    constructor() {
        this.system = new systemMetods()
        this.modules = {
            "system": this.system
        }
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

    async processRequest(payload: RequestPayload): Promise<any> {
        const method = await this.modules[payload.module][payload.requestMethod]?.()
        let status = "success"
        let data
        method ? data = method : status = 'error'
        return this.createResponse(status, payload, data)
    }

    addModule(className: string, properties: any) {
        this.modules[className] = new APIModule(properties)
    }

    removeModule(className: string) {
        delete this.modules[className]
    }
}