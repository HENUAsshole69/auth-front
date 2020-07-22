<template>
    <v-data-table
            @update:options="onUpdate"
            :headers="headers"
            :items="items"
            show-expand
            style="height: 100%"
            :server-items-length="totalLength"
            :footer-props="{
                'items-per-page-text': '每页显示项数:',
                'items-per-page-all-text': '所有项'
            }"
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
            <v-btn icon @click="$router.push('/antiqueDetail/'+item.id)">
                <v-icon>mdi-dots-horizontal-circle-outline</v-icon>
            </v-btn>
        </template>

        <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length"><verification-stepper :key="rerenderKey" :antique="item" @success="rerenderKey++" @error="rerenderKey++"/></td>
        </template>
    </v-data-table>
</template>

<script>
    import {AntiqueClient} from "../../client/AntiqueClient";
    import VerificationDetail from "./VerificationDetail";
    import VerificationStepper from "./VerificationStepper";

    export default {
        name: "VerificationTable",
        components: {VerificationStepper},
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
                { text: '序号', value: 'id' },
                { text: '用户', value: 'userName' },
                { text: '描述', value: 'desp' },
                { text: '详情', value: 'details',sortable: false },
                { text: '审核', value: 'data-table-expand' }],
            items:[],
            rerenderKey:0,
            totalLength:0
        }),
        watch:{
        },
        methods:{
            onUpdate:async function(val) {
                this.$emit('load')
                if(/[^\s]+/.test(this.keyWord)) {
                    this.items.length = 0
                    const res = (await AntiqueClient.searchAntique(this.keyWord,val.page - 1, val.itemsPerPage))
                    this.totalLength = res.totalElements
                    this.items.push(...res.content)
                }else{
                    this.items.length = 0
                    const res = (await AntiqueClient.getAntique(val.page - 1, val.itemsPerPage))
                    this.totalLength = res.totalElements
                    this.items.push(...res.content)
                }
                this.$emit('loaded')
            },
            replaceArr(arr,n){
                arr.length  = 0;
                arr.push(...n)
            }
        }
    }
</script>

<style scoped>

</style>
