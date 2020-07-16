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
    export default {
        name: "AntiqueSearch",
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
                const result = await AntiqueClient.searchAntique(this.$router.currentRoute.params.key,this.pageNo,this.pageLen)
                this.cards.push(...result.content)
                if(!result.last) {
                    this.pageNo++
                    this.busy = false;
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    $animationDuration: 0.5s; // specify animation duration. Default value: 1s
    @import "~vue2-animate/src/sass/vue2-animate";
</style>
