<template>
    <div id="task_detail">
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
            <div class="back w">
                <span><a href="/chat">&lt;返回</a></span>
            </div>
            <div class="like w">
                <span>热度:{{details.MyWilli=='未发送意愿'?0:details.MyWilli}}</span>
            </div>
            <div class="task_more w">
                <h2>今天早上在操场捡了一张校园卡</h2>
                <p>丢失者请联系我,qq23423198</p>
                <p>是在靠近体育场一侧,是19级王同学的卡</p>
                <p>发布者： 小雨雨雨雨宇</p>
                <p>2021年4月23日</p>
                
            <div class="demo-image__preview">
  <el-image v-if="details.Task.Image.Length==0"
    style="width: 100px; height: 100px"
    :src="details.Task.Image[0]" 
    :preview-src-list="srcList">
  </el-image>
    </div>    
        </div>
    <el-divider></el-divider>
    <div>
    <div v-for="item,index in comments" :key="index" class="comment_box">
        <div class="comment">
            <div class="comment_detail">
                <el-avatar class="comment_avatar__image" :size="50" :src="item.Avatar"></el-avatar>
                <span>{{item.UserName}}</span>
            </div>
            <div class="comment_content">
                <p>{{item.Content}}</p>
            </div>
            <div class="comment_time">
                <span>{{item.CreatedAt}}</span>
            </div>
        </div> 
    </div>
    </div>
            <div>
    <el-divider></el-divider>
<el-input
  type="textarea"
  :autosize="{ minRows: 10, maxRows: 15}"
  placeholder="请输入内容"
  v-model="text">
</el-input>
            </div>
            <div class="accept">
                <button  @click="Comment" class="the_button">发布评论</button>
            </div>
        </div>

    </div>
</template>
<script>
import ElementUI from 'element-ui';
import request from '../methods/http/sendrequest.js';
export default {
    data() {
        return {
            tags: [],
            individual: {},
            details: {
            },
            text: '',
            comments: [],
            }

    },
    mounted: function() {
        let pointer = this;
        request.GetUserBaseInfo(pointer)
        request.HttpRequest(pointer,'/api/v1/tasks/details?id=' + this.$route.params.id,'get',function(response,pointer)
        {
                pointer.details = response.data.data
                pointer.tags.push(response.data.data.Task.prefecture_id)
                pointer.tags.push(response.data.data.Task.tag)
                pointer.tags.push(response.data.data.Task.method)
        },null)
        request.HttpRequest(pointer,'/api/v1/forum/comments?id='+this.$route.params.id+'limit=11?page=0','get',function(response,pointer)
        {
            pointer.comments = response.data.data.Comments
            for(let i = 0;i<pointer.comments.length;i++)
            {
                request.HttpRequest(pointer,'/api/v1/user/others?email=' + pointer.comments[i].Publisher,'get',function(response,pointer)
                {
                    pointer.comments[i].UserName = response.data.data.Name
                    pointer.comments[i].Avatar = response.data.data.IMG.Avatar
                    pointer.$forceUpdate()
                    
                },null)
            }
        },null)
    },
    methods: {
        Comment: function() {
            if(this.text=='')
            {
                this.$alert('请输入评论内容')
                return
            }
            let pointer = this;
            request.HttpRequest(pointer,'/api/v1/forum/comments','post',function(response,pointer)
            {
                ElementUI.Message(
                    {
                        message: '发布成功',
                        type: 'success'
                    }
                )
                pointer.$router.go (0)
            },{
                post_id: this.$route.params.id-'0',
                content: this.text
            })
        }
    },
    }
</script>
<style scoped>
@import '../assets/css/task_detail.css';
</style>