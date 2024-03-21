import { sysData } from "../InitialData";

export class systemModule {
    public systemModule: any

    constructor() {
        this.systemModule = {
            "getUpTime": this.getUpTime
        }
    }

    addModules(moduleName: string, desciption: Function) {
        if (this.systemModule.hasOwnProperty(moduleName)) {
            throw new Error(`Method '${moduleName}' already exists.`);
        } else {
            this.systemModule[moduleName] = desciption
        }
    }

    removeModule(moduleName: string) {
        if (!this.systemModule.hasOwnProperty(moduleName)) {
            throw new Error(`Method '${moduleName}' not exists.`);
        } else {
            delete this.systemModule[moduleName]
        }
    }

    private getUpTime() {
        const lastTime: number = Date.now();
        return (sysData.get("date") !== undefined) ? lastTime - sysData.get("date")! : 0;
    }
}

export class APIModule {
    private properties: any;
    public methodsList: any

    constructor(properties: any) {
        this.properties = properties
        this.methodsList = {
            "metodConstructor": this.metodConstructor
        }
    }

    addModules(moduleName: string, desciption: Function) {
        if (this.methodsList.hasOwnProperty(moduleName)) {
            throw new Error(`Method '${moduleName}' already exists.`);
        } else {
            this.methodsList[moduleName] = desciption
        }
    }

    removeModule(moduleName: string) {
        if (!this.methodsList.hasOwnProperty(moduleName)) {
            throw new Error(`Method '${moduleName}' not exists.`);
        } else {
            delete this.methodsList[moduleName]
        }
    }

    metodConstructor() {
        return this.properties() 
    }
}