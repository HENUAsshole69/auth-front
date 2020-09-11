<template>
    <v-container fluid>
        <v-row>
            <v-col>
                <v-text-field :hint="'输入文物名称'" :rules="nameRules" dense label="名称"
                              v-model="antique.name"/>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <type-selector @change="antique.type = $event"/>
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
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from "vue-class-component";
    import {Prop} from "vue-property-decorator";
    import {AntiqueDto} from "@/model/Antique";
    import PicFileInput from "@/components/PicFileInput.vue";
    import TypeSelector from "@/components/TypeSelector.vue";

    @Component({
        components: {TypeSelector, PicFileInput},
        model: {
            prop: 'antique'
        }
    })
    export default class extends Vue {
        @Prop()
        readonly antique: AntiqueDto | undefined
        private nameRules = [(v?: string) => v === undefined || v.length !== 0 || '名称不能为空'];
        private despRules = [(v?: string) => v === undefined || v.length !== 0 || '描述不能为空'];
    }
</script>

<style scoped>

</style>
