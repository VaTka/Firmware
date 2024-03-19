import { sysData } from "./InitialData";
import { RequestPayload } from "./Type"

class systemMetods {
    public systemMetods: any

    constructor() {
        this.systemMetods = {
            "getUpTime": this.getUpTime
        }
    }

    addModules(moduleName: string, desciption: Function) {
        if (this.systemMetods.hasOwnProperty(moduleName)) {
            throw new Error(`Method '${moduleName}' already exists.`);
        } else {
            this.systemMetods[moduleName] = desciption
        }
    }

    removeModule(moduleName: string) {
        if (!this.systemMetods.hasOwnProperty(moduleName)) {
            throw new Error(`Method '${moduleName}' not exists.`);
        } else {
            delete this.systemMetods[moduleName]
        }
    }

    private getUpTime() {
        const lastTime: number = Date.now();
        return (sysData.get("date") !== undefined) ? lastTime - sysData.get("date")! : 0;
    }
}

class APIModule {
    private properties: any;

    constructor(properties: any) {
        this.properties = properties
    }

    metodConstructor() {
        return this.properties() 
    }
}

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