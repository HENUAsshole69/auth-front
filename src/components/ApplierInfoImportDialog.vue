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
                <v-btn :disabled="!valid" @click="onFinish" color="blue darken-1" text>导入</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import IndividualApplierInfoInput from "./IndividualApplierInfoInput";
    import EnterpriseApplierInfoInput from "./EnterpriseApplierInfoInput";
    import ApplierType from "./ApplierType";

    export default {
        components: {ApplierType, EnterpriseApplierInfoInput, IndividualApplierInfoInput},
        model: {
            prop: 'dialog',
            event: 'close'
        },
        data: () => ({
            isIndividual: false,
            loading: false,
            valid: false
        }),
        props: {
            dialog: Boolean,
            applier: Object
        },
        name: "ApplierInfoImportDialog",
        methods: {
            onFinish: async function () {
                if (this.isIndividual) {
                    this.applier.type = 'INDIVIDUAL'
                } else {
                    this.applier.type = 'ENTERPRISE'
                }
                this.$emit('success')
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "style/layout";
</style>
