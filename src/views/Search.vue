<template>
    <transition name="fade">
        <div style="height: 100%">
            <v-toolbar
                    color="indigo darken-2"
                    dark

            >
                <v-btn icon dark @click="$router.go(-1)">
                    <v-icon> mdi-arrow-left</v-icon>
                </v-btn>

                <template v-slot:extension>
                    <v-tabs
                            fixed-tabs
                            background-color="indigo darken-2"
                            dark
                            @change="$router.push('/search/'+$router.currentRoute.params.key+'/'+tabs[$event].path)"

                    >
                        <v-tab
                                v-for="tab in tabs"
                                :disabled="(tab.title === '认证' && !ifRoleCanVerify($store.state.userObj.type))"
                                :key="tab.title">
                            {{tab.title}}
                        </v-tab>
                    </v-tabs>
                </template>
                <v-spacer/>
                <v-container fluid style="margin-top: 1.9em">
                    <v-row>
                        <v-col>
                            <v-text-field solo-inverted append-icon="mdi-magnify" v-model="keyInput" @click:append="search"/>
                        </v-col>
                    </v-row>
                </v-container>
            </v-toolbar>

            <router-view></router-view>
        </div>
    </transition>
</template>

<script>
    import {ifRoleCanVerify} from '../accessControl';
    export default {
        name: "Search",
        data:()=>({
            tabs:[
                {
                    title:"文物",
                    path:"antique"
                },
                {
                    title: "认证",
                    path:"verification"
                }
            ],
            searchDialog:false,
            keyInput:''
        }),
        mounted() {
            this.keyInput = this.$router.currentRoute.params.key
        },
        methods:{
            search:function (arg) {
                this.$router.push('/search/'+this.keyInput)
                this.$router.go(0)
            },
            ifRoleCanVerify
        }
    }
</script>

<style scoped lang="scss">
    $animationDuration: 0.5s; // specify animation duration. Default value: 1s
    @import "~vue2-animate/src/sass/vue2-animate";
</style>
