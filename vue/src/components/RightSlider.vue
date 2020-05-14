<template>
    <div id="right_slider">
        <aside class="avatar">
            <div class="background"></div>
            <div><img :src="avatarUrl" alt="头像"></div>
            <div class="introduce"><p>这是简介</p></div>
        </aside>

        <aside>
            <h3 style="padding-bottom: 15px">分类目录</h3>
            <el-button class="categoryTag" @click="jump(item.id)" type="info" round v-for="item in categories"
                       :key="categories.id">{{item.categoryName}}
            </el-button>
        </aside>

        <aside>
            <div style="padding-bottom: 15px"><h3>搜一搜</h3></div>

            <el-input
                    placeholder="Search..."
                    prefix-icon="el-icon-search"
                    v-model="input"
                    @keydown.enter.native="keyUp">
            </el-input>
        </aside>
    </div>
</template>

<script>
    export default {
        name: "RightSlider",
        props: {
            categories: {},
        },
        data() {
            return {
                avatarUrl: require("../assets/avatar.jpg"),
                input: ""
            }
        },
        methods: {
            jump(id) {
                window.location.href = "/category/" + id;
            },
            keyUp() {
                if (this.input !== '') {
                    window.location.href = "/search/" + this.input;
                }
            }
        }
    }
</script>

<style scoped>
    #right_slider {
        width: 360px;
        padding-left: 30px;
        margin: auto;
    }

    aside {
        padding: 30px;
        background-color: #ffffff;
        margin-bottom: 30px;
    }

    .avatar {
        padding: 0;
        position: relative;
        /*height: 248px;*/
    }

    .categoryTag {
        margin-left: 10px;
        margin-bottom: 10px;
    }

    .background {
        width: 100%;
        height: 130px;
        background-image: url("../assets/avatar.jpg");
        background-size: cover;
        background-position: center;
    }

    .avatar img {
        border: rgba(255, 255, 255, .4) 4px solid;
        border-radius: 50%;
        width: 80px;
        height: 80px;
        display: block;
        position: absolute;
        z-index: 20;
        top: 85px;
        left: 140px;
    }

    .introduce {
        padding: 45px 20px 20px;
        text-align: left;
    }

    .introduce p {
        color: #333333;
        font-size: 16px;
        font-family: "Helvetica Neue", Helvetica, Arial, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
    }


</style>