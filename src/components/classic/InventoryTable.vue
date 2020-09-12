<template>
    <v-data-table
            :footer-props="{
                'items-per-page-text': '每页显示项数:',
                'items-per-page-all-text': '所有项',
                'items-per-page-options':[5,10,15]
            }"
            :headers="headers"
            :items="items"
            :server-items-length="totalLength"
            @update:options="onUpdate"
            dense
            disable-sort
            no-data-text="无数据"
            show-expand
            style="height: 100%"
    >

        <template v-slot:footer.page-text="{pageStart,
  pageStop,
  itemsLength}">
            {{'从第'+pageStart+'项至第'+pageStop+'项，共'+itemsLength+'项'}}
        </template>
        <template v-slot:item.user="{ item }">
            {{item.user}}
        </template>

        <!--<template v-slot:item.type="{ item }">
            <role-selector :role="item.type" @change="item.type = $event"/>
        </template>-->

        <template v-slot:item.details="{ item }">
            <v-btn @click="$router.push('/antiqueDetail/'+item.id)" icon>
                <v-icon>mdi-dots-horizontal-circle-outline</v-icon>
            </v-btn>
        </template>

        <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length" style="padding: 0;margin: 0">
                <inventory-input :key="rerenderKey" @update="rerenderKey++" v-model="item.id"/>
            </td>
        </template>
    </v-data-table>
</template>

<script>
    import {AntiqueClient} from "../../client/AntiqueClient";
    import VerificationDetail from "./VerificationDetail";
    import VerificationStepper from "./VerificationStepper";
    import InventoryInput from "./Inventory/InventoryInput";

    export default {
        name: "InventoryTable",
        components: {InventoryInput},
        props: {
            keyWord: String,
            date: Array
        },
        data: () => ({
            headers: [
                {text: '库存信息', align: 'start', value: 'data-table-expand'},
                {
                    text: '名称',

                    sortable: true,
                    value: 'name',
                },
                {text: '序号', value: 'id'},
                {text: '用户', value: 'userName'},
                {text: '描述', value: 'desp'},
                {text: '详情', value: 'details', sortable: false},
            ],
            items: [],
            rerenderKey: 0,
            totalLength: 0
        }),
        watch: {},
        methods: {
            onUpdate: async function (val) {
                this.$emit('load')
                if (/[^\s]+/.test(this.keyWord)) {
                    this.items.length = 0
                    const res = (await AntiqueClient.searchAntique(this.keyWord, val.page - 1, val.itemsPerPage, this.date[0], this.date[1]))
                    this.totalLength = res.totalElements
                    this.items.push(...res.content)
                } else {
                    this.items.length = 0
                    const res = (await AntiqueClient.getAntique(val.page - 1, val.itemsPerPage, this.date[0], this.date[1]))
                    this.totalLength = res.totalElements
                    this.items.push(...res.content)
                }
                this.$emit('loaded')
            },
            replaceArr(arr, n) {
                arr.length = 0;
                arr.push(...n)
            }
        }
    }
</script>

<style scoped>

</style>
