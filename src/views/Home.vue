<template>
    <transition name="fade">
    <div style="height: 100%">
    <v-app-bar
            color="indigo darken-2"
            dark

    >
        <v-app-bar-nav-icon></v-app-bar-nav-icon>

        <template v-slot:extension>
            <v-tabs
                    fixed-tabs
                    background-color="indigo darken-2"
                    dark
                    @change="$router.push(tabs[$event].path)"
            >
                <v-tab
                        v-for="tab in tabs"
                        :key="tab.title">
                    {{tab.title}}
                </v-tab>
            </v-tabs>
        </template>

        <v-spacer></v-spacer>

        <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-btn icon>
            <v-icon>mdi-heart</v-icon>
        </v-btn>

        <v-btn icon @click="logout">
            <v-icon>mdi-exit-to-app</v-icon>
        </v-btn>
    </v-app-bar>
    <router-view></router-view>
    </div>
    </transition>
</template>

<script>
    export default {
        name: "Home",
        data:()=>({
            tabs:[
                {
                    title:"文物",
                    path:"/home/antique"
                },
                {
                    title: "认证",
                    path:"/home/verification"
                }
            ]
        }),
        methods:{
            logout:function (
            ) {
                this.$store.commit('logout')
                localStorage.removeItem('token')
                this.$router.go(0)
            }
        }
    }
</script>

<style scoped lang="scss">
    $animationDuration: 0.5s; // specify animation duration. Default value: 1s
    @import "~vue2-animate/src/sass/vue2-animate";
</style>
