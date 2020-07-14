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
                    <v-btn dark text @click="dialog = false">上传</v-btn>
                </v-toolbar-items>
            </v-toolbar>
            <v-container>
                <v-row>
                    <v-col>
                        <v-data-table
                                :headers="headers"
                                :items="antiques"
                                sort-by="calories"
                                class="elevation-1"
                        >
                            <template v-slot:top>
                                <v-toolbar flat color="white">
                                    <v-toolbar-title>My CRUD</v-toolbar-title>
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
                                    >New Item</v-btn>
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
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
    import TypeSelector from "./TypeSelector";
    export default {
        components: {TypeSelector},
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
                { text: 'Actions', value: 'actions', sortable: false },
            ],
            antiques: [],
            nameRules:[v=> v.length !== 0 || '名称不能为空'],
            despRules:[v=> v.length !== 0 || '描述不能为空'],
            picRules:[v=> v !== undefined || '图片不可不选']
        }),
        name: "BatchImportDialog",
        methods:{
            deleteItem (item) {
                const index = this.antiques.indexOf(item)
                confirm('Are you sure you want to delete this item?') && this.antiques.splice(index, 1)
            },
            addItem(){
                this.antiques.push({
                    name:'',
                    type:'',
                    desp:''
                })
            }
        }
    }
</script>

<style scoped>

</style>
