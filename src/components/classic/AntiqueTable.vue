<template>
    <v-data-table
            @update:options="onUpdate"
            :headers="headers"
            :items="items"
            style="height: 100%"
            :footer-props="{
                'items-per-page-text': '每页显示项数:',
                'items-per-page-all-text': '所有项'
            }"
    >

        <template v-slot:footer.page-text="{pageStart,
  pageStop,
  itemsLength}">
            {{'当前第'+pageStart+'页，共'+pageStop+'页，共'+itemsLength+'条目'}}
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
    </v-data-table>
</template>

<script>
    import {AntiqueClient} from "../../client/AntiqueClient";

    export default {
        name: "AntiqueTable",
        components: {},
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
            items:[]
        }),
        watch:{
        },
        methods:{
            onUpdate:async function(val) {
                this.$emit('loadStart')
                if(/\s*/.test(this.keyWord)) {
                    this.items.length = 0
                    const content = (await AntiqueClient.searchAntique(this.keyWord,val.page - 1, val.itemsPerPage)).content
                    this.items.push(...content)
                }else{
                    this.items.length = 0
                    const content = (await AntiqueClient.getAntique(val.page - 1, val.itemsPerPage)).content
                    this.items.push(...content)
                }
                this.$emit('loadEnd')
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
