<template>
    <div id="app">
        <!--        <div id="nav">-->
        <!--            <router-link to="/">Home</router-link>-->
        <!--            <router-link to="/about">About</router-link>-->
        <!--            <router-link to="/home">home</router-link>-->
        <!--        </div>-->
        <!--        <admin/>-->
        <router-view></router-view>
    </div>
</template>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    #nav {
        padding: 30px;
    }

    #nav a {
        font-weight: bold;
        color: #2c3e50;
    }

    #nav a.router-link-exact-active {
        color: #42b983;
    }
</style>
<script>
    import admin from "./views/admin";
    import Axios from "axios";

    export default {
        components: {
            admin
        },
        mounted() {
            if (!localStorage.getItem("setting")) {
                this.get();
            }

        },
        methods: {
            get() {
                Axios.get('/api/users/getSetting')
                    .then(res => {
                        if (res.status === 200) {
                            localStorage.setItem("setting", JSON.stringify(res.data));
                        } else {
                            console.error("获取博客设置失败");
                        }
                    })
                    .catch(e => {
                        console.log(e);

                    })
            },
        }
    }
</script>