<template>
    <transition name="fade">
    <div id="app">
        <v-app dark>
            <v-content>
                <v-container fill-height>
                    <v-layout align-center justify-center>
                        <v-flex class="login-form text-xs-center">
                            <div class="display-1 mb-3">
                                <v-icon class="mr-2" large="large"> mdi-bank-outline</v-icon> 文物信息管理系统
                            </div>
                            <v-card light="light">

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
                                        <RoleSelector  v-if="!options.isLoggingIn" @change="user.type = $event"/>
                                        <v-text-field v-model="user.realName" v-if="!options.isLoggingIn" light="light" prepend-icon="person" label="真名"></v-text-field>
                                        <v-text-field v-model="user.cell" v-if="!options.isLoggingIn" type="number" light="light" prepend-icon="person" label="电话"></v-text-field>
                                        <v-text-field v-model="user.password" light="light" prepend-icon="mdi-lock" label="密码" type="password"></v-text-field>
                                        <v-btn v-if="options.isLoggingIn" @click.prevent="" block="block" type="submit"  @click="login">登录</v-btn>
                                        <v-btn v-else block="block" type="submit" @click.prevent="(options.isLoggingIn = true)" @click="register">注册</v-btn>
                                    </v-form>
                                </v-card-text>
                            </v-card>
                            <div v-if="options.isLoggingIn">没有账号?点此注册
                                <v-btn light="light" @click="(options.isLoggingIn = false)">注册</v-btn>
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
        components: {RoleSelector},
        data:()=>({
            user:{

            },
            options: {
                isLoggingIn: true,
                errorAlert: false,
                successAlert: false
            }
        }),
        mounted() {
            if(this.$store.state.token != null){
                router.go(-1)
            }
        },
        methods:{
            login:async function(){
                try {
                    const res = await UserClient.login(this.user.name, this.user.password);
                    this.$store.commit("login",res.data)
                    AxiosInstance.defaults.headers.common['x-api-key'] = res.data;
                    localStorage.setItem('token',res.data)
                    await this.$store.dispatch("getUserObj")
                    router.go(-1)
                }catch (e) {
                    this.options.errorAlert = true;
                }

            },
            register:async function () {
                try {
                    const result = await UserClient.register(new RegisterObj(this.user.password, this.user.name, this.user.type, this.user.cell, this.user.realName))
                    this.successAlert = true
                    router.go(-1)
                }catch (e) {
                    this.errorAlert = true
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
