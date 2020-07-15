<template>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <!--<template v-slot:activator="{ on, attrs }">
            <v-btn
                    color="primary"
                    dark
                    v-bind="attrs"
                    v-on="on"
            >
                Open Dialog
            </v-btn>
        </template>-->
        <v-card>
            <v-toolbar dark color="primary">
                <v-btn icon dark @click="$emit('close')">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>批量导入</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn dark text @click="upload" :disabled="!valid">上传</v-btn>
                </v-toolbar-items>
            </v-toolbar>
            <div v-if="uploading" style="
            width: 100%;
            height:100%">
                <v-progress-circular
                        :rotate="-90"
                        :size="100"
                        :width="15"
                        :value="uploadPercentage"
                        class="center"
                        color="primary"
                >
                    {{uploadPercentage+'%'}}
                </v-progress-circular>
            </div>
            <v-container fluid v-else>
                <v-row>
                    <v-col>
                        <v-form v-model="valid">
                        <v-data-table
                                :headers="headers"
                                :items="antiques"
                                sort-by="calories"
                                class="elevation-1"
                        >
                            <template v-slot:top>
                                <v-toolbar flat color="white">
                                    <v-toolbar-title>欲添加条目</v-toolbar-title>
                                    <v-divider
                                            class="mx-4"
                                            inset
                                            vertical
                                    ></v-divider>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                            color="primary"
                                            dark
                                            class="mb-2"
                                            v-bind="attrs"
                                            @click="addItem"
                                    >新增条目</v-btn>
                                </v-toolbar>
                            </template>
                            <template v-slot:item.name="{ item }">
                                <v-text-field v-model="item.name" :rules="nameRules"/>
                            </template>
                            <template v-slot:item.desp="{ item }">
                                <v-text-field v-model="item.desp" :rules="despRules"/>
                            </template>
                            <template v-slot:item.type="{ item }">
                                <type-selector @change="item.type = $event"/>
                            </template>
                            <template v-slot:item.pic="{ item }">
                                <pic-file-input @change="item.pic = $event"/>
                            </template>
                            <template v-slot:item.actions="{ item }">

                                <v-icon
                                        small
                                        @click="deleteItem(item)"
                                >
                                    mdi-delete
                                </v-icon>
                            </template>
                            <template v-slot:no-data>
                                <v-btn color="primary" @click="initialize">Reset</v-btn>
                            </template>
                        </v-data-table>
                        </v-form>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
    import TypeSelector from "./TypeSelector";
    import PicFileInput from "./PicFileInput";
    import {AntiqueClient} from "../client/AntiqueClient";
    export default {
        components: {PicFileInput, TypeSelector},
        props:{
            dialog:Boolean
        },
        data:()=>({
            headers: [
                {
                    text: '名称',
                    align: 'start',
                    sortable: false,
                    value: 'name',
                },
                { text: '描述', value: 'desp' },
                { text: '类别', value: 'type' },
                { text: '图片', value: 'pic' },
                { text: '删除', value: 'actions', sortable: false },
            ],
            antiques: [],
            nameRules:[v=> v.length !== 0 || '名称不能为空'],
            despRules:[v=> v.length !== 0 || '描述不能为空'],
            picRules:[v=> v !== undefined || '图片不可不选'],
            valid:false,
            uploading:false,
            uploadPercentage:0
        }),
        name: "BatchImportDialog",
        methods:{
            deleteItem (item) {
                const index = this.antiques.indexOf(item)
                confirm('确定要删除该项吗?') && this.antiques.splice(index, 1)
            },
            addItem(){
                this.antiques.push({
                    name:'',
                    type:'',
                    desp:'',
                    pic:''
                })
            },
            async upload() {
                this.uploading = true
                let finished = 0;
                for(const antique of this.antiques){
                    await AntiqueClient.postAntique(antique)
                    finished++;
                    this.uploadPercentage = (finished / this.antiques.length)*100
                }
                this.$emit('close')
            }
        }
    }
</script>

<style scoped lang="scss">
@import "style/layout";
</style>
