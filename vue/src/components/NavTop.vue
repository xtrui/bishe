<template>
    <div class='nav_top'>
        <div class="container">
            <div class="index">
                <a href="/" class="homeLink">主页</a>
            </div>
            <div class="otherNav">
                <div class="li" v-if="isAdmin"><a href="/admin">后台</a></div>
                <div class="li" v-else><a href="#" @click="goto">后台</a></div>
                <div class="li"><a href="/categories/page">分类</a></div>
                <div class="li" v-if="!username"><a href="/login">登录</a></div>
                <div class="li" v-else @click="logout"><p>欢迎{{username}}</p> <a href="#" style="font-size: 16px">登出</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Axios from "axios";

    export default {
        name: "NavTop",
        data() {
            return {
                username: '',
                isAdmin: false
            }
        },
        mounted() {
            let user = JSON.parse(localStorage.getItem('user'));
            if (user && user.role) {
                this.isAdmin = true;
            }
            this.username = user ? user.username : '';
        },
        methods: {
            goto() {
                let user = JSON.parse(localStorage.getItem('user'));
                if (!user) {
                    window.location.href = "/login";
                }
            },
            logout() {
                //登出操作
                localStorage.removeItem('user');
                Axios.get("/api/user/logout").then(res => {
                    console.log(res.data);
                })
                this.setCookie('isAdmin', "", -1);
                this.setCookie('logined', "", -1);
                location.reload();
                console.log('登出');
            },
            setCookie(c_name, value, expire) {
                let date = new Date()
                date.setSeconds(date.getSeconds() + expire)
                document.cookie = c_name + "=" + escape(value) + "; expires=" + date.toGMTString()
            }
        }
    }
</script>

<style scoped>
    .nav_top {
        width: 100%;
        position: fixed;
        z-index: 100;
        height: 70px;
        overflow: hidden;
        top: 0px;
    }

    .container {
        height: 70px;
    }

    .homeLink {
        font-size: 30px;
        font-weight: bold;
        color: #ffffff;
        padding: 15px 50px 15px;

    }

    a {
        text-decoration: none;
        background-color: transparent;
        display: block;
        color: #ffffff;
    }

    .index {
        text-align: left;
        width: 30%;
        height: 100%;
        float: left;
        margin: 0;
    }

    .otherNav {
        float: left;
        width: 70%;
        height: 100%;
    }

    .li {
        float: right;
        height: 100%;
        width: 15%;
        padding-right: 15px;
        padding-top: 15px;
        font-size: 30px;
        font-weight: bold;
    }

    .li > p {
        font-size: 16px;
        color: #fb7299;
    }

</style>