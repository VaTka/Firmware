import { RequestPayload, ResponsePayload } from "./Type"
import { AbstractAPIModule } from './Medules/Methods'

export class Hyp0API {
    public modules: { [key: string]: AbstractAPIModule } = {}

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
            const method = await this.modules[payload.module][payload.requestMethod]()
            return this.createResponse("success", payload, method)
        } catch { return this.createResponse("error", payload) }
    }

    public addModuleToHypoApi<T extends AbstractAPIModule>(moduleName: string, ctor: new (...args: any[]) => T, ...args: any[]) {
        this.modules[moduleName] = new ctor(...args);
    }

    public removeModuleFromHypoApi(moduleName: string) {
        delete this.modules[moduleName]
    }
}