import AxiosInstance from "./AxiosInstance";
import { Credential} from '@/model/User'
export class UserClient{
    public static login(userName: string,password: string){
        return AxiosInstance.get('/login?userName='+userName+'&password='+password)
    }
    public static register(credential: Credential){
        return AxiosInstance.post('/register',credential,{})
    }
}
