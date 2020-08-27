<template>
    <v-dialog :scrollable="false" :value="dialog" @click:outside="$emit('close',false)" @close="$emit('close',false)"
              transition="dialog-bottom-transition" width="500">
        <v-card>
            <v-system-bar window>
                <v-icon>mdi-folder-plus</v-icon>
                <span>申请人信息</span>
                <v-spacer></v-spacer>
                <v-icon @click="$emit('close',false)">mdi-close</v-icon>
            </v-system-bar>
            <v-progress-linear
                    color="cyan"
                    indeterminate
                    style="z-index: 1"
                    v-if="loading"
            ></v-progress-linear>
            <v-card-text>
                <v-container fluid style="margin: 0;padding: 0">
                    <v-row no-gutters style="margin: 0;padding: 0">
                        <v-col style="margin: 0;padding: 0">
                            <applier-type v-model="isIndividual"/>
                        </v-col>
                    </v-row>
                    <v-row no-gutters style="margin: 0;padding: 0">
                        <v-col style="margin: 0;padding: 0">
                            <v-form v-model="valid">
                                <individual-applier-info-input :disabled="loading" v-if="isIndividual"
                                                               v-model="applier"/>
                                <enterprise-applier-info-input :disabled="loading" v-else v-model="applier"/>
                            </v-form>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :disabled="!valid" @click="onFinish" color="blue darken-1" text>保存</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import IndividualApplierInfoInput from "./IndividualApplierInfoInput";
    import EnterpriseApplierInfoInput from "./EnterpriseApplierInfoInput";
    import ApplierType from "./ApplierType";
    import {AntiqueClient} from "../client/AntiqueClient";

    export default {
        components: {ApplierType, EnterpriseApplierInfoInput, IndividualApplierInfoInput},
        model: {
            prop: 'dialog',
            event: 'close'
        },
        data: () => ({
            isIndividual: false,
            loading: true,
            applier: {},
            valid: false
        }),
        props: {
            dialog: Boolean,
            id: Number
        },
        name: "ApplierInfoEditDialog",
        async beforeMount() {
            const dto = (await AntiqueClient.getAntiqueDto(this.id))
            this.isIndividual = dto.owner.type === 'INDIVIDUAL'
            this.applier = dto.owner
            this.loading = false
        },
        methods: {
            onFinish: async function () {
                try {
                    if (this.isIndividual) {
                        this.applier.type = 'INDIVIDUAL'
                        await AntiqueClient.postIndividualApplierInfo(this.id, this.applier)
                    } else {
                        this.applier.type = 'ENTERPRISE'
                        await AntiqueClient.postEnterpriseApplierInfo(this.id, this.applier)
                    }
                } catch (e) {
                    console.log(e)
                } finally {
                    this.$emit('close', false)
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "style/layout";
</style>
