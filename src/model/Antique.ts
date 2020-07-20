import { VerificationProcess } from "./Verification";
import { User } from './User';

export interface Antique {
    id: number | null;
    name: string;
    pic: string;
    type: AntiqueType;
    user: User;
    desp: string | null;
    verificationProcesses: VerificationProcess[];
    wearAndTear: WearAndTear | null
}

export interface AntiqueDto {
    desp: string | null;
    id: number;
    name: string;
    type: AntiqueType;
    invalid: boolean|null;
    userName: string;
    verificationProcesses: number;
    pic:Blob|null;
}

export type AntiqueType = "PORCELAIN" | "JADE" | "PAINTING_CALLIGRAPHY" | "METAL" | "MISC";

export interface WearAndTear {
    content: string;
    id: number;
}
