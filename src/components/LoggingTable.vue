

<template>
    <v-data-table
            @update:options="onUpdate"
            :headers="headers"
            :items="items"
    >
        <!--<template v-slot:item.verifiable="{ item }">
            <user-verifiable-select :verifiable="item.verifiable" @change="replaceArr(item.verifiable,$event)"/>
        </template>-->

    </v-data-table>
</template>

<script>
    import LoggingClient from "../client/LoggingClient";

    export default {
        name: "LoggingTable",
        components: {},
        data:()=>({
            headers:[{
                text: '名称',
                align: 'start',
                sortable: true,
                value: 'userName',
            },
                { text: '操作', value: 'opName' },
                { text: '时间', value: 'dateTime'}],
            items:[]
        }),
        methods:{
            onUpdate:async function (val) {
                const content =(await LoggingClient.getLogPage(val.page - 1,val.itemsPerPage)).content
                this.items.push(...content)
            },
            replaceArr(arr,n) {
                arr.length = 0;
                arr.push(...n)
            }
        }
    }
</script>

<style scoped>

</style>

