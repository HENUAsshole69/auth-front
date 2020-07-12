<template>
    <v-container fluid>
        <v-row>
            <v-col>
                <v-text-field label="名称" v-model="antique.name"/>
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
                        label="照片"
                ></v-file-input>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-btn color="primary" @click="onFinish">确定</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import TypeSelector from "../components/TypeSelector";
    import {AntiqueClient} from "../client/AntiqueClient";
    export default {
        components: {TypeSelector},
        data:()=>({
            antique:{
            },
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
                    console.log(result)
                }catch (e) {
                    console.log(e)
                }
            }
        },
        name: "NewAntique"
    }
</script>

<style scoped>

</style>
