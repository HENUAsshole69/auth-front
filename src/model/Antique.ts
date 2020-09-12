import {VerificationProcess} from "./Verification";
import {User} from './User';
import {ApplierInfo} from "@/model/ApplierInfo";

export interface Antique {
    authType: string;
    cert: String | null;
    date: String;
    desp: string;
    era: string;
    id: number | null;
    invalid: boolean;
    name: string;
    owner: ApplierInfo | null;
    pic: String;
    sourceInfo: string;
    spec: string;
    type: AntiqueType;
    user: User | null;
    verificationProcesses: VerificationProcess[];
    wearAndTear: WearAndTear | null;
    wholeness: string;
}
export interface AntiqueDto {
    authType: string;
    desp: string;
    era: string;
    id: number;
    invalid: boolean | null;
    name: string;
    owner: ApplierInfo | null;
    pic: number[] | null;
    sourceInfo: string;
    spec: string;
    type: AntiqueType;
    userName: string | null;
    verificationProcesses: number;
    wearAndTear: WearAndTear | null;
    wholeness: string;
}

export type AntiqueType = "PORCELAIN" | "JADE" | "PAINTING_CALLIGRAPHY" | "METAL" | "MISC";

export interface WearAndTear {
    content: string;
    id: number;
    user?: User
}
