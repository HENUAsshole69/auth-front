<template>
    <transition name="fade">
    <div style="height: 100%">
    <v-toolbar
            color="indigo darken-2"
            dark

    >


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

        <v-container fluid style="margin-top: 1.9em">
            <v-row>
                <v-col>
                    <v-text-field solo-inverted append-icon="mdi-magnify" v-model="keyInput" @click:append="search"/>
                </v-col>
            </v-row>
        </v-container>
        <v-btn icon @click="$router.push('/admin')">
            <v-icon>mdi-cog-outline</v-icon>
        </v-btn>
        <v-btn icon @click="logout">
            <v-icon>mdi-exit-to-app</v-icon>
        </v-btn>
    </v-toolbar>

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
            }
        }
    }
</script>

<style scoped lang="scss">
    $animationDuration: 0.5s; // specify animation duration. Default value: 1s
    @import "~vue2-animate/src/sass/vue2-animate";
</style>
