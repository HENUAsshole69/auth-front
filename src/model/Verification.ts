import {User} from "@/model/User";

export type VerificationProcessStage = "STAGE_ONE" | "STAGE_TWO" | "STAGE_THREE";


export interface VerificationProcess {
    content: string;
    stage: VerificationProcessStage;
    user: User;
}

export interface VerificationProcessDto {
    content: string;
    id: number;
    stage: VerificationProcessStage;
}
