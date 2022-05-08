<template>
    <div id="chat_publish">
      <div class="Header">
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
      </div>
      <div class="content">
            <div class="content_header">
            <div class="roll_back">
                <a href="/chat">&lt; 返回</a>
                </div>
                <div class="title_input">
                <input v-model="title" placeholder="请输入标题">
                </div>
            </div>
            <div class="content_body">
                <div class="content_body_text">
                    <el-input type="textarea" :rows="15" placeholder="请输入内容" v-model="textarea">
                    </el-input>
                </div>
            </div>
            <div class="content_footer">
                <div class="submit" style="text-align: center;">
                <el-button @click="submit">发布</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import request from '../methods/http/sendrequest.js'
export default {
    data() {
        return {
            individual: {},
            textarea: '',
            title: '',
        }   
    },
    mounted: function() {
        var pointer=this
        request.GetUserBaseInfo(pointer)
    },
    methods: {
        check: function() {
            if(this.title==''){
                this.$alert('请输入标题')
                return false
            }
            if(this.textarea==''){
                this.$alert('请输入内容')
                return false
            }
            return true
        },
        submit: function() {
            if(this.check()){
                var pointer=this
                request.HttpRequest(pointer,'/api/v1/forum/publish','post',
                function(response,pointer) {
                    console.log(response)
                    pointer.$message(
                    {
                        type: 'success',
                        message: '发布成功!',
                    })
                    pointer.$router.push('/chat')
                }
                    ,{
                        title: this.title,
                        content: this.textarea,
                    })
                }
            }
        }
    }
</script>
<style>
@import '../assets/css/chat_publish.css';
</style>