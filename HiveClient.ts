import { router } from "../src"
import { ResponsePayload } from "../src/api/Type"

export class HiveClient {
    public data: ResponsePayload

    constructor() {
        this.data = {
            module: 'system',
            class: "hypo",
            content: {
                requestType: '',
                response: {
                    status: "error",
                    responseData: {
                        data: {}
                    }
                }
            }
        }
    }

    receive(data: ResponsePayload) {
        this.data = data
    }
}