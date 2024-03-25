import { hypoApi, sysData } from "../InitialData";

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

    private getUpTime() {
        const lastTime: number = Date.now();
        return (sysData.get("date") !== undefined) ? lastTime - sysData.get("date")! : 0;
    }
}