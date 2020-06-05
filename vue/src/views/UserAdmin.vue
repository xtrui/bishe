<template>
    <el-container>
        <el-aside style="background-color: rgb(60, 60, 60);">
            <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
                <el-radio-button :label="false">展开</el-radio-button>
                <el-radio-button :label="true">收起</el-radio-button>
            </el-radio-group>
            <el-menu
                    :default-active="this.$route.path"
                    class="el-menu-vertical-demo"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b"
                    :collapse="!isCollapse"
                    :router=true
            >
                <el-menu-item index="/user/favorite">
                    <i class="el-icon-location"></i>
                    <span slot="title">收藏管理</span>
                </el-menu-item>
                <el-menu-item index="/user/comment">
                    <i class="el-icon-chat-line-round"></i>
                    <span slot="title">评论管理</span>
                </el-menu-item>
                <el-menu-item index="用户管理">
                    <i class="el-icon-user-solid"></i>
                    <span slot="title">用户管理</span>
                </el-menu-item>
                <el-menu-item index="/user/setting">
                    <i class="el-icon-setting"></i>
                    <span slot="title">信息设置</span>
                </el-menu-item>

            </el-menu>
        </el-aside>


        <el-container class="editor_main">
            <el-header style="text-align: right; font-size: 12px">
                <el-menu
                        class="el-menu-demo"
                        mode="horizontal"
                        background-color="#545c64"
                        text-color="#fff"
                        active-text-color="#ffd04b"
                        @select="select">
                    <el-menu-item index="/">主页</el-menu-item>
                    <el-menu-item index="/categories/page">目录</el-menu-item>
                    <!--                    <el-submenu index="2">-->
                    <!--                        <template slot="title">我的工作台</template>-->
                    <!--                        <el-menu-item index="2-1">选项1</el-menu-item>-->
                    <!--                        <el-menu-item index="2-2">选项2</el-menu-item>-->
                    <!--                        <el-menu-item index="2-3">选项3</el-menu-item>-->
                    <!--                        <el-submenu index="2-4">-->
                    <!--                            <template slot="title">选项4</template>-->
                    <!--                            <el-menu-item index="2-4-1">选项1</el-menu-item>-->
                    <!--                            <el-menu-item index="2-4-2">选项2</el-menu-item>-->
                    <!--                            <el-menu-item index="2-4-3">选项3</el-menu-item>-->
                    <!--                        </el-submenu>-->
                    <!--                    </el-submenu>-->
                    <!--                    <el-menu-item index="3" disabled>消息中心</el-menu-item>-->
                    <!--                    <el-menu-item index="4"><a href="https://www.ele.me" target="_blank"-->
                    <!--                                               rel="noopener noreferrer">订单管理</a></el-menu-item>-->
                </el-menu>
            </el-header>

            <!--            body-->
            <el-main>
                <router-view/>
                <hr>
                <MyFooter></MyFooter>
            </el-main>

        </el-container>
    </el-container>


</template>
<style>
    .el-header {
        padding: 0px;
    }

    .el-aside {
        color: #33ffff;
        background-color: #5fc036;
    }

    .editor_main {
        background-color: #dddddd;
    }

    a > span {
        color: white;
    }

</style>

<script>
    import MyFooter from "../components/Footer";

    export default {
        name: 'admin',
        components: {MyFooter},
        data() {
            const item = {
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            };
            return {
                isCollapse: true,
                tableData: Array(20).fill(item),
                articleNavList: [
                    {name: "/admin/blog", label: "发表文章"},
                    {name: "/admin/manageArticle", label: "管理文章"},
                ],
                commentNav: {name: "/admin/manageComment", label: "评论管理"}
            }
        },
        mounted() {
            // console.log(this.$route.path);
        },
        methods: {
            select(index, path) {
                this.$router.push({path: index})
            },
            handleSelect(index) {
                console.log(index);
            }
        },

    }
</script>
