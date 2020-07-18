<template>
    <v-container>
        <v-col>
            <v-expansion-panels popout>
                <v-expansion-panel>
                    <v-expansion-panel-header>过审步骤</v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <VerificationDisplay :verifications="verifications"/>
                    </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel>
                    <v-expansion-panel-header>审核</v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-list-item-content>
                            <v-container>
                                <v-row>
                                    <v-form v-model="valid">
                                        <v-col>
                                            <v-text-field v-model="verificationDto.content" :rules="contentRules"></v-text-field>
                                        </v-col>
                                        <v-col>
                                            <StageSelector @change="verificationDto.stage = $event" :verified="verified"/>
                                        </v-col>
                                    </v-form>
                                </v-row>
                                <v-row>
                                    <v-col>
                                        <v-btn @click="onVerification" :disabled="!valid" color="primary">批准</v-btn>
                                    </v-col>
                                    <v-col>
                                        <v-btn color="error" @click="onInvalidate" :disabled="antique.invalid">{{antique.invalid?'审批已被拒绝':'拒绝批准'}}</v-btn>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-list-item-content>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>

        </v-col>
    </v-container>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from "vue-class-component";
    import {Prop} from "vue-property-decorator";
    import {AntiqueClient} from "@/client/AntiqueClient";
    import {AntiqueDto} from "../../model/Antique";
    import {VerificationProcessDto} from "@/model/Verification";
    import {VerClient} from "@/client/VerClient";
    import StageSelector from "@/components/StageSelector.vue";
    import VerificationDisplay from "@/components/VerificationDisplay.vue";
    @Component({
        components:{
            VerificationDisplay,
            StageSelector

        }
    })
    export default class VerificationListGroup extends Vue{
        @Prop() readonly antique: AntiqueDto | undefined
        valid = false
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
