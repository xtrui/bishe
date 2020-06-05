<template>
    <div class="blog_body">
        <div class="header">
            <h1>{{article.title}}</h1>
            <div class="blog_mata">
                <i class="el-icon-date">{{article.time}}</i>
                <i class="el-icon-star-on"></i>
                <i class="el-icon-chat-dot-round"></i>
                <i class="el-icon-view"></i>
            </div>
        </div>
        <mavon-editor defaultOpen="preview" :toolbarsFlag="false" :boxShadow="false" :subfield="false" :preview="true"
                      v-model="article.content"/>
        <video :src="article.videoSrc" v-if="article.videoSrc" controls="controls" style="height: 360px;width: 640px">
            您的浏览器不支持 video 标签。
        </video>
    </div>
</template>

<script>
    import mavonEditor from 'mavon-editor'
    import 'mavon-editor/dist/css/index.css'

    export default {
        name: "BlogBody",
        components: {
            'mavon-editor': mavonEditor.mavonEditor,
        },
        data() {
            return {
                blogBody: "",
            }
        },
        props: {
            article: Object
        },
        methods: {}
    }
</script>

<style scoped>
    .blog_body {
        max-width: 750px;
        background-color: white;
        min-height: 800px;
        margin: auto;
        padding-top: 30px;
        /*padding: 30px 15px 30px;*/
    }

    h1 {
        margin: 0px 0 15px;
    }

    .header {
        /*background-color: white;*/
        width: 100%;
        margin-bottom: 20px;
    }

    i {
        margin-left: 5px;
    }

</style>