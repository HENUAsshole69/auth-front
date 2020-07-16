import {User} from "@/model/User";

export type VerificationProcessStage = "STAGE_ONE" | "STAGE_TWO" | "STAGE_THREE";


export interface VerificationProcess {
    content: string;
    stage: VerificationProcessStage;
    user: User;
}

export interface VerificationProcessDto {
    content: string|undefined;
    id: number|undefined;
    stage: VerificationProcessStage|undefined;
}

export const StageSelect  = [
    {text:'第一步',value:'STAGE_ONE'},
    {text:'第二步',value:'STAGE_TWO'},
    {text:'第三步',value:'STAGE_THREE'},
]
