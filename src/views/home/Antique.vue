<template>
    <transition
            name="fade"
    ><div>
        <v-progress-linear
                indeterminate
                color="cyan"
                v-if="loading"
                style="z-index: 1"
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
        <antique-table  @load="loading = true"
                        @loaded="loading = false"  :key-word="search" :key="search"/>
        </v-card>
    </div>
    </transition>
</template>

<script>
    import infiniteScroll from 'vue-infinite-scroll'
    import {AntiqueClient} from "../../client/AntiqueClient";
    import AntiqueCard from "../../components/AntiqueCard";
    import BatchImportDialog from "../../components/BatchImportPage";
    import NewAntiqueDialog from "../../components/NewAntiqueDialog";
    import SearchResultDialog from "../../components/SearchResultDialog";
    import {ifRoleCanImport} from '../../accessControl';
    import AntiqueTable from "../../components/classic/AntiqueTable";
    export default {
        name: "Antique",
        components: {AntiqueTable},
        data:()=>({
            batchImportDialog:false,
            newAntiqueDialog:false,
            searchTest:false,
            loading:false,
            search:'',
            cards: [
            ],
            busy:false,
            pageNo:0,
            pageLen:10,
        }),
        directives:{
            infiniteScroll
        },
        watch:{
        },
        methods: {
            ifRoleCanImport
        }
    }
</script>

<style scoped lang="scss">
    $animationDuration: 0.5s; // specify animation duration. Default value: 1s
    @import "~vue2-animate/src/sass/vue2-animate";
</style>
