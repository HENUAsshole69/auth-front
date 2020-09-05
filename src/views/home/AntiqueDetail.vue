<template>
    <div style="height: 100%">
        <v-app-bar
                color="white"
                dense
                flat
        >
            <v-btn icon @click="$router.go(-1)">
                <v-icon>mdi-close</v-icon>
            </v-btn>

            <v-toolbar-title>
                <v-breadcrumbs :items="crumb"></v-breadcrumbs>
            </v-toolbar-title>

            <v-spacer></v-spacer>

        </v-app-bar>
        <v-divider/>
        <v-progress-circular
                :size="70"
                :width="7"
                class="center"
                indeterminate
                v-if="loading"
        ></v-progress-circular>
        <v-container v-if="!loading">
            <v-row>
                <v-col cols="6">
                    <v-img
                            :src="picSrc" aspect-ratio="1.7778"
                    />

                </v-col>
                <v-col cols="3">
                    <v-list
                            subheader
                            three-line
                    >
                        <v-subheader>详细信息</v-subheader>

                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title>编号</v-list-item-title>
                                <v-list-item-subtitle>{{antiqueDto.id}}</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>

                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title>名称</v-list-item-title>
                                <v-list-item-subtitle>{{antiqueDto.name}}</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>

                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title>来源信息</v-list-item-title>
                                <v-list-item-subtitle>{{antiqueDto.sourceInfo}}</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>

                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title>描述</v-list-item-title>
                                <v-list-item-subtitle>{{antiqueDto.desp}}</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-col>
                <v-col cols="3">
                    <v-list
                            subheader
                            three-line
                    >
                        <v-subheader></v-subheader>

                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title>年代</v-list-item-title>
                                <v-list-item-subtitle>{{antiqueDto.era}}</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>

                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title>完整程度</v-list-item-title>
                                <v-list-item-subtitle>{{antiqueDto.wholeness}}</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>

                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title>鉴定诉求</v-list-item-title>
                                <v-list-item-subtitle>{{antiqueDto.authType}}</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>

                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title>规格</v-list-item-title>
                                <v-list-item-subtitle>{{antiqueDto.spec}}</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title>审核状态</v-list-item-title>
                            <v-list-item-subtitle><verification-stepper horizontal :antique="antiqueDto"/></v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-col>
            </v-row>
        </v-container>


    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import 'viewerjs/dist/viewer.css'
    import Component from "vue-class-component";
    import {Prop} from "vue-property-decorator";
    import {AntiqueDto} from "@/model/Antique";
    import {AntiqueClient} from "@/client/AntiqueClient";
    import VerificationDisplay from "@/components/VerificationDisplay.vue";
    import {VerClient} from "@/client/VerClient";
    import {VerificationProcessDto} from "@/model/Verification";
    import VerificationStepper from "@/components/classic/VerificationStepper.vue";

    @Component({
        components: {VerificationStepper, VerificationDisplay}
    })
    export default class AntiqueDetail extends Vue{
        @Prop() readonly id: number | undefined
        private antiqueDto: AntiqueDto | undefined
        private loading = true
        private picSrc = ""
        private crumb = [
            {
                text: '主页',
                disabled: false,
                href: '#/home',
            },
            {
                text: '细节',
                disabled: false,
                href: '#/home',
            },
            {
                text: '',
                disabled: true,
                href: '#',
            }
        ]
        verifications: VerificationProcessDto[] = []
        async mounted(){
            if(this.id == undefined) return
            this.antiqueDto = await AntiqueClient.getAntiqueDto(this.id)
            this.picSrc ='data:image/jpeg;base64, '+ (await AntiqueClient.getAntiquePic(this.antiqueDto?.id))
            const result = await VerClient.getVerification(this.antiqueDto?.id)
            this.verifications.push(...result)
            this.crumb[2].text = this.antiqueDto.name
            this.loading = false
        }
    }
</script>

<style lang="scss" scoped>
    @import "style/layout";
</style>
