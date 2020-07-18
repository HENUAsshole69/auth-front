

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
        <!--<template v-slot:item.verifiable="{ item }">
            <user-verifiable-select :verifiable="item.verifiable" @change="replaceArr(item.verifiable,$event)"/>
        </template>-->
        <template v-slot:footer.page-text="{pageStart,
  pageStop,
  itemsLength}">
            {{'当前第'+pageStart+'页，共'+pageStop+'页，共'+itemsLength+'条目'}}
        </template>
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
                if(val.page - 1 === 0)this.items.length = 0
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

