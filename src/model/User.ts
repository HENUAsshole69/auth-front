import {VerificationProcess, VerificationProcessStage} from './Verification';
import {Header} from '@lu1kaifeng/jpa-data-table/src/decorator/HeaderDecorator';
import {TableItem} from '@lu1kaifeng/jpa-data-table/src/decorator/TableItemDecorator';

export interface UserInfo {
    cell: string;
    realName: string;
}

export type UserType =
    "INDIVIDUAL"
    | "AUCTIONEER"
    | "ANTIQUE_STORE"
    | "ARCH_DEPT"
    | "JUDICIAL_DEPT"
    | "ADMIN"
    | "AUTH_CENTER"
    | 'FINANCE';



export interface User {
    id?: number;
    info: UserInfo;
    name: string;
    type: UserType;
    verificationProcesses: VerificationProcess[];
    verifiable: VerificationProcessStage[];
}

export interface Credential {
    password: string;
    user: User;
}

class RegisterUserObj implements User{
    info: UserInfo;
    name: string;
    type: UserType;
    verificationProcesses: VerificationProcess[];
    constructor(info: UserInfo, name: string, type: UserType) {
        this.info = info
        this.name = name
        this.type = type
        this.verificationProcesses = []
    }

    verifiable: VerificationProcessStage[] =[];
}

class RegisterInfoObj implements UserInfo {
    cell: string;
    realName: string;

    constructor(cell: string, realName: string) {
        this.cell = cell
        this.realName = realName
    }
}

export class RegisterObj implements Credential {
    password: string;
    user: User;

    constructor(password: string, name: string, type: UserType, cell: string, realName: string) {
        this.password = password
        this.user = new RegisterUserObj(new RegisterInfoObj(cell, realName), name, type)
    }
}

@TableItem({
    additionalHeaders: [
        {text: '保存', value: 'save', sortable: false, order: 4},
        {text: '删除', value: 'del', sortable: false, order: 5}
    ]
})
export class UserManagementView implements User {
    info: UserInfo;
    id?: number;
    @Header({
        text: '名称',
        align: 'start',
        sortable: true,
        order: 1
    })

    name: string;
    @Header({order: 3, text: '用户类型', value: 'type'})
    type: UserType;
    @Header({order: 2, text: '审核权限', value: 'verifiable'})
    verifiable: VerificationProcessStage[];
    verificationProcesses: VerificationProcess[];

    constructor(user: User) {
        this.id = user.id
        this.info = user.info
        this.name = user.name
        this.type = user.type
        this.verifiable = user.verifiable
        this.verificationProcesses = user.verificationProcesses
    }
}
