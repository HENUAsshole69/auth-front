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
}

export interface AntiqueDto {
    desp: string | null;
    id: number;
    name: string;
    type: AntiqueType;
    verificationProcesses: number;
}

export type AntiqueType = "PORCELAIN" | "JADE" | "PAINTING_CALLIGRAPHY" | "METAL" | "MISC";