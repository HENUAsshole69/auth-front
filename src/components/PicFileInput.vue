<template>
    <v-file-input
            accept="image/png, image/jpeg, image/bmp"
            placeholder="选择图片"
            prepend-icon="mdi-camera"
            @change="picToBase64($event)"
            hint="请选择图片"
            label="图片"
            :rules="picRules"
    ></v-file-input>
</template>

<script>
    export default {
        name: "PicFileInput",
        data:()=>({
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
                        model.$emit('change',window.btoa(binaryData));
                    };
                })(f);
                // Read in the image file as a data URL.
                reader.readAsBinaryString(f);
            }
        }
    }
</script>

<style scoped>

</style>
