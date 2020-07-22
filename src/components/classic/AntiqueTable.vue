<template>
    <v-data-table
            @update:options="onUpdate"
            :headers="headers"
            :items="items"
            :server-items-length="totalLength"
            style="height: 100%"
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
           {{item.userName}}
        </template>

        <!--<template v-slot:item.type="{ item }">
            <role-selector :role="item.type" @change="item.type = $event"/>
        </template>-->

        <template v-slot:item.details="{ item }">
            <cert-downloader :antique="item"/>
            <q-r-display :content="item.id.toString()"/>
            <v-btn icon @click="$router.push('/antiqueDetail/'+item.id)">
                <v-icon>mdi-dots-horizontal-circle-outline</v-icon>
            </v-btn>
        </template>
    </v-data-table>
</template>

<script>
    import {AntiqueClient} from "../../client/AntiqueClient";
    import QRDisplay from "../QRDisplay";
    import CertDownloader from "./CertDownloader";

    export default {
        name: "AntiqueTable",
        components: {CertDownloader, QRDisplay},
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
                { text: '用户', value: 'user' },
                { text: '描述', value: 'desp' },
                { text: '详情', value: 'details',sortable: false }],
            items:[],
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
