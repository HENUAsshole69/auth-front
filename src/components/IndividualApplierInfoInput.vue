<template>
    <v-container fluid style="margin: 0;padding: 0">
        <v-row style="margin: 0;padding: 0">
            <v-col>
                <v-subheader>申请人信息</v-subheader>
                <v-divider/>
                <v-text-field :disabled="disabled" :rules="nonEmptyRules" dense label="姓名" v-model="info.name"/>
            </v-col>
        </v-row>
        <v-row style="margin: 0;padding: 0">
            <v-col>
                <v-text-field :disabled="disabled" :rules="nonEmptyRules" dense label="身份证号" type="tel"
                              v-model="info.citizenId"/>
            </v-col>
        </v-row>
        <v-row style="margin: 0;padding: 0">
            <v-col>
                <v-text-field :disabled="disabled" :rules="nonEmptyRules" dense label="联系电话" type="tel"
                              v-model="info.tel"/>
            </v-col>
            <v-col>
                <v-text-field :disabled="disabled" :rules="nonEmptyRules" dense label="电子邮件" type="email"
                              v-model="info.email"/>
            </v-col>
        </v-row>
        <v-row style="margin: 0;padding: 0">
            <v-col>
                <v-text-field :disabled="disabled" :rules="nonEmptyRules" dense label="传真" v-model="info.fax"/>
            </v-col>
            <v-col>
                <v-text-field :disabled="disabled" :rules="nonEmptyRules" dense label="邮编" v-model="info.zipCode"/>
            </v-col>
        </v-row>
        <v-row style="margin: 0;padding: 0">
            <v-col>
                <v-text-field :disabled="disabled" :rules="nonEmptyRules" dense label="通讯地址"
                              v-model="info.contactAddress"/>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from "vue-class-component";
    import {Prop} from "vue-property-decorator";
    import {IndividualApplierInfo} from "@/model/ApplierInfo";

    @Component({
        components: {},
        model: {
            prop: 'info'
        }
    })
    export default class extends Vue {
        @Prop()
        readonly info: IndividualApplierInfo | undefined

        @Prop()
        readonly disabled: boolean | undefined

        private nonEmptyRules = [(v: string | undefined) => v !== undefined && v.length !== 0 || '不能为空']
    }
</script>

<style scoped>

</style>
