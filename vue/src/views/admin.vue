<template>
    <el-container>
        <el-aside style="background-color: rgb(60, 60, 60);">
            <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
                <el-radio-button :label="false">展开</el-radio-button>
                <el-radio-button :label="true">收起</el-radio-button>
            </el-radio-group>
            <el-menu
                    default-active="1-1"
                    class="el-menu-vertical-demo"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b"
                    :collapse="!isCollapse"
            >

                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>文章管理</span>
                    </template>
                    <el-menu-item index="1-1">
                        <span>发表文章</span>
                    </el-menu-item>
                    <el-menu-item index="1-2">
                        <span>管理文章</span>
                    </el-menu-item>
                </el-submenu>
                <el-menu-item index="4">
                    <i class="el-icon-setting"></i>
                    <span slot="title">评论管理</span>
                </el-menu-item>

            </el-menu>
        </el-aside>


        <el-container class="editor_main">
            <el-header style="text-align: right; font-size: 12px">
                <el-menu
                        class="el-menu-demo"
                        mode="horizontal"
                        @select="handleSelect(index,indexPath)"
                        background-color="#545c64"
                        text-color="#fff"
                        active-text-color="#ffd04b"
                >
                    <el-menu-item index="1">主页</el-menu-item>
                    <el-menu-item index="2">目录</el-menu-item>
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
                tableData: Array(20).fill(item)
            }
        },
        methods: {
            handleSelect(index, indexPath) {
                console.log(index + indexPath);
            }
        },

    }
</script>
