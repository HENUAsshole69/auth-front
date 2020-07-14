<template>
    <v-container>
        <v-col>

    <v-list  two-line subheader>
        <v-divider inset></v-divider>
        <v-subheader inset>过审步骤</v-subheader>
        <v-list-item>
            <VerificationDisplay :verifications="verifications"/>
        </v-list-item>
        <v-divider inset></v-divider>
        <v-subheader inset>审核</v-subheader>
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
                        <v-col>
                            <v-btn text small color="error" @click="onInvalidate">拒绝批准</v-btn>
                        </v-col>
                    </v-row>
                </v-container>
            </v-list-item-content>
        </v-list-item>
    </v-list>

        </v-col>
    </v-container>
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
    import VerificationDisplay from "@/components/VerificationDisplay.vue";
    @Component({
        components:{
            VerificationDisplay,
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
