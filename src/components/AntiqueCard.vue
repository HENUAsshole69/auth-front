<template>
    <v-card>
        <v-img
                :src="picSrc"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="200px"
        >
            <v-card-title v-text="antique.name"></v-card-title>
        </v-img>
        <v-progress-linear
                color="light-blue"
                height="10"
                :value="antique.verificationProcesses / 3 * 100"
                striped
        ></v-progress-linear>
        <v-card-actions>
            <v-list-item-subtitle>{{subtitle}}</v-list-item-subtitle>
            <v-spacer></v-spacer>

            <v-btn icon :disabled="antique.verificationProcesses !== 3 || antique.invalid">
                <v-icon>mdi-certificate</v-icon>
            </v-btn>

            <v-btn icon @click="$router.push({path:'/antiqueDetail/'+antique.id})">
                <v-icon>mdi-dots-horizontal</v-icon>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from "vue-class-component";
    import {Antique, AntiqueDto} from "@/model/Antique";
    import {Prop} from "vue-property-decorator";
    import {AntiqueClient} from "@/client/AntiqueClient";
    @Component({
        components:{

        }
    })
    export default class AntiqueCard extends Vue{
        @Prop() readonly antique: AntiqueDto | undefined
        picSrc=""
        async mounted(){
            this.picSrc ='data:image/jpeg;base64, '+ (await AntiqueClient.getAntiquePic(this.antique!!.id))
        }

        get subtitle(){
            if(this.antique !== undefined) {
                if(!this.antique.invalid)
                return this.antique.verificationProcesses !== 3 ? '审核过程：第' + this.antique.verificationProcesses + '步' : '审核完成'
                else
                    return '审核失败'
            }else {
                return undefined
            }
        }
    }
</script>

<style scoped>

</style>
