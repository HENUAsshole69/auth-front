<template>
    <v-card
            style="margin:1em"
    >
        <v-card-title>鉴定证书</v-card-title>


        <v-card-text class="text--primary">
            <v-form v-model="valid" :disabled="false" v-if="empty">
                <v-container>
                    <v-row>
                        <v-col>
                            <pic-file-input @change="cert = $event"/>
                        </v-col>
                    </v-row>
                </v-container>
            </v-form>
            <v-img :src="pic" v-else/>
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
</template>

<script>
    import {AntiqueClient} from "../../client/AntiqueClient";
    import PicFileInput from "../PicFileInput";

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
            pic:''
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
        }
    }
</script>

<style scoped>

</style>
