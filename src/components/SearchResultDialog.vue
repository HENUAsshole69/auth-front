<template>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card>
            <v-toolbar dark color="indigo darken-2">
                <v-btn icon dark @click="$emit('close')">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-container fluid style="margin-top: 1.9em">
                    <v-row>
                        <v-col>
                            <v-text-field solo-inverted append-icon="mdi-magnify" v-model="keyInput" @click:append="search"/>
                        </v-col>
                    </v-row>
                </v-container>
            </v-toolbar>
            <v-tabs
                    fixed-tabs
                    background-color="indigo darken-2"
                    dark
                    v-model="tab"
            >
                <v-tab>
                    文物
                </v-tab>
                <v-tab>
                    审核
                </v-tab>
            </v-tabs>
            <v-container fluid>
                <v-row no-gutters>
                    <v-col>
                        <v-tabs-items v-model="tab">
                            <v-tab-item>
                                <div v-infinite-scroll="loadMore" :infinite-scroll-disabled="busy" infinite-scroll-distance="0">
                                <v-container fluid>
                                    <v-row dense>
                                        <v-col
                                                v-for="card in antiques"
                                                :key="card.title">
                                            <!--:cols="card.flex"-->
                                            <AntiqueCard :antique="card"/>
                                        </v-col>
                                    </v-row>
                                </v-container>
                                </div>
                            </v-tab-item>
                            <v-tab-item>
                                <div v-infinite-scroll="loadMore" :infinite-scroll-disabled="busy" infinite-scroll-distance="0">
                                <v-container fluid>
                                    <v-row no-gutters>
                                        <v-col>
                                            <v-list>
                                                <v-list-group
                                                        v-for="item in antiques"
                                                        :key="item.name"
                                                        v-model="item.active"
                                                        :prepend-icon="item.action"
                                                        no-action
                                                >
                                                    <template v-slot:activator>
                                                        <v-list-item-content>
                                                            <v-list-item-title v-text="item.name"></v-list-item-title>
                                                        </v-list-item-content>
                                                    </template>
                                                    <VerificationListGroup :antique="item"/>

                                                    <v-list-item
                                                            v-for="subItem in item.items"
                                                            :key="subItem.name"
                                                    >
                                                        <v-list-item-content>
                                                            <v-list-item-title v-text="subItem.title"></v-list-item-title>
                                                        </v-list-item-content>
                                                    </v-list-item>
                                                </v-list-group>
                                            </v-list>
                                        </v-col>
                                    </v-row>
                                </v-container>
                                </div>
                            </v-tab-item>
                        </v-tabs-items>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
    import {AntiqueClient} from "../client/AntiqueClient";
    import infiniteScroll from 'vue-infinite-scroll'
    export default {
        name: "SearchResultDialog",
        props:{
            dialog:Boolean
        },
        directives:{
            infiniteScroll
        },
        data:()=>({
            tab:null,
            antiques:[],
            key:'a',
            keyInput:'a',
            busy:false
        }),
        methods:{
            loadMore: async function() {
                this.busy = true;
                const result = await AntiqueClient.searchAntique(this.key,this.pageNo,this.pageLen)
                alert(result)
                this.antiques.push(...result.content)
                if(!result.last) {
                    this.pageNo++
                    this.busy = false;
                }
            },
            search:function () {
                this.key= this.keyInput
                this.busy=false
            }
        }
    }
</script>

<style scoped>

</style>
