<template>
    <v-container>
        <v-row>
            <v-col>
    <v-dialog
            v-model="dialog"
            width="500"
    >

        <v-card>
            <v-system-bar window>
                <v-icon>mdi-folder-plus</v-icon>
                <span>新增文物</span>
                <v-spacer></v-spacer>
                <v-icon @click="dialog = false">mdi-close</v-icon>
            </v-system-bar>
            <v-card-text>
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

    </v-container>
    </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog = false">关闭</v-btn>
                <v-btn color="primary" text @click="onFinish" :disabled="!valid">提交</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
            </v-col>
        </v-row>
    </v-container>
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
            despRules:[v=> v.length !== 0 || '描述不能为空'],
            dialog:false
        }),
        mounted() {
            this.dialog = true
        },
        watch:{
            dialog:function (n) {
                if(n === false) this.$router.go(-1)
            }
        },
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
