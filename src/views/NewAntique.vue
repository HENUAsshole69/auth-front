<template>
    <v-form v-model="valid">
    <v-container fluid>
        <v-row>
            <v-col>
                <v-text-field label="名称" :rules="nameRules" v-model="antique.name"  :hint="'输入文物名称'"/>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-textarea label="描述" :rules="nameRules" v-model="antique.desp"  :hint="'输入文物描述'"/>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <TypeSelector @change="antique.type = $event"/>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <PicFileInput @change="antique.pic = $event"/>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-btn color="primary" @click="onFinish" :disabled="!valid">确定</v-btn>
            </v-col>
        </v-row>
    </v-container>
    </v-form>
</template>

<script>
    import TypeSelector from "../components/TypeSelector";
    import {AntiqueClient} from "../client/AntiqueClient";
    import PicFileInput from "../components/PicFileInput";
    export default {
        components: {PicFileInput, TypeSelector},
        data:()=>({
            antique:{
                name:'',
                type:null,
                desp:'',
                pic:''
            },
            valid:false,
            nameRules:[v=> v.length !== 0 || '名称不能为空'],
            despRules:[v=> v.length !== 0 || '描述不能为空']
        }),
        methods:{
            onFinish: async function (){
                console.log(this.antique)
                try {
                    const result = await AntiqueClient.postAntique(this.antique)
                }catch (e) {
                    console.log(e)
                }finally {
                    this.$router.go(-1)
                }
            }
        },
        name: "NewAntique"
    }
</script>

<style scoped>

</style>
