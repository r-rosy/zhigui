<template>
    <div id="chat">
        <div class="header w">
            <div class="logo">
                <img src="../assets/imgs/logo.png" alt="">
            </div>
            <div class="nav">
                <ul>
                    <li><span></span><a href="/index">首页</a></li>
                    <li><span></span><a href="/chat">聊聊</a></li>
                    <li><span></span><a href="/task">任务栏</a></li>
                    <li><span></span><a href="/list">排行榜</a></li>
                    <li><span></span><a href="/individual">个人中心</a></li>
                </ul>
            </div>
            <div class="avatar">
                <img class="avatar__image" :src="individual.Avatar" >
                <a href="/individual">{{individual.nick_name}}</a>
            </div>
        </div>
        <div  v-for="item,index in Lister" :key="index" class="num2 w">
             <div class="user1 w">
                <a href="#"><img class="user_image" :src="item.User.IMG"></a>
            </div>
            <div class="name">
                <span><h3>{{item.User.Name}}</h3></span>
            </div>
            <div class="more">
                <a :href="'/chat/detail/'+item.Posts.ID+''">&gt;&gt;详情</a>
                <ul>
                    <li></li><span>❤</span>点赞
                    <li></li><span>✉</span>评论
                </ul>
            </div>
            <div class="discuss1">
                <h2>{{item.Posts.Title}}</h2>
                <p>{{item.Posts.Content}}</p>
                <span>{{item.Posts.CreatedAt}}</span>
            </div>
        </div>
        <div class="pagi">
        <el-pagination background layout="prev, pager, next" :total="number" :page-size="11" :current-page.sync="currentpage" style="text-align:center;background-color:white">
        </el-pagination>
        </div>
    </div>
</template>
<script>
import request from '../methods/http/sendrequest.js'
export default {
    data() {
        return {
            id: 0,
            currentpage: 0,
            persons: [],
            number: 0,
            individual: {},
            Lister: [],
            pages: {
                limit: 11,
                page: 0,
            }
            }
    },
    mounted: function() {
        let pointer=this
        request.GetUserBaseInfo(pointer)

        request.HttpRequest(pointer,'/api/v1/forum?limit='+this.pages.limit+''+'&page='+this.pages.page+'','get',function(response,pointer)
            {
                pointer.number=response.data.data.NUM
                pointer.Lister = response.data.data.Posts
            },null)   
                         
    },
    methods: {
    },
}
</script>
<style scoped>
@import '../assets/css/chat.css';
</style>