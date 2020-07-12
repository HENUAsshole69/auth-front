<template>
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

        <v-btn icon>
            <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
    </v-app-bar>
    <router-view></router-view>
    </div>
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
        })
    }
</script>

<style scoped>

</style>
