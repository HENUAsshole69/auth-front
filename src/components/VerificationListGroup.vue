<template>
        <v-list-item>
            <v-list-item-content>
                <v-container>
                    <v-row>
                        <v-col>
                            <v-text-field v-model="verificationDto.content"></v-text-field>
                        </v-col>
                        <v-col>
                            <StageSelector @change="verificationDto.stage = $event"/>
                        </v-col>
                        <v-col>
                            <v-btn text small @click="onVerification" color="primary">批准</v-btn>
                        </v-col>
                    </v-row>
                </v-container>
            </v-list-item-content>
        </v-list-item>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from "vue-class-component";
    import {Prop} from "vue-property-decorator";
    import {AntiqueClient} from "@/client/AntiqueClient";
    import {AntiqueDto} from "../model/Antique";
    import {VerificationProcessDto} from "@/model/Verification";
    import {VerClient} from "@/client/VerClient";
    import StageSelector from "@/components/StageSelector.vue";
    @Component({
        components:{
            StageSelector

        }
    })
    export default class VerificationListGroup extends Vue{
        @Prop() readonly antique: AntiqueDto | undefined
        verifications: VerificationProcessDto[] = []
        verificationDto: VerificationProcessDto = {
            id:undefined,
            content:undefined,
            stage:undefined
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
                alert(result)
            }
        }
    }
</script>

<style scoped>

</style>
