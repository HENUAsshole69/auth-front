

<template>
    <jpa-data-table
            :data-table-props="{
        'footer-props':{
                    'items-per-page-text': '每页显示项数:',
                    'items-per-page-all-text': '所有项'
                },
                'no-data-text':'无数据'
            }"
            :repo="repo"
            @load="$emit('load')"
            @loaded="$emit('loaded')"
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
    </jpa-data-table>
</template>

<script>
    import {OperationNameMap} from "./OperationNameMap";
    import JpaDataTable from "@lu1kaifeng/jpa-data-table/src/components/JpaDataTable";
    import LoggingRepo from "../client/LoggingRepo";

    export default {
        name: "LoggingTable",
        components: {JpaDataTable},
        data: () => ({
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
            OperationNameMap,
            repo: null
        }),
        beforeMount: async function () {
            this.$emit('load')
            this.repo = {fetch: LoggingRepo()}
            this.$emit('loaded')
        },
        methods: {

            replaceArr(arr, n) {
                arr.length = 0;
                arr.push(...n)
            }
        }
    }
</script>

<style scoped>

</style>

