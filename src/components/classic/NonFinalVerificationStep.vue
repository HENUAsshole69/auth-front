<template>
    <v-stepper-content :step="step" v-if="editable" >
        <v-card raised class="mb-12" height="200px">
            <v-container>
                <v-row>
                    <v-col>
                        <v-form v-model="valid">
                            <v-textarea v-model="verificationDto.content" :rules="contentRules"></v-textarea>
                        </v-form>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
        <v-btn color="primary" @click="onVerification" :disabled="!valid">批准</v-btn>
        <v-btn text color="error" @click="onInvalidate" :disabled="!valid">拒绝批准</v-btn>
    </v-stepper-content>
    <v-stepper-content :step="step" v-else>

    </v-stepper-content>
</template>

<script>
    import {VerClient} from "@/client/VerClient";
    import {StageSelectNameMap} from "@/model/Verification";

    export default {
        name: "NonFinalVerificationStep",
        props:{
            step:Number,
            antique:Object,
            editable:Boolean
        },
        data:()=>({
            contentRules:[(v)=> v.length !== 0 || '内容不能为空'],
            verificationDto : {
                id:undefined,
                content:'',
                stage:undefined
            },
            valid:false
        }),
        mounted() {
            this.verificationDto.stage = StageSelectNameMap[this.step - 1].value
        },
        computed:{
            verified: function(){
                return this.verifications.map((value)=>value.stage)
            }
        },
        methods:{
            async onVerification(){
                if(this.antique?.id !== undefined) {
                    const result = await VerClient.verifyAntique(this.antique.id,this.verificationDto)
                }
                this.$emit('success')
            },

            async onInvalidate(){
                await this.onVerification()
                if(this.antique?.id !== undefined) {
                    const result = await VerClient.invalidate(this.antique.id)
                }
                this.$emit('error')
            }
        }
    }
</script>

<style scoped>

</style>
