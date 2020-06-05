<template>
    <div id="setting">
        <h2>博客设置</h2>
        <hr>
        <div class="main">
            <h3>博客名称：</h3>
            <el-input v-model="setting.blogName" placeholder="请输入博客名称"></el-input>
            <h3>博客简介：</h3>
            <el-input v-model="setting.blogIntroduce" placeholder="请输入博客简介"></el-input>
            <h3>博主简介：</h3>
            <el-input v-model="setting.authorIntroduce" placeholder="请输入博主简介"></el-input>
            <h3>备案信息：</h3>
            <el-input v-model="setting.beianInfo" placeholder="请输入备案信息"></el-input>
            <el-button
                    plain
                    type="success" icon="el-icon-check" @click="update" circle>
                更 新
            </el-button>
        </div>

    </div>
</template>

<script>
    import Axios from "axios";

    export default {
        name: "Setting",
        data() {
            return {
                setting: {
                    blogName: '',
                    blogIntroduce: '',
                    authorIntroduce: '',
                    beianInfo: '',
                }
            }
        },
        mounted() {
            this.setting = JSON.parse(localStorage.getItem("setting"));
        },
        methods: {
            update() {
                Axios.post('/api/admin/updateSetting', this.setting)
                    .then(res => {
                        if (res.data) {
                            this.$notify({
                                title: '更新成功',
                                dangerouslyUseHTMLString: true,
                                message: '更新成功',
                                duration: 0,
                                type: 'success'
                            });
                        } else {
                            this.$notify.error({
                                title: '错误',
                                message: '更新失败'
                            });
                        }
                    })
                    .catch(e => {
                        console.log(e);
                        this.$notify.error({
                            title: '错误',
                            message: '更新失败，请查看控制台'
                        });
                    })
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