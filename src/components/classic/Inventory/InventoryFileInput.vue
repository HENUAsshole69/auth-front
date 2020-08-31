<template>
    <v-list>
        <v-list-item
                :key="item.id"
                v-for="item in fileList"
        >
            <v-list-item-icon>
                <v-icon>mdi-file</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
                <v-list-item-title v-text="item.fileName"></v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        <v-list-item>
            <v-list-item-content>
                <form-file-uploader :id="id" @update="$emit('update')"/>
            </v-list-item-content>
        </v-list-item>
    </v-list>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from "vue-class-component";
    import {Prop} from "vue-property-decorator";
    import {File as FileDto} from "@/model/Inventory";
    import {InventoryClient} from "@/client/InventoryClient";
    import FormFileUploader from "@/components/classic/Inventory/FormFileUploader.vue";

    @Component({
        components: {FormFileUploader},
        model: {
            prop: 'id'
        }
    })
    export default class InventoryFileInput extends Vue {
        @Prop()
        readonly id: number | undefined
        private fileList: FileDto[] = []
        private editable = true

        async mounted() {
            if (this.id !== undefined) {
                try {
                    this.fileList.push(...await InventoryClient.getInventoryFileListForAntiqueId(this.id))
                } catch (e) {
                    this.editable = false
                }
            }
        }
    }
</script>

<style scoped>

</style>
