<template>
<div id="individual">
<div class="header w">
        <div class="logo">
            <img src="../assets/imgs/logo.png" alt="">
        </div>
        <div class="nav">
            <ul>
                <li><span></span><a href="/index">首页</a></li>
                <li><span></span><a href="#">聊聊</a></li>
                <li><span></span><a href="tasks.html">任务栏</a></li>
                <li><span></span><a href="list.html">排行榜</a></li>
                <li><span></span><a href="/individual">个人中心</a></li>
            </ul>
        </div>
    </div>
    <div class="w">
        <div class="media">
            <div class="information">
                <img class="my__image" :src="individual.Avatar" alt="">
                <div class="mediabody">
                    <h5>
                        <label data-name="studentname" id="stname">{{individual.nick_name}}</label>
                    </h5>
                    <p class="p1">
                        <label>邮箱 </label>
                        <span data-id="studentId" id="user-number"> {{individual.email}} </span>
                    </p>
                    <p class="p2">
                        <label>手机号 </label>
                        <span data-id="studentEmail" id="user-Email"> {{individual.phone_num}} </span>
                    </p>
                </div>
            </div>
            <div class="mediatask">
                <div class="tasking">
                    <h2>{{individual.Doing}}</h2>
                    <p>进行中任务</p>
                </div>
                <div class="tasked">
                    <h2>{{individual.Done}}</h2>
                    <p>已完成任务</p>
                </div>
                <div class="earned">
                    <h2>{{individual.Earning}}</h2>
                    <p>已获取收益</p>
                </div>
            </div>
        </div>
        <div class="more w"><a href="/individual/update" class="btn test">>>完善资料</a></div>
        <div class="details">
            <div class="left1">
                <p>我的发帖</p>
            </div>
            <div class="mytask">
                <a href="chat.html">你看过的C语言指针最简单的总结</a>
            </div>
            <div class="left2">
                <p>我的回帖</p>
            </div>
            <div class="accepttask">
                回复：<a href="chat.html">计算机专业出来能做什么工作啊？</a><br>
                回复：<a href="chat.html">前端和后端分别是做什么的？</a><br>
                回复：<a href="chat.html">参加计算机设计大赛需要做哪些准备？</a><br>
            </div>
        </div>
    </div>
    </div>
</template>
<script>
import axios from "axios"
import ElementUI from 'element-ui'
export default {
    name: "IndividualPage",
    data() {
        return {
            individual: {},
        }
    },
    mounted: function() {
            var pointer=this
            axios.get('/api/v1/user/info').then(function (response) {
                console.log(response)
                if(response.status==200)
                {
                    pointer.individual=response.data.data
                }else {
                    pointer.$message(response.data.error);
                    ElementUI.Message({  
                    message: response.data.error,
                    })
                    console.log(response)
                }
                })
            .catch(function (error) {
    console.log(error);
  });
        },
    }
</script>

<style scoped>
@import '../assets/css/individual.css';
</style>