import { hypoApi, sysData } from "../InitialData";
import modules from './index'
import AbstractAPIModule from './interface'

export default class systemModule extends AbstractAPIModule {
    private systemModule: {[key: string]: () => {}}

    constructor() {
        super();
        this.systemModule = {
            "getUpTime": this.getUpTime
        }
    }

    public addModule(moduleName: string) {
        hypoApi.addModule(modules[moduleName])
    }

    public removeModule(moduleName: string) {
        hypoApi.removeModule(moduleName)
    }

    private getUpTime() {
        const lastTime: number = Date.now();
        return (sysData.get("date") !== undefined) ? lastTime - sysData.get("date")! : 0;
    }
}