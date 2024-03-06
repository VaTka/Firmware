import { Router } from "./router";

export class HiveClient {
    async recive(data: any) {
        const router = new Router
        router.send(data)
    }
}