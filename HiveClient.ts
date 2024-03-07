import { router } from "../src"

export class HiveClient {
    public data: any

    constructor() {
        this.data = null
    }

    receive(data: any) {
        this.data = data
    }
}