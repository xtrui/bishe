<template>
    <div class="comment">
        <div class="username"><h4>{{comment.name}}:</h4></div>
        <div class="context"><h5>{{comment.content}}</h5></div>
        <div class="com_time">{{comment.time}}</div>

    </div>
</template>

<script>
    export default {
        name: "Comment",
        props: {
            comment: Object
        }
    }
</script>

<style scoped>
    .comment {
        width: 90%;
        margin: 0 auto;
        text-align: left;
        border-top: 1px solid #e5e9ef;
        padding: 15px 0 15px;

    }

    .username {
        font-size: 16px;
        color: #fb7299;
    }

    .context {
        padding-left: 32px;
        line-height: 26px;
        letter-spacing: 2px;
    }

    .com_time {
        font-size: 12px;
        color: #999999;
        padding-left: 32px;
    }
</style>