<template>
    <div>
        <v-file-input
                :rules="picRules"
                @change="onChange($event)"
                hint="请选择文件"
                label="新文件"
                :loading="loading"
                placeholder="添加新文件"
                prepend-icon="mdi-file"
                dense
        >
            <template v-slot:progress>
                <v-progress-linear :value="progress" absolute></v-progress-linear>
            </template>
        </v-file-input>
    </div>
</template>

<script>
    import {InventoryClient} from "@/client/InventoryClient";

    export default {
        name: "FormFileUploader",
        props: {
            id: Number
        },
        data: () => ({
            picRules: [v => v !== undefined || '文件不可不选'],
            progress: 0,
            loading: false
        }),
        methods: {
            async onChange(file) {
                // eslint-disable-next-line @typescript-eslint/no-this-alias
                const model = this
                this.loading = true
                console.log(await InventoryClient.uploadFileForAntique(file, this.id, function (progressEvent) {
                    model.progress = (progressEvent.loaded / progressEvent.total) * 100
                }))
                this.$emit('update')
                this.loading = false
            }
        }
    }
</script>

<style scoped>

</style>
