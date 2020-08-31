<template>
    <v-file-input
            :rules="picRules"
            @change="onChange($event)"
            accept="image/png, image/jpeg, image/bmp"
            hint="请选择文件"
            label="新文件"
            placeholder="添加新文件"
            prepend-icon="mdi-file"
    ></v-file-input>
</template>

<script>
    import {InventoryClient} from "@/client/InventoryClient";

    export default {
        name: "FormFileUploader",
        props: {
            id: Number
        },
        data: () => ({
            picRules: [v => v !== undefined || '文件不可不选']
        }),
        methods: {
            async onChange(file) {
                console.log(await InventoryClient.uploadFileForAntique(file, this.id))
                this.$emit('update')
            }
        }
    }
</script>

<style scoped>

</style>
