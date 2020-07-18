<template>
    <v-data-table
            @update:options="onUpdate"
            :headers="headers"
            :items="items"
            :footer-props="{
                'items-per-page-text': '每页显示项数:',
                'items-per-page-all-text': '所有项'
            }"
    >
        <template v-slot:item.verifiable="{ item }">
            <user-verifiable-select :verifiable="item.verifiable" @change="replaceArr(item.verifiable,$event)"/>
        </template>

        <template v-slot:footer.page-text="{pageStart,
  pageStop,
  itemsLength}">
            {{'当前第'+pageStart+'页，共'+pageStop+'页，共'+itemsLength+'条目'}}
        </template>

        <template v-slot:item.type="{ item }">
            <role-selector :role="item.type" @change="item.type = $event"/>
        </template>

        <template v-slot:item.actions="{ item }">
            <v-btn icon @click="upload(item)">
                <v-icon>mdi-content-save</v-icon>
            </v-btn>
        </template>
    </v-data-table>
</template>

<script>
    import {UserClient} from "../client/UserClient";
    import UserVerifiableSelect from "./UserVerifiableSelect";
    import RoleSelector from "./RoleSelector";

    export default {
        name: "UserManagementTable",
        components: {RoleSelector, UserVerifiableSelect},
        data:()=>({
            headers:[{
                text: '名称',
                align: 'start',
                sortable: true,
                value: 'name',
            },
                { text: '审核权限', value: 'verifiable' },
                { text: '用户类型', value: 'type' },
                { text: '删除', value: 'actions', sortable: false },],
            items:[]
        }),
        methods:{
            onUpdate:async function (val) {
                if(val.page - 1 === 0)this.items.length = 0
                const content =(await UserClient.getAllUser(val.page - 1,val.itemsPerPage)).content
                this.items.push(...content)
            },
            replaceArr(arr,n){
                arr.length  = 0;
                arr.push(...n)
            },
            upload(obj){
                UserClient.updateVerificationAuth(obj.id,obj.verifiable)
                UserClient.updateUserType(obj.id,obj.type)
            }
        }
    }
</script>

<style scoped>

</style>
