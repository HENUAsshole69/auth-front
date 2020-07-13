import AxiosInstance from "./AxiosInstance";
import {Page} from "@/model/Page";
import {AntiqueDto} from "@/model/Antique";
import {VerificationProcessDto} from "@/model/Verification";

export class VerClient {
    static async getAntiqueNeedVerification(pageNo: number,pageLen: number): Promise<Page<AntiqueDto>>{
        return (await AxiosInstance.get("/antique/needVerification/page/"+pageNo+'/'+pageLen)).data
    }

    static async getAntiqueAtStage( stage: number, pageNo: number, pageLen: number): Promise<Page<AntiqueDto>>{
        return (await AxiosInstance.get("/antique/atVerificationStage/"+stage+"/page/"+pageNo+"/"+pageLen)).data
    }

    static async verifyAntique(antiqueId: number,ver: VerificationProcessDto){
        return (await AxiosInstance.post("/verify/antique/"+antiqueId,ver))
    }

    static async getVerification(antiqueId: number): Promise<VerificationProcessDto[]>{
        return (await AxiosInstance.get('/antique/verification/'+antiqueId)).data
    }

    static async invalidate(antiqueId: number){
        return (await AxiosInstance.delete('/antique/verification/'+antiqueId)).data
    }
}
