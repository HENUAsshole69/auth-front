<template>
    <transition
            enter-active-class="animated slideInRight"
            leave-active-class="animated slideOutLeft">

    <v-card
            :elevation="0"
            flat
            tile
    >
        <v-card-title>鉴定证书</v-card-title>
        <v-card-text class="text--primary" v-if="loading">
            <v-container fluid>
                <v-row
                >
                    <v-col cols="12">
                        <v-row
                                align="center"
                                justify="center"
                    >
                    <v-progress-circular
                            indeterminate
                            color="primary"
                            class="text-center"
                    ></v-progress-circular>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
        </v-card-text>

        <v-card-text class="text--primary" v-else>
            <v-form v-model="valid" :disabled="false" v-if="empty">
                <v-container>
                    <v-row>
                        <v-col>
                            <pic-file-input @change="cert = $event"/>
                        </v-col>
                    </v-row>
                </v-container>
            </v-form>
            <viewer :images="[pic]" v-else>
                <img
                        style="width: 200px;height: 200px"
                        :src="pic"
                >
            </viewer>
        </v-card-text>

        <v-card-actions>
            <v-spacer/>
            <v-btn
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
    import PicFileInput from "../PicFileInput";
    import 'viewerjs/dist/viewer.css'
    export default {
        name: "CredDetail",
        components: {PicFileInput},
        props:{
            antique:Object
        },
        data:()=>({
            contentRules:[(v)=> v.length !== 0 || '内容不能为空'],
            wearAndTear:{
                content:''
            },
            valid:false,
            cert:'',
            empty:true,
            pic:'',
            loading:true
        }),
        methods:{
            async onSubmit(){
                if(this.antique?.id !== undefined) {
                    await AntiqueClient.postAntiqueCert(this.antique.id,this.cert)
                }
                this.$emit('success')
                this.$router.go(0)
            },
        },
        async mounted() {
            try{
                this.pic ='data:image/jpeg;base64, '+ (await AntiqueClient.getAntiqueCert(this.antique.id)).data
                this.empty = false
            }catch (e) {
                this.empty = true
            }
            this.loading = false
        }
    }
</script>

<style lang="scss" scoped>
    $animationDuration: 0.5s; // specify animation duration. Default value: 1s
    @import "~vue2-animate/src/sass/vue2-animate";
</style>
