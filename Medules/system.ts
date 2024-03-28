import { hypoApi, sysData } from "../InitialData";
import modules from './index'
import AbstractAPIModule from './interface'

export default class systemModule extends AbstractAPIModule {
    private systemModule: {[key: string]: (...args: any[]) => {}}

    constructor(private args?: any[]) {
        super();
        this.systemModule = {
            "getUpTime": this.getUpTime
        }
    }

    public addModule(moduleName: string, ...args: any[]) {        
        hypoApi.addModule(modules[moduleName], ...args)
    }

    public removeModule(moduleName: string) {
        hypoApi.removeModule(moduleName)
    }

    private getUpTime(data: any): number {
        const lastTime: number = Date.now();
        return (sysData.get("date") !== undefined) ? lastTime - sysData.get("date")! : 0;
    }
}