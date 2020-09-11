import {PageRequest} from "@lu1kaifeng/jpa-data-table/src/model/PageRequest"
import {Page} from '@lu1kaifeng/jpa-data-table/src/model/Page';
import AxiosInstance from "@/client/AxiosInstance";
import {User, UserManagementView} from "@/model/User";

export default function (keyWord?: string) {
    if (keyWord !== undefined)
        return async function (request: PageRequest): Promise<Page<User>> {
            const page = (await AxiosInstance.post('/user/search/page', request, {
                params: {
                    key: keyWord
                }
            })).data as Page<User>
            const content = [];
            for (const c of page.content) {
                content.push(new UserManagementView(c));
            }
            page.content = content;
            return page;
        };
    else return async function (request: PageRequest): Promise<Page<User>> {
        const page = (await AxiosInstance.post('/user/page', request, {})).data as Page<User>
        const content = [];
        for (const c of page.content) {
            content.push(new UserManagementView(c));
        }
        page.content = content;
        return page;
    };
}
