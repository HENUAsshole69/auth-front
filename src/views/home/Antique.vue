<template>
    <transition
            name="fade"
    >
    <div>
        <v-progress-linear
                indeterminate
                color="cyan"
                v-if="busy"
        ></v-progress-linear>
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="0">

        <BatchImportDialog @close="batchImportDialog = false" :dialog="batchImportDialog"/>
        <NewAntiqueDialog @close="newAntiqueDialog = false" :dialog="newAntiqueDialog"/>
        <SearchResultDialog @close="searchTest = false" :dialog="searchTest"/>
        <v-container fluid>
        <v-row dense>
            <v-col
                    v-for="card in cards"
                    :key="card.title">
                    <!--:cols="card.flex"-->
                <AntiqueCard :antique="card"/>
            </v-col>
        </v-row>
    </v-container>
        <div style="position: fixed;right: 2em;bottom: 6em" v-if="ifRoleCanImport($store.state.userObj.type)">
            <v-btn
                    dark
                    fab
                    color="pink"
                    v-on:click="batchImportDialog = true"
            >
                <v-icon>mdi-playlist-plus</v-icon>
            </v-btn>
        </div>
        <div style="position: fixed;right: 2em;bottom: 2em">
        <v-btn
                dark
                fab
                color="pink"
                v-on:click="newAntiqueDialog = true"
        >
            <v-icon>mdi-plus</v-icon>
        </v-btn>
        </div>
    </div>
    </div>
    </transition>
</template>

<script>
    import infiniteScroll from 'vue-infinite-scroll'
    import {AntiqueClient} from "../../client/AntiqueClient";
    import AntiqueCard from "../../components/AntiqueCard";
    import BatchImportDialog from "../../components/BatchImportDialog";
    import NewAntiqueDialog from "../../components/NewAntiqueDialog";
    import SearchResultDialog from "../../components/SearchResultDialog";
    import {ifRoleCanImport} from '../../accessControl';
    export default {
        name: "Antique",
        components: {SearchResultDialog, NewAntiqueDialog, BatchImportDialog, AntiqueCard},
        data:()=>({
            batchImportDialog:false,
            newAntiqueDialog:false,
            searchTest:false,
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
        methods: {
            loadMore: async function() {
                this.busy = true;
                const result = await AntiqueClient.getAntique(this.pageNo,this.pageLen)
                this.cards.push(...result.content)
                if(!result.last) {
                    this.pageNo++
                    this.busy = false;
                }
            },
            ifRoleCanImport
        }
    }
</script>

<style scoped lang="scss">
    $animationDuration: 0.5s; // specify animation duration. Default value: 1s
    @import "~vue2-animate/src/sass/vue2-animate";
</style>
