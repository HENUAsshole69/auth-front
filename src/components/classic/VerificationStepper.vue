<template>
    <v-container>
        <v-col>

            <v-stepper v-model="stepper" vertical>
                <template v-for="num in [1,2,3]">
                    <v-stepper-step :complete="antique.verificationProcesses >= num" :step="num" :key="0-num" :rules="[()=>!(antique.invalid && antique.verificationProcesses === num)]">
                        {{StageSelectNameMap[num - 1].text}}
                        <small>{{verifications[num - 1].content}}</small>
                    </v-stepper-step>
                    <non-final-verification-step :step="num"  :key="num" @success="$router.go(0)" @error="$router.go(0)" :antique="antique"/>
                </template>
            </v-stepper>
        </v-col>
    </v-container>
</template>

<script lang="ts">
    import Vue from 'vue'
    import {StageSelectNameMap} from "@/model/Verification";
    import Component from "vue-class-component";
    import {Prop} from "vue-property-decorator";
    import {AntiqueDto} from "@/model/Antique";
    import {VerificationProcessDto} from "@/model/Verification";
    import {VerClient} from "@/client/VerClient";
    import StageSelector from "@/components/StageSelector.vue";
    import VerificationDisplay from "@/components/VerificationDisplay.vue";
    import NonFinalVerificationStep from "@/components/classic/NonFinalVerificationStep.vue";
    @Component({
        components:{
            NonFinalVerificationStep,
            VerificationDisplay,
            StageSelector

        }
    })
    export default class VerificationListGroup extends Vue{
        @Prop() readonly antique: AntiqueDto | undefined
        valid = false
        StageSelectNameMap = StageSelectNameMap
        stepper=0
        contentRules=[(v: string)=> v.length !== 0 || '内容不能为空']
        verifications: VerificationProcessDto[] = []
        verificationDto: VerificationProcessDto = {
            id:undefined,
            content:undefined,
            stage:undefined
        }

        get verified(){
            return this.verifications.map((value)=>value.stage)
        }
        async mounted(){
            if(this.antique?.id !== undefined) {
                this.stepper = this.antique.verificationProcesses
                const result = await VerClient.getVerification(this.antique?.id)
                this.verifications.push(...result)
            }
        }
        async onVerification(){
            if(this.antique?.id !== undefined) {
                const result = await VerClient.verifyAntique(this.antique.id,this.verificationDto)
            }
            this.$router.go(0)
        }

        async onInvalidate(){
            if(this.antique?.id !== undefined) {
                const result = await VerClient.invalidate(this.antique.id)
            }
            this.$router.go(0)
        }
    }
</script>

<style scoped>

</style>
