<template>
    <transition
            name="fade"
    ><div>
        <v-progress-linear
                indeterminate
                color="cyan"
                v-if="loading"
        ></v-progress-linear>
        <v-card flat>
            <v-card-title>

                <v-spacer></v-spacer>
                <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="搜索用户名或文物名称进行搜索"
                        single-line
                        hide-details
                ></v-text-field>
            </v-card-title>
       <user-management-table @load="loading = true"
                              @loaded="loading = false" :keyWord="search" :key="search"/>
        </v-card>
    </div>
    </transition>
</template>

<script>
    import UserManagementTable from "../components/UserManagementTable";
    import LoggingTable from "../components/LoggingTable";
    export default {
        name: "Admin",
        components: { UserManagementTable},
        data:()=>({
            tab : null,
            search:'',
            loading:true
        })
    }
</script>

<style scoped>

</style>
