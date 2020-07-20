import AxiosInstance from "./AxiosInstance";
import {Credential, User, UserType} from '@/model/User'
import {VerificationProcessStage} from "@/model/Verification";
import {Page} from "@/model/Page";
import {AntiqueDto} from "@/model/Antique";
export class UserClient{
    public static login(userName: string,password: string){
        return AxiosInstance.get('/login?userName='+userName+'&password='+password)
    }
    public static register(credential: Credential){
        return AxiosInstance.post('/register',credential,{})
    }
    public static updateVerificationAuth(userId: number, verifiable: Array<VerificationProcessStage>){
        return AxiosInstance.put('/user/verifiable/'+userId,verifiable,{})
    }
    public static async getAllUser(pageNo: number,pageLen: number): Promise<Page<User>>{
        return (await AxiosInstance.get('/user/page/'+pageNo+'/'+pageLen,{})).data as Page<User>
    }
    public static async getUser(): Promise<User>{
        return (await AxiosInstance.get('/user',{})).data as User
    }

    public static updateUserType(userId: number, type: UserType){
        return AxiosInstance.put('/user/type/'+userId+'?type='+type)
    }

    public static async searchUser(keyWord: string, pageNo: number, pageLen: number): Promise<Page<User>>{
        return (await AxiosInstance.get("/user/search/page/"+pageNo+'/'+pageLen+'?key='+keyWord)).data
    }

    public static updateUserPassword(userId: number, password: string){
        return AxiosInstance.put('/user/password/'+userId+'?password='+password)
    }

    public static delUser(userId: number){
        return AxiosInstance.delete('/user/'+userId)
    }
}
