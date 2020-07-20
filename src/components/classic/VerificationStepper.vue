<template>
    <v-container>
        <v-col>

            <v-stepper v-model="stepper" vertical>
                <template v-for="num in [1,2,3]">
                    <v-stepper-step :editable="
allowedStep.includes(StageSelectNameMap[num - 1].value) &&( antique.invalid !== true) && ifRoleCanVerify($store.state.userObj.type)" :complete="antique.verificationProcesses >= num" :step="num" :key="0-num" :rules="[()=>!(antique.invalid && antique.verificationProcesses === num)]">
                        {{StageSelectNameMap[num - 1].text}}
                        <small>{{verifications[num - 1]!==undefined?verifications[num - 1].content:''}}</small>
                    </v-stepper-step>
                    <non-final-verification-step :editable="allowedStep.includes(StageSelectNameMap[num - 1].value) &&( antique.invalid !== true) && ifRoleCanVerify($store.state.userObj.type)" :step="num" v-if="num !== 3" :key="num" @success="$router.go(0)" @error="$router.go(0)" :antique="antique"/>
                    <final-verification-step :editable="allowedStep.includes(StageSelectNameMap[num - 1].value) &&( antique.invalid !== true) && ifRoleCanVerify($store.state.userObj.type)" :step="num" v-else :key="num" @success="$router.go(0)" @error="$router.go(0)" :antique="antique"/>
                </template>
            </v-stepper>
        </v-col>
    </v-container>
</template>

<script lang="ts">
    import Vue from 'vue'
    import {StageSelectNameMap, VerificationProcessStage, strToStep} from "@/model/Verification";
    import Component from "vue-class-component";
    import {Prop} from "vue-property-decorator";
    import {AntiqueDto} from "@/model/Antique";
    import {VerificationProcessDto} from "@/model/Verification";
    import {ifRoleCanVerify} from '@/accessControl';
    import {VerClient} from "@/client/VerClient";
    import StageSelector from "@/components/StageSelector.vue";
    import VerificationDisplay from "@/components/VerificationDisplay.vue";
    import NonFinalVerificationStep from "@/components/classic/NonFinalVerificationStep.vue";
    import FinalVerificationStep from "@/components/classic/FinalVerificationStep.vue";
    @Component({
        components:{
            NonFinalVerificationStep,
            VerificationDisplay,
            StageSelector,
            FinalVerificationStep
        }
    })
    export default class VerificationListGroup extends Vue{
        @Prop() readonly antique: AntiqueDto | undefined
        @Prop() readonly horizontal: boolean | undefined
        valid = false
        StageSelectNameMap = StageSelectNameMap
        stepper=0
        allowedStep: Array<any>=[]
        ifRoleCanVerify = ifRoleCanVerify
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
                this.stepper = this.antique.verificationProcesses + 1
                const result = await VerClient.getVerification(this.antique?.id)
                this.verifications.push(...result)
            }
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            const model = this
        this.allowedStep.push(...StageSelectNameMap.filter(function (value) {
                return model.$store.state.userObj.verifiable.includes(value.value) && !model.verified.includes(strToStep(value.value))
            }).map(function (v) {
            return v.value
        }))
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
