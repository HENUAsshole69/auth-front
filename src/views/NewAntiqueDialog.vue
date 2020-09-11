<template>
    <v-container>
        <v-row>
            <v-col>
    <v-dialog
            v-model="dialog"
            width="500"
    >

        <v-card>
            <v-system-bar window>
                <v-icon>mdi-folder-plus</v-icon>
                <span>新增文物</span>
                <v-spacer></v-spacer>
                <v-icon @click="dialog = false">mdi-close</v-icon>
            </v-system-bar>
            <v-card-text>
                <v-tabs-items v-model="tab">
                    <v-tab-item>
                        <v-form v-model="valid">
                            <v-container fluid>
                                <v-row>
                                    <v-col>
                                        <v-text-field :hint="'输入文物名称'" :rules="nameRules" dense label="名称"
                                                      v-model="antique.name"/>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col>
                                        <TypeSelector @change="antique.type = $event"/>
                                    </v-col>
                                    <v-col>
                                        <v-text-field :hint="'输入文物年代'" :rules="nameRules" dense label="年代"
                                                      v-model="antique.era"/>
                                        <!--<era-select v-model="antique.era"/>-->
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col>
                                        <v-text-field :hint="'输入完整程度'" :rules="nameRules" dense label="完整程度"
                                                      v-model="antique.wholeness"/>
                                    </v-col>
                                    <v-col>
                                        <v-text-field :hint="'输入鉴定诉求'" :rules="nameRules" dense label="鉴定诉求"
                                                      v-model="antique.authType"/>
                                        <!--<auth-type-select v-model="antique.authType"/>-->
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col>
                                        <v-text-field :hint="'输入来源信息'" :rules="nameRules" dense label="来源信息"
                                                      v-model="antique.sourceInfo"/>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col>
                                        <v-text-field :hint="'输入规格'" :rules="nameRules" dense label="规格"
                                                      v-model="antique.spec"/>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col>
                                        <PicFileInput @change="antique.pic = $event"/>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col>
                                        <v-textarea :hint="'输入文物描述'" :rules="nameRules" dense label="描述"
                                                    v-model="antique.desp"/>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-form>
                    </v-tab-item>
                    <v-tab-item>
                        <v-container fluid style="margin: 0;padding: 0">
                            <v-row no-gutters style="margin: 0;padding: 0">
                                <v-col style="margin: 0;padding: 0">
                                    <applier-type v-model="isIndividual"/>
                                </v-col>
                            </v-row>
                            <v-row no-gutters style="margin: 0;padding: 0">
                                <v-col style="margin: 0;padding: 0">
                                    <v-form v-model="valid">
                                        <individual-applier-info-input v-if="isIndividual" v-model="applier"/>
                                        <enterprise-applier-info-input v-else v-model="applier"/>
                                    </v-form>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-tab-item>
                </v-tabs-items>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog = false">关闭</v-btn>
                <v-btn :disabled="!valid" @click="onFinish" color="primary" text>{{tab === 1?'提交':'下一步'}}</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import TypeSelector from "../components/TypeSelector";
    import {AntiqueClient} from "../client/AntiqueClient";
    import PicFileInput from "../components/PicFileInput";
    import EnterpriseApplierInfoInput from "../components/EnterpriseApplierInfoInput";
    import ApplierType from "../components/ApplierType";
    import IndividualApplierInfoInput from "../components/IndividualApplierInfoInput";
    import FormFileUploader from "../components/classic/Inventory/FormFileUploader";
    import AuthTypeSelect from "../components/classic/AuthTypeSelect";
    import EraSelect from "../components/classic/EraSelect";

    export default {
        components: {
            EnterpriseApplierInfoInput, IndividualApplierInfoInput, ApplierType, PicFileInput, TypeSelector
        },
        data: () => ({
            antique: {
                name: '',
                type: null,
                desp: '',
                pic: ''
            },
            valid: false,
            nameRules: [v => v.length !== 0 || '名称不能为空'],
            despRules: [v => v.length !== 0 || '描述不能为空'],
            dialog: false,
            applier: {},
            tab: 0,
            isIndividual: true
        }),
        mounted() {
            this.dialog = true
        },
        watch:{
            dialog:function (n) {
                if (n === false) this.$router.go(-1)
            }
        },
        methods:{
            onFinish: async function () {
                console.log(this.antique)
                if (this.tab === 0) {
                    this.tab++
                    this.valid = false
                } else {
                    try {
                        const result = await AntiqueClient.postAntique(this.antique)
                        if (this.isIndividual) {
                            this.applier.type = 'INDIVIDUAL'
                            await AntiqueClient.postIndividualApplierInfo(result.id, this.applier)
                        } else {
                            this.applier.type = 'ENTERPRISE'
                            await AntiqueClient.postEnterpriseApplierInfo(result.id, this.applier)
                        }
                    } catch (e) {
                        console.log(e)
                    } finally {
                        this.$router.go(-1);
                    }
                }
            }
        },
        name: "NewAntiqueDialog"
    }
</script>

<style scoped>

</style>
