<template>
    <transition
            enter-active-class="animated slideInRight"
            leave-active-class="animated slideOutLeft">
    <v-card
            style="margin:1em"
    >
            <v-card-title>磨损信息</v-card-title>


        <v-card-text class="text--primary">
            <v-form v-model="valid" :disabled="antique.wearAndTear !== null">
            <v-container>
                <v-row>
                    <v-col>
                        <v-textarea v-model="wearAndTear.content" :rules="contentRules"></v-textarea>
                    </v-col>
                </v-row>
            </v-container>
            </v-form>
        </v-card-text>

        <v-card-actions>
            <v-spacer/>
            <v-btn
                    v-if="antique.wearAndTear === null"
                    @click="onSubmit"
                    :disabled="!valid"
                    text
            >
                保存
            </v-btn>

        </v-card-actions>
    </v-card>
    </transition>
</template>

<script>
    import {AntiqueClient} from "../../client/AntiqueClient";

    export default {
        name: "WearAndTearDetail",
        props:{
            antique:Object
        },
        data:()=>({
            contentRules:[(v)=> v.length !== 0 || '内容不能为空'],
            wearAndTear:{
                content:''
            },
            valid:false
        }),
        methods:{
            async onSubmit(){
                if(this.antique?.id !== undefined) {
                    const result = await AntiqueClient.postAntiqueWearAndTear(this.antique.id,this.wearAndTear)
                }
                this.$emit('success')
                this.$router.go(0)
            },
        },
        mounted() {
            if(this.antique.wearAndTear !== null){
                this.wearAndTear = this.antique.wearAndTear
            }
        }
    }
</script>

<style lang="scss" scoped>
    $animationDuration: 0.5s; // specify animation duration. Default value: 1s
    @import "~vue2-animate/src/sass/vue2-animate";
</style>
