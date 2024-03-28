import AbstractAPIModule from "./Medules/interface"
import { RequestPayload, ResponsePayload } from "./Type"

export class Hyp0API {
    private modules: { [key: string]: AbstractAPIModule } = {}

    constructor() {
        this.modules = {}
    }

    private createResponse(status: "success" | "error", payload: RequestPayload, data?: any): ResponsePayload {
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

    public async processRequest(payload: RequestPayload): Promise<ResponsePayload> {
        try {
            const method = await this.modules[payload.module][payload.requestMethod](payload.requestParameters)
            return this.createResponse("success", payload, method)
        } catch { return this.createResponse("error", payload) }
    }

    public addModule<T extends AbstractAPIModule>(ctor: new (...args: any[]) => T, ...args: any[]) {
        const module = new ctor(...args);
        this.modules[module.constructor.name] = module
        console.log(this.modules);
    }

    public removeModule(moduleName: string) {
        delete this.modules[moduleName]
    }
}