import { hypoApi, sysData } from "../InitialData";
import modules from './index'

export abstract class AbstractAPIModule {
    [key: string]: any
}

export class systemModule extends AbstractAPIModule {
    public systemModule: {[key: string]: () => {}}

    constructor() {
        super();
        this.systemModule = {
            "getUpTime": this.getUpTime
        }
    }

    public addModule(moduleName: string) {
        hypoApi.addModuleToHypoApi(moduleName, modules[moduleName])
    }

    public removeModule(moduleName: string) {
        hypoApi.removeModuleFromHypoApi(moduleName)
    }

    private getUpTime() {
        const lastTime: number = Date.now();
        return (sysData.get("date") !== undefined) ? lastTime - sysData.get("date")! : 0;
    }
}