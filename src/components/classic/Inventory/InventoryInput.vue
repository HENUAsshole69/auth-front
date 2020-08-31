<template>
    <v-card elevation="0" tile>
        <v-form v-model="valid">
            <v-container fluid style="margin: 0;padding: 1em;z-index: -1">
                <v-row dense no-gutters>
                    <v-col>
                        <v-row dense no-gutters>
                            <v-col>
                                <v-text-field :rules="nonEmptyRules" dense label="入库状态"
                                              v-model="inventory.requisitionStatus"/>
                            </v-col>
                        </v-row>
                        <v-row dense no-gutters>
                            <v-col>
                                <v-text-field
                                        :value="inventory.requisitionTime === ''?'不存在':new Date(inventory.requisitionTime).toLocaleDateString('zh-cn')"
                                        dense label="入库时间" readonly/>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col>
                        <v-row>
                            <v-col>
                                <inventory-file-input :id="id" :key="updateKey" @update="updateKey++"/>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>

                <v-overlay
                        :value="noEntry"
                        absolute
                >
                    <v-container style="z-index: 10;top: 0">
                        <v-row no-gutters>
                            <v-col>
                                <p class="text-center" style="margin: 0">无库存数据</p>
                            </v-col>
                        </v-row>
                        <v-row no-gutters>
                            <v-col>
                                <v-btn @click="noEntry = false" light small>点此添加</v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-overlay>
            </v-container>
        </v-form>
        <v-card-actions>
            <v-btn
                    :disabled="!valid"
                    @click="save"
                    color="primary"
                    small
                    text
            >
                保存
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from "vue-class-component";
    import {Prop} from "vue-property-decorator";
    import {InventoryDto} from "@/model/Inventory";
    import {InventoryClient} from "@/client/InventoryClient";
    import InventoryFileInput from "@/components/classic/Inventory/InventoryFileInput.vue";

    @Component({
        components: {InventoryFileInput},
        model: {
            prop: 'id'
        }
    })
    export default class InventoryInput extends Vue {
        @Prop()
        readonly id: number | undefined
        private inventory: InventoryDto = {requisitionStatus: "", requisitionTime: ""}
        private valid = false
        private noEntry = false
        private updateKey = 0
        private nonEmptyRules = [(v: string | undefined) => v !== undefined && v.length !== 0 || '不能为空']

        async beforeMount() {
            if (this.id !== undefined) {
                try {
                    this.inventory = await InventoryClient.getInventoryForAntiqueId(this.id)
                } catch (e) {
                    this.noEntry = true
                }
            }
        }

        async save() {
            if (this.id !== undefined) {
                this.inventory.requisitionTime = new Date().toISOString()
                await InventoryClient.postInventoryForAntiqueId(this.inventory, this.id!)
                this.$emit('update')
            }
        }
    }
</script>

<style scoped>
    .blurred-background {
        filter: blur(4px);
    }
</style>
