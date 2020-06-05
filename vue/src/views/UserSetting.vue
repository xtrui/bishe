<template>
    <div id="setting">
        <h2>个人设置</h2>
        <hr>
        <div class="main">
            <h3>用户名：</h3>
            <el-input v-model="setting.username" placeholder="请输入用户名"></el-input>
            <h3>密码：</h3>
            <el-input v-model="setting.password" placeholder="请输入博客简介"></el-input>
            <h3>email：</h3>
            <el-input v-model="setting.email" placeholder="请输入博主简介"></el-input>
            <el-button
                    plain
                    type="success" icon="el-icon-check" @click="update" circle>
                更 新
            </el-button>
        </div>

    </div>
</template>

<script>

    export default {
        name: "Setting",
        data() {
            return {
                setting: {
                    username: '',
                    password: '',
                    email: '',
                }
            }
        },
        mounted() {
            this.setting = JSON.parse(localStorage.getItem("setting"));
        },
        methods: {
            update() {
                // Axios.post('/api/admin/updateSetting', this.setting)
                //     .then(res => {
                //         if (res.data) {
                //             this.$notify({
                //                 title: '更新成功',
                //                 dangerouslyUseHTMLString: true,
                //                 message: '更新成功',
                //                 duration: 0,
                //                 type: 'success'
                //             });
                //         } else {
                //             this.$notify.error({
                //                 title: '错误',
                //                 message: '更新失败'
                //             });
                //         }
                //     })
                //     .catch(e => {
                //         console.log(e);
                //         this.$notify.error({
                //             title: '错误',
                //             message: '更新失败，请查看控制台'
                //         });
                //     })
            },

        }
    }
</script>

<style scoped>
    .main {
        text-align: left;
        margin-bottom: 20px;
    }

    h2, h3 {
        margin: 15px 0 15px;
    }
</style>