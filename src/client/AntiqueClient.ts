import {Antique, AntiqueDto} from '@/model/Antique';
import AxiosInstance from "./AxiosInstance";
import { Page } from '@/model/Page';

export class AntiqueClient{
    static postAntique(antique: AntiqueDto){
        return AxiosInstance.post('/antique',antique,{})
    }
    static async getAntique(pageNo: number,pageLen: number): Promise<Page<AntiqueDto>>{
        return (await AxiosInstance.get('/antique/page/'+pageNo+'/'+pageLen)).data
    }
    static async getAntiquePic(id: number): Promise<string>{
        return AxiosInstance.get('/antique/pic/'+id,{ responseType: 'arraybuffer' }).then((response) => {
            const image = btoa(
                new Uint8Array(response.data)
                    .reduce((data, byte) => data + String.fromCharCode(byte), '')
            );
            return image;
        });
    }
    static async getAntiqueDto(id: number): Promise<AntiqueDto>{
        return (await AxiosInstance.get('/antique/'+id)).data
    }
}
