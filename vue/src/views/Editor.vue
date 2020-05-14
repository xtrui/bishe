<template>
    <div id="editor">
        <h2>撰写新博文</h2>
        <hr>
        <div class="blog_header">
            <h3>标题：</h3>
            <el-input v-model="title" placeholder="请输入博文标题"></el-input>
            <h3>分类：</h3>
            <el-select
                    v-model="categories"
                    multiple
                    filterable
                    allow-create
                    default-first-option
                    style="width: 100%"
                    placeholder="请选择博文目录"
            >
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value+'|'+item.label">
                </el-option>
            </el-select>
        </div>
        <mavon-editor class="editor" ref="md" v-model="content" @imgAdd="imgAdd" @imgDel="imgDel"
                      placeholder="开始你的创作吧...."
        />

        <!--        <mavon-editor defaultOpen="preview" :toolbarsFlag="false" :subfield="false" :preview="true" v-model="blogBody" />-->

        <div style="font-size: 50px;text-align: left;">
            <el-button
                    plain
                    type="success" icon="el-icon-check" @click="click" circle>
                发 布
            </el-button>
        </div>
    </div>
</template>
<style scoped>
    .blog_header {
        text-align: left;
        margin-bottom: 20px;
    }

    h2, h3 {
        margin: 15px 0 15px;
    }

    .editor {
        min-height: 700px;
    }
</style>

<script>
    // Local Registration
    // import mavonEditor from 'mavon-editor'
    import axios from "axios"
    import http from "axios"
    import mavonEditor from 'mavon-editor'
    import 'mavon-editor/dist/css/index.css'

    export default {
        name: 'editor2',
        components: {
            'mavon-editor': mavonEditor.mavonEditor,
        },
        data() {
            return {
                content: "",
                title: '',
                options: [],
                categories: [],
                article: {
                    title: '',
                    content: '',
                    categories: []
                }
            }
        },
        mounted() {
            //加载分类
            this.initCategories();
        },
        methods: {
            click: function () {
                // this.$notify({
                //     title: '发布成功',
                //     dangerouslyUseHTMLString: true,
                //     message: '<a href="/articles/'+'7"'+'>点击前往主页查看</a>',
                //     type: 'success'
                // });
                if (this.categories.length === 0 || this.title === '' || this.content === '') {
                    this.$alert('请勿留空', 'warn', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$message({
                                type: 'info',
                                message: `发布取消`
                            });
                        }
                    });
                } else {
                    this.article.categories = this.categories;
                    this.article.title = this.title;
                    this.article.content = this.content;
                    this.postArticle();
                }
            },

            //发表文章
            async postArticle() {
                await axios.post("/api/article/postArticle", this.article).then(res => {
                    this.$notify({
                        title: '发布成功',
                        dangerouslyUseHTMLString: true,
                        message: '<a href="/articles/' + res.data.id + '"' + '>点击查看文章</a>',
                        type: 'success'
                    });
                }).catch(error => {
                    console.log(error)
                })
            },

            //加载分类
            async initCategories() {
                await http.get("/api/article/category/All")
                    .then(res => {
                        let data = {};
                        data = res.data;
                        data.forEach(e => {
                            this.options.push({value: e.id, label: e.categoryName});
                        })
                        console.log(res.data);
                    })
                    .catch(err => {
                        console.log(err);
                    })
            },

            // 绑定@imgAdd event
            imgAdd(pos, file) {
                console.log("开始上传文件")
                // 第一步.将图片上传到服务器.
                let formData = new FormData();
                formData.append('image', file);
                console.log(formData);
                axios({
                    url: '/api/file/images/up',
                    method: 'post',
                    data: formData,
                    headers: {'Content-Type': 'multipart/form-data'},
                }).then(res => {
                    // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
                    /**
                     * $vm 指为mavonEditor实例，可以通过如下两种方式获取
                     * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
                     * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
                     */
                    console.log(res);
                    this.$refs.md.$img2Url(pos, res.data);
                }).catch(error => {
                    console.log(error);
                })
            },

            imgDel() {

            },

        }
    }
</script>
