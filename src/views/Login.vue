<template>
    <transition name="fade">
    <div id="app" v-if="ok">
        <v-app dark>
            <v-content>
                <v-container fill-height>
                    <v-layout align-center justify-center>
                        <v-flex class="login-form text-xs-center">
                            <div class="display-1 mb-3">
                                <v-icon class="mr-2" large="large"> mdi-bank-outline</v-icon> <h3 style="display: inline-block">文物信息管理系统</h3>
                            </div>
                            <v-card light="light">
                                <v-progress-linear
                                        indeterminate
                                        color="cyan"
                                        v-if="loading"
                                ></v-progress-linear>
                                <v-card-text>
                                    <div class="subheading">
                                        <transition  name="fade">
                                            <v-alert type="error" v-if="options.errorAlert">
                                            登录错误
                                            </v-alert>
                                        </transition>
                                        <transition  name="fade">
                                            <v-alert type="success" v-if="options.successAlert">
                                                操作成功
                                            </v-alert>
                                        </transition>
                                        <template v-if="options.isLoggingIn">登录</template>
                                        <template v-else>注册</template>
                                    </div>
                                    <v-form>
                                        <v-text-field v-model="user.name" light="light" prepend-icon="mdi-account" label="用户名"></v-text-field>
                                        <v-text-field v-model="user.realName" v-if="!options.isLoggingIn" light="light" prepend-icon="mdi-account" label="真名"></v-text-field>
                                        <v-text-field v-model="user.cell" v-if="!options.isLoggingIn" type="number" light="light" prepend-icon="mdi-phone" label="电话"></v-text-field>
                                        <v-text-field v-model="user.password" light="light" prepend-icon="mdi-lock" label="密码" type="password"></v-text-field>
                                        <v-btn v-if="options.isLoggingIn" @click.prevent="" block="block" type="submit"  :disabled="loading" @click="login">登录</v-btn>
                                        <v-btn v-else block="block" type="submit" @click.prevent="(options.isLoggingIn = true)"  :disabled="loading"  @click="register">注册</v-btn>
                                    </v-form>
                                </v-card-text>
                            </v-card>
                            <div v-if="options.isLoggingIn">没有账号?点此注册
                                <v-btn light="light" @click="(options.isLoggingIn = false)"  :disabled="loading" >注册</v-btn>
                            </div>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-content>
            <v-footer app="app">
                <v-flex class="text-xs-center">© 2018. 保留所有权利.</v-flex>
            </v-footer>
        </v-app>
    </div>
    </transition>
</template>

<script>
    import Vue from 'vue';
    import {UserClient} from "@/client/UserClient";
    import { RegisterObj} from '@/model/User'
    import RoleSelector from "../components/RoleSelector";
    import router from "../router";
    import AxiosInstance from "../client/AxiosInstance";
    export default Vue.extend( {
        name: "login",
        components: {},
        data:()=>({
            user:{
                type:'INDIVIDUAL'
            },
            options: {
                isLoggingIn: true,
                errorAlert: false,
                successAlert: false
            },
            ok:false,
            loading:false
        }),
        beforeMount() {
            if(this.$store.state.token != null){
                router.go(-1)
            }else{
                this.ok = true;
            }
        },
        methods:{
            login:async function(){
                try {
                    this.loading = true
                    const res = await UserClient.login(this.user.name, this.user.password);
                    this.$store.commit("login",res.data)
                    AxiosInstance.defaults.headers.common['x-api-key'] = res.data;
                    localStorage.setItem('token',res.data)
                    await this.$store.dispatch("getUserObj")
                    router.go(-1)
                }catch (e) {
                    this.options.errorAlert = true;
                }finally {
                    this.loading = false
                }

            },
            register:async function () {
                try {
                    this.loading = true
                    const result = await UserClient.register(new RegisterObj(this.user.password, this.user.name, this.user.type, this.user.cell, this.user.realName))
                    this.successAlert = true
                    router.go(-1)
                }catch (e) {
                    this.errorAlert = true
                }finally {
                    this.loading = false
                }
            }
        }

    })
</script>

<style scoped lang="scss">
    .login-form {
        max-width: 500px;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity 1s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }

    $animationDuration: 0.5s; // specify animation duration. Default value: 1s
    @import "~vue2-animate/src/sass/vue2-animate";
</style>
