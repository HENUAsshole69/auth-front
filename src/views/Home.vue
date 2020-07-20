<template>
    <transition name="fade">
    <div style="height: 100%">
    <v-toolbar
            color="indigo darken-2"
            dark
    >
        <h3>社会文物登记服务中心</h3>
<v-spacer/>
        <v-btn outlined @click="logout">
            注销
            <v-icon right>mdi-exit-to-app</v-icon>
        </v-btn>
    </v-toolbar>
        <v-container fluid style="padding: 0;height: 100%">
            <v-row no-gutters dense>
                    <v-col  cols="auto" class="flex-grow-1"><v-breadcrumbs :items="crumbItem" :key="crumbKey"></v-breadcrumbs><v-divider/></v-col>
            </v-row>
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
                                        prepend-icon="mdi-flower-poppy"
                                        value="true"
                                >
                                    <template v-slot:activator>
                                        <v-list-item-title>文物</v-list-item-title>
                                    </template>

                                    <v-list-item
                                            v-for="(tab, i) in antiqueTabs"
                                            :key="i"
                                            link
                                            @click="goToTab(tab)"
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
                                        v-if="ifRoleCanAdmin($store.state.userObj.type)"
                                >
                                    <template v-slot:activator>
                                        <v-list-item-title>管理</v-list-item-title>
                                    </template>

                                    <v-list-item
                                            v-for="(tab, i) in adminTabs"
                                            :key="i"
                                            link
                                            @click="goToTab(tab)"
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
    import {ifRoleCanCred, ifRoleCanImport, ifRoleCanVerify, ifRoleCanWearAndTear} from '../accessControl';
    import {ifRoleCanAdmin} from '../accessControl';
    import NewAntiqueDialog from "../components/NewAntiqueDialog";
    export default {
        name: "Home",
        components: {},
        data:()=>({
            antiqueTabs:[
                {
                    sec:"文物",
                    title:"浏览",
                    icon:'mdi-open-in-app',
                    path:"/home/antique"
                },
                {
                    sec:"文物",
                    title: "审核",
                    icon:'mdi-file-find',
                    path:"/home/verification"
                },
                {
                    sec:"文物",
                    title: "磨损信息",
                    icon:'mdi-image-broken-variant',
                    path:"/home/wearAndTear"
                },
                {
                    sec:"文物",
                    title: "证书信息",
                    icon:'mdi-certificate',
                    path:"/home/cred"
                },
                {
                    sec:"文物",
                    title: "新建",
                    icon:'mdi-folder-plus',
                    path:"/home/newAntique"
                },
                {
                    sec:"文物",
                    title: "导入",
                    icon:'mdi-application-import',
                    path:"/home/batchImport"
                }
            ],
            adminTabs:[
                {
                    sec:"管理",
                    title:"用户管理",
                    icon:'mdi-account-box-multiple',
                    path:"/home/admin"
                },
                {
                    sec:"管理",
                    title: "日志",
                    icon:'mdi-post',
                    path:"/home/log"
                }
            ],
            searchDialog:false,
            keyInput:'',
            crumbKey:0,
            crumbItem:[]
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
            ifRoleCanAdmin,
        goToTab(tab){
            this.$router.push(tab.path)
            this.currentTab = tab
        }
        },
        beforeMount() {
            if(!ifRoleCanVerify(this.$store.state.userObj.type)){
                this.antiqueTabs = this.antiqueTabs.filter(function (value) {
                    return value.path !== "/home/verification"
                })
            }
            if(!ifRoleCanImport(this.$store.state.userObj.type)){
                this.antiqueTabs = this.antiqueTabs.filter(function (value) {
                    return value.path !== "/home/batchImport"
                })
            }
            if(!ifRoleCanWearAndTear(this.$store.state.userObj.type)){
                this.antiqueTabs = this.antiqueTabs.filter(function (value) {
                    return value.path !== "/home/wearAndTear"
                })
            }
            if(!ifRoleCanCred(this.$store.state.userObj.type)){
                this.antiqueTabs = this.antiqueTabs.filter(function (value) {
                    return value.path !== "/home/cred"
                })
            }
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            const model = this
            const crumbItem= [
                {
                    text: '主页',
                    disabled: false,
                    href: '#',
                },
                {
                    text: [...this.adminTabs,...this.antiqueTabs].filter(function (value) {
                        return value.path === model.$router.currentRoute.fullPath
                    })[0].sec,
                    disabled: false,
                    href: '#',
                },
                {
                    text: [...this.adminTabs,...this.antiqueTabs].filter(function (value) {
                        return value.path === model.$router.currentRoute.fullPath
                    })[0].title,
                    disabled: true,
                    href: '#',
                },
            ]
            this.crumbItem.length = 0;
            this.crumbItem.push(...crumbItem)
        },
        beforeUpdate:function () {
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            const model = this
            const crumbItem= [
                {
                    text: '主页',
                    disabled: false,
                    href: '#',
                },
                {
                    text: [...this.adminTabs,...this.antiqueTabs].filter(function (value) {
                        return value.path === model.$router.currentRoute.fullPath
                    })[0].sec,
                    disabled: false,
                    href: '#',
                },
                {
                    text: [...this.adminTabs,...this.antiqueTabs].filter(function (value) {
                        return value.path === model.$router.currentRoute.fullPath
                    })[0].title,
                    disabled: true,
                    href: '#',
                },
            ]
            this.crumbItem.length = 0;
            this.crumbItem.push(...crumbItem)
        }

    }
</script>

<style scoped lang="scss">
    $animationDuration: 0.5s; // specify animation duration. Default value: 1s
    @import "~vue2-animate/src/sass/vue2-animate";
</style>
