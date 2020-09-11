import {PageRequest} from "@lu1kaifeng/jpa-data-table/src/model/PageRequest"
import {Page} from '@lu1kaifeng/jpa-data-table/src/model/Page';
import AxiosInstance from "@/client/AxiosInstance";
import {LoggingEntryDto, LoggingEntryView} from "@/model/LoggingEntry";

export default function () {
    return async function (request: PageRequest): Promise<Page<LoggingEntryDto>> {
        const page = (await AxiosInstance.post('/log/page', request, {})).data as Page<LoggingEntryDto>
        const content = [];
        for (const c of page.content) {
            content.push(new LoggingEntryView(c));
        }
        page.content = content;
        return page;
    };
}
