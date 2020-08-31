import AxiosInstance from "./AxiosInstance";
import {File as FileDto, InventoryDto} from "@/model/Inventory";

export class InventoryClient {
    static async postInventoryForAntiqueId(inventoryDto: InventoryDto, id: number) {
        return (await AxiosInstance.post('/antique/' + id + '/inventory', inventoryDto, {})).data
    }

    static async getInventoryForAntiqueId(id: number): Promise<InventoryDto> {
        return (await AxiosInstance.get('/antique/' + id + '/inventory', {})).data
    }

    static async getInventoryFileListForAntiqueId(id: number): Promise<FileDto[]> {
        return (await AxiosInstance.get('/antique/' + id + '/inventory/file', {})).data
    }

    static async uploadFileForAntique(file: File, id: number, callback: (progressEvent: ProgressEvent) => undefined) {
        const formData = new FormData();
        formData.append("file", file);
        await AxiosInstance.post('/antique/' + id + '/inventory/file/' + file.name, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: callback
        })
    }

    static async delInventoryFile(antiqueId: string, fileId: string) {
        return (await AxiosInstance.delete('/antique/' + antiqueId + '/inventory/file/' + fileId, {}))
    }
}
