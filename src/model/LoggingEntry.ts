import {Header} from '@lu1kaifeng/jpa-data-table/src/decorator/HeaderDecorator';
import {TableItem} from '@lu1kaifeng/jpa-data-table/src/decorator/TableItemDecorator';

export interface LoggingEntryDto {
    dateTime: string;
    opName: string;
    userName: string | undefined;
}

@TableItem({})
export class LoggingEntryView implements LoggingEntryDto {
    @Header({order: 3, text: "时间"})
    dateTime: string;
    @Header({order: 1, text: "操作", sortable: false})
    opName: string;
    @Header({order: 2, text: "用户", sortable: false})
    userName: string | undefined;

    constructor(loggingEntryDto: LoggingEntryDto) {
        this.dateTime = loggingEntryDto.dateTime;
        this.opName = loggingEntryDto.opName;
        this.userName = loggingEntryDto.userName;
    }

}
