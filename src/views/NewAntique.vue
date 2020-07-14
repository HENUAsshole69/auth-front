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
                <v-file-input
                        accept="image/png, image/jpeg, image/bmp"
                        placeholder="选择照片"
                        prepend-icon="mdi-camera"
                        @change="picToBase64($event)"
                        hint="请选择图片"
                        label="照片"
                        :rules="picRules"
                ></v-file-input>
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
    export default {
        components: {TypeSelector},
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
            picRules:[v=> v !== undefined || '图片不可不选']
        }),
        methods:{
            picToBase64:function (files) {
                // eslint-disable-next-line @typescript-eslint/no-this-alias
                const model = this;
                const f = files; // FileList object
                const reader = new FileReader();
                // Closure to capture the file information.
                // eslint-disable-next-line no-unused-vars
                reader.onload = (function(theFile) {
                    return function(e) {
                        const binaryData = e.target.result;
                        //Converting Binary Data to base 64
                        //showing file converted to base64
                        model.antique.pic =  window.btoa(binaryData);
                    };
                })(f);
                // Read in the image file as a data URL.
                reader.readAsBinaryString(f);
            },
            onFinish: async function (){
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
