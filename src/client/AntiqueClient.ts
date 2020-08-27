import {AntiqueDto, WearAndTear} from '@/model/Antique';
import AxiosInstance from "./AxiosInstance";
import {Page} from '@/model/Page';
import {ApplierInfo} from "@/model/ApplierInfo";

export class AntiqueClient {
    static async postAntique(antique: AntiqueDto): Promise<AntiqueDto> {
        return (await AxiosInstance.post('/antique', antique, {})).data as AntiqueDto
    }

    static async postEnterpriseApplierInfo(id: number, applierInfo: ApplierInfo) {
        return (await AxiosInstance.post('/antique/' + id + '/owner/enterprise', applierInfo, {}))
    }

    static async postIndividualApplierInfo(id: number, applierInfo: ApplierInfo) {
        return (await AxiosInstance.post('/antique/' + id + '/owner/individual', applierInfo, {}))
    }

    static postAntiqueCert(id: number, certB64: string) {
        return AxiosInstance.post('/antique/cert/' + id, certB64, {})
    }

    static async getAntique(pageNo: number, pageLen: number): Promise<Page<AntiqueDto>> {
        return (await AxiosInstance.get('/antique/page/' + pageNo + '/' + pageLen)).data
    }

    static async getAntiquePic(id: number): Promise<string> {
        return AxiosInstance.get('/antique/pic/'+id,{ responseType: 'arraybuffer' }).then((response) => {
            const image = btoa(
                new Uint8Array(response.data)
                    .reduce((data, byte) => data + String.fromCharCode(byte), '')
            );
            return image;
        });
    }

    static async getAntiqueCert(id: number){
        return AxiosInstance.get('/antique/cert/'+id,{ responseType: 'text' })
    }

    static async getAntiqueDto(id: number): Promise<AntiqueDto>{
        return (await AxiosInstance.get('/antique/'+id)).data
    }
    static async searchAntique(keyWord: string,pageNo: number,pageLen: number): Promise<Page<AntiqueDto>>{
        return (await AxiosInstance.get("/antique/search/page/"+pageNo+'/'+pageLen+'?key='+keyWord)).data
    }
    static postAntiqueWearAndTear(id: number,wearAndTear: WearAndTear){
        return AxiosInstance.post('/antique/wearAndTear/'+id,wearAndTear,{})
    }
}
