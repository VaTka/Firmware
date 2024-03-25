import { RequestPayload, ResponsePayload } from "./Type"
import { AbstractAPIModule, systemModule } from './Methods/Methods'

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

    private addModule<T extends AbstractAPIModule>(ctor: new (...args: any[]) => T, ...args: any[]): T {
        return new ctor(...args);
    }

    public addModuleToHypoApi(moduleName: string, properties: any) {
        this.modules[moduleName] = this.addModule(properties);
    }

    public removeModuleFromHypoApi(className: string) {
        delete this.modules[className]
    }
}