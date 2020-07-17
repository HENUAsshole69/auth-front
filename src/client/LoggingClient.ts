import AxiosInstance from "./AxiosInstance";
import {Page} from "@/model/Page";
import {AntiqueDto} from "@/model/Antique";
import {LoggingEntryDto} from "@/model/LoggingEntry";
export default class LoggingClient{
    static async getLogPage(pageNo: number,pageLen: number): Promise<Page<LoggingEntryDto>>{
        return (await AxiosInstance.get('/log/page/'+pageNo+'/'+pageLen)).data
    }
}
