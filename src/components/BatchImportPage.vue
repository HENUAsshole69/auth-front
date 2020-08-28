<template>
            <div v-if="uploading" style="
            width: 100%;
            height:100%">
                <v-progress-circular
                        :rotate="-90"
                        :size="100"
                        :width="15"
                        :value="uploadPercentage"
                        class="center"
                        color="primary"
                >
                    {{uploadPercentage+'%'}}
                </v-progress-circular>
            </div>
    <div v-else>

            <v-spacer></v-spacer>
                        <v-form v-model="valid">
                        <v-data-table
                                dense
                                :headers="headers"
                                :items="antiques"
                                show-expand
                                style="height: 100%"
                                :footer-props="{
                'items-per-page-text': '每页显示项数:',
                'items-per-page-all-text': '所有项'
            }"
                                no-data-text="请添加导入条目"
                                single-expand
                        >
                            <template v-slot:expanded-item="{item,headers}">
                                <td :colspan="headers.length">
                                    <v-container fluid style="margin: 0;padding: 0">
                                        <v-row no-gutters style="margin: 0;padding: 0">
                                            <v-col style="margin: 0;padding: 0">
                                                <applier-type v-model="item.isIndividual"/>
                                            </v-col>
                                        </v-row>
                                        <v-row no-gutters style="margin: 0;padding: 0">
                                            <v-col style="margin: 0;padding: 0">
                                                <v-form v-model="valid">
                                                    <individual-applier-info-input v-if="item.isIndividual"
                                                                                   v-model="item.applier"/>
                                                    <enterprise-applier-info-input v-else v-model="item.applier"/>
                                                </v-form>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </td>
                            </template>
                            <template v-slot:footer.page-text="{pageStart,
  pageStop,
  itemsLength}">
                                {{'从第'+pageStart+'项至第'+pageStop+'项，共'+itemsLength+'项'}}
                            </template>
                            <template v-slot:top>
                                <v-toolbar flat color="white">
                                    <v-toolbar-title></v-toolbar-title>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                            color="primary"
                                            dark
                                            class="mb-2"
                                            @click="addItem"
                                            style="margin-right: 1em"
                                    >新增条目</v-btn>

                                    <v-btn class="mb-2"  @click="upload" color="primary" :disabled="!valid">
                                        上传
                                        <v-icon right>mdi-exit-to-app</v-icon>
                                    </v-btn>
                                </v-toolbar>
                            </template>
                            <template v-slot:item.name="{ item }">
                                <v-text-field :rules="nameRules" dense v-model="item.name"/>
                            </template>
                            <template v-slot:item.desp="{ item }">
                                <v-text-field :rules="despRules" dense v-model="item.desp"/>
                            </template>
                            <template v-slot:item.type="{ item }">
                                <type-selector @change="item.type = $event"/>
                            </template>
                            <template v-slot:item.pic="{ item }">
                                <pic-file-input @change="item.pic = $event"/>
                            </template>
                            <template v-slot:item.actions="{ item }">

                                <v-icon
                                        small
                                        @click="deleteItem(item)"
                                >
                                    mdi-delete
                                </v-icon>
                            </template>
                        </v-data-table>
                        </v-form>
    </div>
</template>

<script>
    import TypeSelector from "./TypeSelector";
    import PicFileInput from "./PicFileInput";
    import {AntiqueClient} from "../client/AntiqueClient";
    import ApplierType from "./ApplierType";
    import IndividualApplierInfoInput from "./IndividualApplierInfoInput";
    import EnterpriseApplierInfoInput from "./EnterpriseApplierInfoInput";

    export default {
        components: {EnterpriseApplierInfoInput, IndividualApplierInfoInput, ApplierType, PicFileInput, TypeSelector},
        data: () => ({
            headers: [
                {
                    text: '名称',
                    align: 'start',
                    sortable: false,
                    value: 'name',
                },
                {text: '描述', value: 'desp'},
                {text: '类别', value: 'type'},
                { text: '图片', value: 'pic' },
                { text: '删除', value: 'actions', sortable: false },
                {text: '申请人信息', value: 'data-table-expand'}
            ],
            antiques: [],
            nameRules:[v=> v.length !== 0 || '名称不能为空'],
            despRules:[v=> v.length !== 0 || '描述不能为空'],
            picRules:[v=> v !== undefined || '图片不可不选'],
            valid:false,
            uploading:false,
            uploadPercentage:0
        }),
        name: "BatchImportPage",
        methods:{
            deleteItem (item) {
                const index = this.antiques.indexOf(item)
                confirm('确定要删除该项吗?') && this.antiques.splice(index, 1)
            },
            addItem(){
                this.antiques.push({
                    name: '',
                    type: '',
                    desp: '',
                    pic: '',
                    isIndividual: true,
                    applier: {}
                })
            },
            async upload() {
                this.uploading = true
                let finished = 0;
                for(const antique of this.antiques) {
                    const res = await AntiqueClient.postAntique(antique)
                    if (antique.isIndividual) {
                        antique.applier.type = 'INDIVIDUAL'
                        await AntiqueClient.postIndividualApplierInfo(res.id, antique.applier)
                    } else {
                        antique.applier.type = 'ENTERPRISE'
                        await AntiqueClient.postEnterpriseApplierInfo(res.id, antique.applier)
                    }
                    finished++;
                    this.uploadPercentage = (finished / this.antiques.length) * 100
                }
                this.$router.go(-1)
            }
        }
    }
</script>

<style scoped lang="scss">
@import "style/layout";
</style>
