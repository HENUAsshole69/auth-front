<template>
    <v-file-input
            :rules="picRules"
            @change="onChange($event)"
            accept="image/png, image/jpeg, image/bmp"
            hint="请选择文件"
            label="文件"
            placeholder="选择文件"
            prepend-icon="mdi-file"
    ></v-file-input>
</template>

<script>
    import AxiosInstance from "../../client/AxiosInstance";

    export default {
        name: "FormFileUploader",
        data: () => ({
            picRules: [v => v !== undefined || '图片不可不选']
        }),
        methods: {
            onChange(file) {
                console.log(file)
                const formData = new FormData();
                formData.append("file", file);
                AxiosInstance.post('/file', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>
