import { HiveClient } from './HiveClient'
import { HiveConnector } from './HiveConnector'
import systemModule from './Medules/system'
import { Message } from './Type'
import { Hyp0API } from './hyp0API'
import { Router } from './router'

export const hypoApi = new Hyp0API()
export const hiveClient = new HiveClient
export const hiveConnector = new HiveConnector
export const sysModule = new systemModule()


export const sysData = new Map([
    ["date", Date.now()],
])

hypoApi.addModule(systemModule)
sysModule.addModule("core")

export const initial = () => {
    const data: Message = {
        "type": "request",
        "messageId": "423423434",
        "timestamp": "today",
        "from": "A",
        "to": "B",
        "id": "6bd3712b538eea5da345b1f4ea5bc691cb9da0230e8eae0dae3fe26f9cf52f97",
        "payload": {
            "module": "systemModule",
            "requestMethod": "getUpTime",
            "requestParameters": {
                "hypoId": "23523233342"
            }
        }
    }
    Router(data)

}