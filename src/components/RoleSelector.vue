<template>
    <v-select
            v-bind:items="items"
            v-model="roleValue"
            label="用户类型"
            @change="$emit('change', $event)"
    ></v-select>
</template>

<script>
    export default {

        name: "RoleSelector",
        props:{
            role:String
        },
        data:()=>({
            roleValue:undefined,
            items:[
                {text:'个人',value:'INDIVIDUAL'},
                {text:'拍卖行',value:'AUCTIONEER'},
                {text:'文物店',value:'ANTIQUE_STORE'},
                {text:'文物部门',value:'ARCH_DEPT'},
                {text:'司法部门',value:'JUDICIAL_DEPT'},
                {text:'管理员',value:'ADMIN'}
            ]
        }),
        mounted() {
            this.roleValue = this.role
        }
    }
</script>

<style scoped>

</style>
