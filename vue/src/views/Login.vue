<template>
    <div class="main_body">
        <div id="login">
            <h1>Login</h1>
            <input type="text" required="required" v-model="username" placeholder="用户名" name="u"></input>

            <input type="password" required="required" v-model="password" placeholder="密码" name="p"></input>
            <button class="but" @click="login">登录</button>
            <button class="but" @click="register">注册</button>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "Login",
        data() {
            return {
                username: '',
                password: '',
                email: '',
            }
        },
        methods: {
            login() {
                //登录连接
                axios.post('/api/users/login', {username: this.username, password: this.password}).then(res => {
                    // this.$router.addRoutes(admin);
                    // this.$router.push({path: "/admin"});
                    if (res.data) {
                        let user = res.data;
                        localStorage.setItem('user', JSON.stringify(user));
                        this.$message('登陆成功');
                        this.$router.push({path: "/"})
                    } else {
                        this.$message.error('账号不存在或密码错误');
                    }
                }).catch(e => {
                    console.log(e);
                })
            },
            register() {
                axios.post('/api/users/register', {username: this.username, password: this.password}).then(res => {
                    // this.$router.addRoutes(admin);
                    // this.$router.push({path: "/admin"});
                    if (res.data) {
                        let user = res.data;
                        localStorage.setItem('user', JSON.stringify(user));
                        this.$message('登陆成功');
                        this.$router.push({path: "/"})
                    } else {
                        this.$message.error('账号不存在或密码错误');
                    }
                }).catch(e => {
                    console.log(e);
                })
            }
        }
    }
</script>

<style scoped>
    .main_body {
        width: 100%;
        height: 100%;
        background-color: #4A374A;
    }

    #login {
        position: absolute;
        top: 50%;
        left: 50%;
        margin: -150px 0 0 -150px;
        width: 300px;
        height: 300px;
    }

    #login h1 {
        color: #fff;
        text-shadow: 0 0 10px;
        letter-spacing: 1px;
        text-align: center;
    }

    h1 {
        font-size: 2em;
        margin: 0.67em 0;
    }

    input {
        width: 278px;
        height: 18px;
        margin-bottom: 10px;
        outline: none;
        padding: 10px;
        font-size: 13px;
        color: #fff;
        text-shadow: 1px 1px 1px;
        border-top: 1px solid #312E3D;
        border-left: 1px solid #312E3D;
        border-right: 1px solid #312E3D;
        border-bottom: 1px solid #56536A;
        border-radius: 4px;
        background-color: #2D2D3F;
    }

    .but {
        width: 300px;
        min-height: 20px;
        display: block;
        background-color: #4a77d4;
        border: 1px solid #3762bc;
        color: #fff;
        padding: 9px 14px;
        font-size: 15px;
        line-height: normal;
        border-radius: 5px;
        margin: 0;
    }

</style>