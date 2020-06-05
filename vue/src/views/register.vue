<template>
    <div class="main_body">
        <div id="login">
            <h1>Register</h1>
            <input type="text" required="required" v-model="user.username" placeholder="用户名" name="u"></input>
            <input type="text" required="required" v-model="user.email" placeholder="Email" name="p"></input>
            <button class="but" @click="getCode">点击发送验证码到邮箱</button>
            <input type="text" required="required" v-model="user.code" placeholder="验证码" name="p"></input>
            <input type="password" required="required" v-model="password" placeholder="密码"
                   name="p"></input>
            <input type="password" required="required" v-model="user.password" @blur="onblur" placeholder="密码二次确认"
                   name="p"></input>
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
                password: '',
                user: {
                    username: '',
                    password: '',
                    email: '',
                    code: ''
                }
            }
        },
        methods: {
            onblur() {
                if (this.user.password !== this.password) {
                    this.$alert('两次密码不一致', '警告', {
                        confirmButtonText: '确定'
                    })
                }
            },
            register() {
                if (this.user.password !== this.password) {
                    this.$alert('两次密码不一致', '警告', {
                        confirmButtonText: '确定'
                    })
                } else {
                    axios.post('/api/users/register', this.user).then(res => {
                        // this.$router.addRoutes(admin);
                        // this.$router.push({path: "/admin"});
                        console.log(res.data)
                        if (res.data.code === "200") {
                            this.$message('注册成功，请登陆');
                            this.$router.push({path: "/login"})
                        } else {
                            this.$message.error(res.data.message);
                        }
                    }).catch(e => {
                        console.log(e);
                    })
                }
            },

            getCode() {
                let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
                if (this.user.email === '' || !reg.test(this.user.email)) {
                    this.$message.error("邮箱格式不正确");
                } else {
                    axios.get('/api/users/getCode', {params: {email: this.user.email}}).then(res => {
                        if (res.data.code === 200) {
                            console.log(res.data);
                            this.$message("发送验证码成功");
                        } else {
                            console.log(res.data);
                            this.$message.error("发送失败，" + res.data.message);
                        }
                    }).catch(e => {
                        console.log(e);
                        this.$message.error("发送失败，请查看控制台")
                    })
                }
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