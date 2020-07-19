<template>
    <transition name="fade">
    <div style="height: 100%">
    <v-toolbar
            color="indigo darken-2"
            dark
    >
        <h3>文物管理系统</h3>
<v-spacer/>
        <v-btn outlined @click="logout">
            注销
            <v-icon right>mdi-exit-to-app</v-icon>
        </v-btn>
    </v-toolbar>
        <v-container fluid style="padding: 0;height: 100%">

            <v-row style="height: 100%" no-gutters class="flex-nowrap">
                <v-col cols="auto" style="height: 100%">
                    <div style="width: 256px;height: 100%;">
                        <v-navigation-drawer permanent
                                             left>
                            <v-list>
                                <v-list-item>
                                    <v-list-item-icon>
                                        <v-icon>mdi-home</v-icon>
                                    </v-list-item-icon>

                                    <v-list-item-title>主页</v-list-item-title>
                                </v-list-item>

                                <v-list-group
                                        prepend-icon="mdi-account-circle"
                                        value="true"
                                >
                                    <template v-slot:activator>
                                        <v-list-item-title>文物</v-list-item-title>
                                    </template>

                                    <v-list-item
                                            v-for="(tab, i) in antiqueTabs"
                                            :key="i"
                                            link
                                            @click="$router.push(tab.path)"
                                    >
                                        <v-list-item-title v-text="tab.title"></v-list-item-title>
                                        <v-list-item-icon>
                                            <v-icon v-text="tab.icon"></v-icon>
                                        </v-list-item-icon>
                                    </v-list-item>

                                </v-list-group>

                                <v-list-group
                                        prepend-icon="mdi-account-circle"
                                        value="true"
                                >
                                    <template v-slot:activator>
                                        <v-list-item-title>管理</v-list-item-title>
                                    </template>

                                    <v-list-item
                                            v-for="(tab, i) in adminTabs"
                                            :key="i"
                                            link
                                            @click="$router.push(tab.path)"
                                    >
                                        <v-list-item-title v-text="tab.title"></v-list-item-title>
                                        <v-list-item-icon>
                                            <v-icon v-text="tab.icon"></v-icon>
                                        </v-list-item-icon>
                                    </v-list-item>
                                </v-list-group>
                            </v-list>
                        </v-navigation-drawer >
                    </div>
                </v-col>
                <v-col cols="auto" class="flex-grow-1"><router-view></router-view></v-col>
            </v-row>
        </v-container>

    </div>
    </transition>
</template>

<script>
    import {ifRoleCanVerify} from '../accessControl';
    import {ifRoleCanAdmin} from '../accessControl';
    import NewAntiqueDialog from "../components/NewAntiqueDialog";
    export default {
        name: "Home",
        components: {},
        data:()=>({
            antiqueTabs:[
                {
                    title:"浏览",
                    icon:'mdi-castle',
                    path:"/home/antique"
                },
                {
                    title: "管理",
                    icon:'mdi-briefcase',
                    path:"/home/verification"
                },
                {
                    title: "新建",
                    icon:'mdi-briefcase',
                    path:"/home/newAntique"
                }
            ],
            adminTabs:[
                {
                    title:"用户管理",
                    icon:'mdi-castle',
                    path:"/home/admin"
                },
                {
                    title: "日志",
                    icon:'mdi-briefcase',
                    path:"/home/log"
                }
            ],
            searchDialog:false,
            keyInput:''
        }),
        methods:{
            logout:function (
            ) {
                this.$store.commit('logout')
                localStorage.removeItem('token')
                this.$router.go(0)
            },
            search:function () {
                this.$router.push('/search/'+this.keyInput)
            },
            ifRoleCanVerify,
            ifRoleCanAdmin
        }
    }
</script>

<style scoped lang="scss">
    $animationDuration: 0.5s; // specify animation duration. Default value: 1s
    @import "~vue2-animate/src/sass/vue2-animate";
</style>
