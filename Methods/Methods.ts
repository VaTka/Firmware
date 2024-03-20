import { sysData } from "../InitialData";

export class systemMetods {
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