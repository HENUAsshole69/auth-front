

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
        <template v-slot:item.dateTime="{ item }">
            {{new Date(item.dateTime).toString()}}
        </template>

        <template v-slot:item.opName="{ item }">
            {{OperationNameMap[item.opName] !== undefined?OperationNameMap[item.opName]:item.opName}}
        </template>

        <template v-slot:footer.page-text="{pageStart,
  pageStop,
  itemsLength}">
            {{'从第'+pageStart+'项至第'+pageStop+'项，共'+itemsLength+'项'}}
        </template>
    </v-data-table>
</template>

<script>
    import LoggingClient from "../client/LoggingClient";
    import {OperationNameMap} from "./OperationNameMap";
    export default {
        name: "LoggingTable",
        components: {},
        data:()=>({
            headers: [{
                text: '名称',
                align: 'start',
                sortable: true,
                value: 'userName',
            },
                {text: '操作', value: 'opName'},
                {text: '时间', value: 'dateTime'}],
            items: [],
            totalLength: 0,
            OperationNameMap
        }),
        methods:{
            onUpdate:async function (val) {
                this.$emit('load')
                this.items.length = 0
                const res =(await LoggingClient.getLogPage(val.page - 1,val.itemsPerPage))
                this.totalLength = res.totalElements
                this.items.push(...res.content)
                this.$emit('loaded')
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

