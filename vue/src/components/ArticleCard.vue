<template>
    <div class="article_card">
        <el-card :body-style="{ padding: '0px' }">
            <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                 class="image">
            <div style="padding: 14px;">
                <span>博客标题</span>
                <div class="bottom clearfix">
                    <time class="time">{{ new Date()}}</time>
                    <el-button type="text" class="button">操作按钮</el-button>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "ArticleCard"
    }
</script>

<style scoped>

</style>