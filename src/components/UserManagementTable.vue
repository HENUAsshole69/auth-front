<template>
    <v-data-table
            @update:options="onUpdate"
            :headers="headers"
            :items="items"
            :server-items-length="totalLength"
            :footer-props="{
                'items-per-page-text': '每页显示项数:',
                'items-per-page-all-text': '所有项'
            }"
            no-data-text="无数据"
    >
        <template v-slot:item.verifiable="{ item }">
            <user-verifiable-select :verifiable="item.verifiable" @change="replaceArr(item.verifiable,$event)"/>
        </template>

        <template v-slot:footer.page-text="{pageStart,
  pageStop,
  itemsLength}">
            {{'从第'+pageStart+'项至第'+pageStop+'项，共'+itemsLength+'项'}}
        </template>

        <template v-slot:item.type="{ item }">
            <role-selector :role="item.type" @change="item.type = $event"/>
        </template>

        <template v-slot:item.save="{ item }">
            <v-btn icon @click="upload(item)">
                <v-icon>mdi-content-save</v-icon>
            </v-btn>
        </template>

        <template v-slot:item.del="{ item }">
            <v-btn icon @click="delUser(item)">
                <v-icon>mdi-delete</v-icon>
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
        props:{
            keyWord:String
        },
        data:()=>({
            headers:[{
                text: '名称',
                align: 'start',
                sortable: true,
                value: 'name',
            },
                { text: '审核权限', value: 'verifiable' },
                { text: '用户类型', value: 'type' },
                { text: '保存', value: 'save', sortable: false },
                { text: '删除', value: 'del', sortable: false }],
            items:[],
            totalLength:0
        }),
        methods:{
            onUpdate:async function (val) {
                this.$emit('load')
                if(/[^\s]+/.test(this.keyWord)) {
                    this.items.length = 0
                    const res =(await UserClient.searchUser(this.keyWord,val.page - 1,val.itemsPerPage))
                    this.totalLength = res.totalElements
                    this.items.push(...res.content)
                }else {
                    this.items.length = 0
                    const res =(await UserClient.getAllUser(val.page - 1,val.itemsPerPage))
                    this.totalLength = res.totalElements
                    this.items.push(...res.content)
                }
                this.$emit('loaded')
            },
            replaceArr(arr,n){
                arr.length  = 0;
                arr.push(...n)
            },
            upload(obj){
                UserClient.updateVerificationAuth(obj.id,obj.verifiable)
                UserClient.updateUserType(obj.id,obj.type)
            },
            async delUser(obj){
                await UserClient.delUser(obj.id)
                this.$router.go(0)
            }
        }
    }
</script>

<style scoped>

</style>
