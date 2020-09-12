<template>
    <div style="
            width: 100%;
            height:100%" v-if="uploading">
        <v-progress-circular
                :rotate="-90"
                :size="100"
                :value="uploadPercentage"
                :width="15"
                class="center"
                color="primary"
        >
            {{uploadPercentage+'%'}}
        </v-progress-circular>
    </div>
    <v-container class="pa-0 ma-0" fluid v-else>
        <v-row dense no-gutters>
            <v-col>
                <v-spacer></v-spacer>
                <v-container class="pa-0 ma-0">
                    <v-row class="d-flex">
                        <v-col class="flex-grow-0">
                            <v-tabs
                                    style="width: available"
                                    v-model="tab"
                                    vertical
                            >
                                <v-tab
                                        :key="item.key"
                                        v-for="item in antiques"
                                >
                                    {{ (item.name === undefined || item.name === '')?'未命名':item.name }}
                                    <v-btn @click="antiques.splice(antiques.indexOf(item),1)" icon small>
                                        <v-icon>mdi-close</v-icon>
                                    </v-btn>
                                </v-tab>
                            </v-tabs>

                        </v-col>
                        <v-col>
                            <v-row dense no-gutters>
                                <v-col>
                                    <v-toolbar flat>
                                        <v-spacer/>
                                        <v-btn
                                                color="primary"
                                                dark
                                                class="mb-2"
                                                @click="addItem"
                                                style="margin-right: 1em"
                                        >新增条目
                                        </v-btn>

                                        <v-btn :disabled="!valid" @click="dialog = true" class="mb-2" color="primary">
                                            上传
                                            <v-icon right>mdi-exit-to-app</v-icon>
                                        </v-btn>
                                    </v-toolbar>
                                </v-col>
                            </v-row>
                            <v-row dense no-gutters>
                                <v-col>
                                    <v-form v-model="valid">
                                        <v-tabs-items v-model="tab" vertical>
                                            <v-tab-item
                                                    :key="item.key"
                                                    v-for="item in antiques"
                                            >
                                                <new-antique-info-input :antique="item"/>
                                            </v-tab-item>
                                        </v-tabs-items>
                                    </v-form>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-container>
            </v-col>
        </v-row>
        <applier-info-import-dialog :applier="applier" @success="upload" v-model="dialog"/>
    </v-container>
</template>

<script>

    import {AntiqueClient} from "../client/AntiqueClient";
    import NewAntiqueInfoInput from "./classic/NewAntiqueInfoInput";
    import ApplierInfoImportDialog from "./ApplierInfoImportDialog";

    export default {
        components: {ApplierInfoImportDialog, NewAntiqueInfoInput},
        data: () => ({
            headers: [
                {text: '申请人信息', align: 'start', value: 'data-table-expand'},
                {
                    text: '名称',

                    sortable: false,
                    value: 'name',
                },
                {text: '描述', value: 'desp'},
                {text: '类别', value: 'type'},
                {text: '图片', value: 'pic'},
                {text: '删除', value: 'actions', sortable: false}
            ],
            antiques: [{key: 0}],
            nameRules: [v => v.length !== 0 || '名称不能为空'],
            despRules: [v => v.length !== 0 || '描述不能为空'],
            picRules: [v => v !== undefined || '图片不可不选'],
            valid: false,
            uploading: false,
            uploadPercentage: 0,
            tab: 0,
            dialog: false,
            applier: {}
        }),
        name: "BatchImportPage",
        methods:{
            deleteItem (item) {
                const index = this.antiques.indexOf(item)
                confirm('确定要删除该项吗?') && this.antiques.splice(index, 1)
            },
            addItem() {
                // eslint-disable-next-line @typescript-eslint/no-this-alias
                const model = this
                this.antiques.push({
                    key: this.antiques.length
                })
            },
            async upload() {
                this.uploading = true
                let finished = 0;
                for(const antique of this.antiques) {
                    const res = await AntiqueClient.postAntique(antique)
                    await AntiqueClient.postEnterpriseApplierInfo(res.id, this.applier)
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
