<template>
    <div id="right_slider">
        <aside>
            <h4>这是标题</h4>
            <ul>
                <li>aaa</li>
                <li>2222</li>
                <li>3333</li>
            </ul>
        </aside>

        <aside>
            <h4>这是标题</h4>
            <ul>
                <li>aaa</li>
                <li>2222</li>
                <li>3333</li>
            </ul>
        </aside>
    </div>
</template>

<script>
    export default {
        name: "RightSlider"
    }
</script>

<style scoped>
    #right_slider {
        min-width: 360px;
        padding-left: 30px;
        margin: auto;
    }

    aside {
        padding: 30px;
        background-color: #ffffff;
        margin-bottom: 30px;
    }
</style>