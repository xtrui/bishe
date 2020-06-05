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
        <h3>上传视频:可选</h3>
        <el-upload
                class="upload-demo"
                drag
                action="/api/file/video/up"
                :limit=1
                :on-success="uploadVideoSuccess"
                accept=".mp4"
        >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">请将视频拖拽带此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传.png文件，且不超过500kb</div>
        </el-upload>
        <mavon-editor class="editor" ref="md" v-model="content" @imgAdd="imgAdd" @imgDel="imgDel"
                      placeholder="开始你的创作吧...."
        />

        <!--        <mavon-editor defaultOpen="preview" :toolbarsFlag="false" :subfield="false" :preview="true" v-model="blogBody" />-->

        <div style="font-size: 50px;text-align: left;">
            <el-button
                    plain
                    v-if="!this.$route.params.id"
                    type="success" icon="el-icon-check" @click="click" circle>
                发 布
            </el-button>
            <el-button
                    plain
                    v-else
                    type="success" icon="el-icon-check" @click="update" circle>
                更 新
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
        min-height: 550px;
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
                isFirst: true,
                article: {
                    title: '',
                    content: '',
                    categories: [],
                    videoSrc: '',
                    postSrc: ''
                }
            }
        },
        mounted() {
            //加载分类
            this.initCategories();
            //如果是更新那么获取文章细节
            if (this.$route.params.id) {
                this.getArticle();
                console.log("获取文章", this.$route.params.id)
            }
        },
        methods: {
            uploadVideoSuccess(res, file, fileList) {
                if (res) {
                    this.article.videoSrc = res;
                    console.log(res);
                }
            },
            update: function () {
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
                    this.updateArticle();
                }
            },
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
                await axios.post("/api/admin/postArticle", this.article).then(res => {
                    this.$notify({
                        title: '发布成功',
                        dangerouslyUseHTMLString: true,
                        message: '<a href="/articles/' + res.data.id + '"' + '>点击查看文章</a>',
                        duration: 0,
                        type: 'success'
                    });
                }).catch(error => {
                    this.$notify({
                        title: '发布失败',
                        dangerouslyUseHTMLString: true,
                        message: '请查看控制台',
                        duration: 0,
                        type: 'warning'
                    });
                    console.log(error)
                })
            },
            //更新文章
            async updateArticle() {
                let article = this.article;
                article.id = this.$route.params.id;
                await axios.post("/api/admin/updateArticle", article).then(res => {
                    this.$notify({
                        title: '更新成功',
                        dangerouslyUseHTMLString: true,
                        message: '<a href="/articles/' + res.data.id + '"' + '>点击查看文章</a>',
                        duration: 0,
                        type: 'success'
                    });
                }).catch(error => {
                    this.$notify({
                        title: '更新失败',
                        dangerouslyUseHTMLString: true,
                        message: '请查看控制台',
                        duration: 0,
                        type: 'warning'
                    });
                    console.log(error)
                })
                //todo 这里请求后台更新

                console.log("ggg" + this.$route.params.id)
            },
            //获取要更新的文章
            async getArticle() {
                await http.get("/api/article/detail/" + this.$route.params.id)
                    .then(res => {
                        this.content = res.data.content;
                        res.data.categories.forEach(e => {
                            let item = e.id + '|' + e.categoryName;
                            console.log(e, item)
                            this.categories.push(item);
                        })
                        this.title = res.data.title;
                        console.log(this.article)
                    })
                    .catch(err => {
                        console.log(err);
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
                    if (this.isFist) {
                        this.article.postSrc = res.data;
                        this.isFirst = false;
                    }
                }).catch(error => {
                    console.log(error);
                })
            },

            imgDel() {

            },

        }
    }
</script>
