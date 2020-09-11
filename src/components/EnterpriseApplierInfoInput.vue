<template>
    <v-container fluid style="margin: 0;padding: 0">
        <v-row style="margin: 0;padding: 0">
            <v-col class="horizontal-no-gutter">
                <v-subheader>申请公司或机构信息</v-subheader>
                <v-divider/>
                <v-text-field :disabled="disabled" :rules="nonEmptyRules" dense label="企业名称" v-model="info.name"/>
            </v-col>
        </v-row>
        <v-row style="margin: 0;padding: 0">
            <v-col class="horizontal-no-gutter">
                <v-text-field :disabled="disabled" :rules="nonEmptyRules" dense label="营业执照代码" type="tel"
                              v-model="info.licenseId"/>
            </v-col>
        </v-row>
        <v-row style="margin: 0;padding: 0">
            <v-col class="horizontal-no-gutter">
                <v-text-field :disabled="disabled" :rules="nonEmptyRules" dense label="注册地址" type="tel"
                              v-model="info.registrationAddress"/>
            </v-col>
        </v-row>
        <v-row style="margin: 0;padding: 0">
            <v-col class="horizontal-no-gutter">
                <v-text-field :disabled="disabled" :rules="nonEmptyRules" dense label="法定代表人"
                              v-model="info.legalPerson"/>
            </v-col>
            <v-col class="horizontal-no-gutter">
                <v-text-field :disabled="disabled" :rules="nonEmptyRules" dense label="法人职务"
                              v-model="info.legalPersonPost"/>
            </v-col>
        </v-row>
        <v-row style="margin: 0;padding: 0">
            <v-col class="horizontal-no-gutter">
                <v-text-field :disabled="disabled" :rules="nonEmptyRules" dense label="注册资本" type="number"
                              v-model="info.registrationCapital"/>
            </v-col>
            <v-col class="horizontal-no-gutter">

            </v-col>
        </v-row>
        <v-row style="margin: 0;padding: 0">
            <v-col class="horizontal-no-gutter">
                <v-text-field :disabled="disabled" :rules="nonEmptyRules" dense label="联系人" type="tel"
                              v-model="info.contact"/>
            </v-col>
            <v-col class="horizontal-no-gutter">
                <v-text-field :disabled="disabled" :rules="nonEmptyRules" dense label="联系人职务" type="email"
                              v-model="info.contactPost"/>
            </v-col>
        </v-row>
        <v-row style="margin: 0;padding: 0">
            <v-col class="horizontal-no-gutter">
                <v-text-field :disabled="disabled" :rules="nonEmptyRules" dense label="联系电话" type="tel"
                              v-model="info.tel"/>
            </v-col>
            <v-col class="horizontal-no-gutter">
                <v-text-field :disabled="disabled" :rules="nonEmptyRules" dense label="电子邮件" type="email"
                              v-model="info.email"/>
            </v-col>
        </v-row>
        <v-row style="margin: 0;padding: 0">
            <v-col class="horizontal-no-gutter">
                <v-text-field :disabled="disabled" dense label="传真" v-model="info.fax"/>
            </v-col>
            <v-col class="horizontal-no-gutter">
                <v-text-field :disabled="disabled" dense label="邮编" v-model="info.zipCode"/>
            </v-col>
        </v-row>
        <v-row style="margin: 0;padding: 0">
            <v-col class="horizontal-no-gutter">
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
    import {EnterpriseApplierInfo} from "@/model/ApplierInfo";

    @Component({
        components: {},
        model: {
            prop: 'info'
        }
    })
    export default class extends Vue {
        @Prop()
        readonly info: EnterpriseApplierInfo | undefined

        @Prop()
        readonly disabled: boolean | undefined

        private nonEmptyRules = [(v: string | undefined) => v !== undefined && v.length !== 0 || '不能为空']
    }
</script>

<style scoped>
    .horizontal-no-gutter {
        margin-top: 0;
        margin-bottom: 0;
        padding-top: 0;
        padding-bottom: 0
    }
</style>
