<template>
    <div style="height: 100%">
        <v-app-bar
                color="indigo darken-2"
                dense
                dark
        >
            <v-btn icon @click="$router.go(-1)">
                <v-icon>mdi-close</v-icon>
            </v-btn>

            <v-toolbar-title>{{antiqueDto !== undefined?antiqueDto.name:''}}</v-toolbar-title>

            <v-spacer></v-spacer>

        </v-app-bar>
        <v-img
                :src="picSrc"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="400px"
        >
        </v-img>
        <v-list
                subheader
                three-line
        >
            <v-subheader>详细信息</v-subheader>

            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title>编号</v-list-item-title>
                    <v-list-item-subtitle>{{antiqueDto.id}}</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title>名称</v-list-item-title>
                    <v-list-item-subtitle>{{antiqueDto.name}}</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title>描述</v-list-item-title>
                    <v-list-item-subtitle>{{antiqueDto.desp}}</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title>审核状态</v-list-item-title>
                    <v-list-item-subtitle><verification-stepper :antique="antiqueDto"/></v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from "vue-class-component";
    import {Prop} from "vue-property-decorator";
    import {AntiqueDto} from "@/model/Antique";
    import {AntiqueClient} from "@/client/AntiqueClient";
    import VerificationDisplay from "@/components/VerificationDisplay.vue";
    import {VerClient} from "@/client/VerClient";
    import {VerificationProcessDto} from "@/model/Verification";
    import VerificationStepper from "@/components/classic/VerificationStepper.vue";
    @Component({
        components: {VerificationStepper, VerificationDisplay}
    })
    export default class AntiqueDetail extends Vue{
        @Prop() readonly id: number | undefined
        private antiqueDto: AntiqueDto | undefined
        private picSrc=""
        verifications: VerificationProcessDto[] = []
        async mounted(){
            if(this.id == undefined) return
            this.antiqueDto = await AntiqueClient.getAntiqueDto(this.id)
            this.picSrc ='data:image/jpeg;base64, '+ (await AntiqueClient.getAntiquePic(this.antiqueDto?.id))
            const result = await VerClient.getVerification(this.antiqueDto?.id)
            this.verifications.push(...result)
        }
    }
</script>

<style scoped>

</style>
