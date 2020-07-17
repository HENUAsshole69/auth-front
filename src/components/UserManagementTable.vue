<template>
    <v-data-table
            @update:options="onUpdate"
            :headers="headers"
            :items="items"
    >
        <template v-slot:item.verifiable="{ item }">
            <user-verifiable-select :verifiable="item.verifiable" @change="replaceArr(item.verifiable,$event)"/>
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

    export default {
        name: "UserManagementTable",
        components: {UserVerifiableSelect},
        data:()=>({
            headers:[{
                text: '名称',
                align: 'start',
                sortable: true,
                value: 'name',
            },
                { text: '审核权限', value: 'verifiable' },
                { text: '删除', value: 'actions', sortable: false },],
            items:[]
        }),
        methods:{
            onUpdate:async function (val) {
                const content =(await UserClient.getAllUser(val.page - 1,val.itemsPerPage)).content
                this.items.push(...content)
            },
            replaceArr(arr,n){
                arr.length  = 0;
                arr.push(...n)
            },
            upload(obj){
                UserClient.updateVerificationAuth(obj.id,obj.verifiable)
            }
        }
    }
</script>

<style scoped>

</style>
