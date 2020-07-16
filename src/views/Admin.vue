<template>
    <div style="height:100%">
        <v-toolbar dark>
            <v-btn icon dark @click="$router.go(-1)">
                <v-icon> mdi-arrow-left</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <!--<v-btn icon>
                <v-icon>mdi-magnify</v-icon>
            </v-btn>
            <v-btn icon>
                <v-icon>mdi-heart</v-icon>
            </v-btn>
            <v-btn icon>
                <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>-->
            <v-tabs v-model="tab">
                <v-tab>
                    用户管理
                </v-tab>
                <v-tab>
                    日志
                </v-tab>
            </v-tabs>
        </v-toolbar>
        <v-container>
            <v-row>
                <v-col>
                    <v-tabs-items v-model="tab">
                        <v-tab-item>
                            <UserManagementTable/>
                        </v-tab-item>
                        <v-tab-item>

                        </v-tab-item>
                    </v-tabs-items>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    import UserManagementTable from "../components/UserManagementTable";
    export default {
        name: "Admin",
        components: {UserManagementTable},
        data:()=>({
            tab : null
        })
    }
</script>

<style scoped>

</style>
