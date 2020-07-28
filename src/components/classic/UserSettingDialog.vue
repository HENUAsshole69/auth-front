<template>
    <v-container>
        <v-row>
            <v-col>
                <v-dialog
                        v-model="dialog"
                        width="500"
                >

                    <v-card>
                        <v-system-bar window>
                            <v-icon>mdi-cog</v-icon>
                            <span>用户设置</span>
                            <v-spacer></v-spacer>
                            <v-icon @click="dialog = false">mdi-close</v-icon>
                        </v-system-bar>
                        <v-card-text>
                            <v-form v-model="valid">
                                <v-container fluid >
                                    <v-row no-gutters>
                                        <v-col>
                                            <v-tabs
                                                    v-model="tab"
                                            >
                                                <v-tab
                                                >
                                                    修改密码
                                                </v-tab>
                                                <v-tabs-items v-model="tab">
                                                    <v-tab-item
                                                    >
                                                        <v-card flat>
                                                            <v-card-text>
                                                                <v-container>
                                                                    <v-form v-model="resetPasswordValid">
                                                                    <v-row no-gutters>
                                                                        <v-col>
                                                                            <v-text-field type="password" label="新密码" :rules="newPasswordRules" v-model="newPassword" :hint="'输入新密码'"/>
                                                                        </v-col>
                                                                    </v-row>
                                                                        <v-row no-gutters>
                                                                            <v-col>
                                                                                <v-text-field type="password" label="确认密码" :rules="[v=> v !== undefined && v.length !== 0 || '密码确认不能为空',confirm]"  :hint="'确认新密码'"/>
                                                                            </v-col>
                                                                        </v-row>
                                                                    </v-form>
                                                                </v-container>
                                                            </v-card-text>
                                                            <v-card-actions>
                                                                <v-spacer></v-spacer>
                                                                <v-btn color="blue darken-1" text @click="modPassword">修改密码</v-btn>
                                                            </v-card-actions>
                                                        </v-card>
                                                    </v-tab-item>
                                                </v-tabs-items>
                                            </v-tabs>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="dialog = false">关闭</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import TypeSelector from "../../components/TypeSelector";
    import {AntiqueClient} from "../../client/AntiqueClient";
    import PicFileInput from "../../components/PicFileInput";
    import {UserClient} from "../../client/UserClient";
    export default {
        components: {},
        props:{
            dialog:Boolean
        },
        data:()=>({
            antique:{
                name:'',
                type:null,
                desp:'',
                pic:''
            },
            tab:null,
            valid:false,
            newPassword:'',
            resetPasswordValid:false,
            newPasswordRules:[v=> v.length !== 0 || '密码不能为空']
        }),
        watch:{
            dialog:function (n) {
                if(n === false) this.$emit('close')
            }
        },
        methods:{
            onFinish: async function (){
                console.log(this.antique)
                try {
                    const result = await AntiqueClient.postAntique(this.antique)
                }catch (e) {
                    console.log(e)
                }finally {
                    this.$router.go(-1)
                }
            },
            confirm:function(v){
                return v === this.newPassword || '密码不一致'
            },
            async modPassword(){
                await UserClient.updateUserPassword(this.$store.state.userObj.id,this.newPassword)
                this.$store.commit('logout')
                await this.$router.push('/login')
                this.dialog = false
            }
        },
        name: "UserSettingDialog"
    }
</script>

<style scoped>

</style>
