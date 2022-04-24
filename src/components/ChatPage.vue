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
        <div class="myforum w"><button>去发帖</button></div>
        <div class="num1 w">
            <div class="user1 w">
                <a href="#"><img class="user_image" src="../assets/imgs/user.png"></a>
            </div>
            <div class="name">
                <span>小雨雨雨雨宇</span>
            </div>
            <div class="more">
                <a href="/chat/detail/1">&gt;&gt;详情</a>
                <ul>
                    <li></li><span>❤</span>点赞
                    <li></li><span>✉</span>评论
                </ul>
            </div>
            <div class="discuss1">
                <h2>今天早上在操场捡了一张校园卡</h2>
                <p>丢失者请联系我,qq23423198</p>
                <p>是在靠近体育场一侧,是19级王同学的卡</p>
                <span>2021年4月23日</span>
            </div>
        </div>
        <div class="num2 w">
            <div class="user1 w">
                <a href="#"><img class="user_image" src="../assets/imgs/user.png"></a>
            </div>
            <div class="name">
                <span>潇潇暮雨</span>
            </div>
            <div class="more">
                <a href="/chat/detail/1">&gt;&gt;详情</a>
                <ul>
                    <li></li><span>❤</span>点赞
                    <li></li><span>✉</span>评论
                </ul>
            </div>
            <div class="discuss1">
                <h2>分享华中科技大学计算机考研全套资料</h2>
                <p>有兴趣的可以联系我qq2021214068</p>
                <p>本人19级在校生,建议白天有课晚上联系</p>
                <span>2021年3月30日</span>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import ElementUI from 'element-ui'
export default {
    data() {
        return {
            id: 0,
            persons: [{
                Name:  '',
                Avatar: '',
            }],
            number: 0,
            individual: {},
            Lister: [],
            }
    },
    mounted: function() {
        let pointer=this
            axios.get('/api/v1/user/info').then(function (response) {
                console.log(response)
                    if(response.status==200)
                    {
                        pointer.individual = response.data.data
                    }else {
                        pointer.$message(response.data.error);
                        ElementUI.Message({  
                        message: response.data.message.Message
                        })
                    }
                })
            .catch(function (error) {
    console.log(error);
  })
            axios.get('/api/v1/forum?limit=11&page=0').then(function (response) {
                console.log(response)
                    if(response.status==200)
                    {
                        pointer.number=response.data.data.NUM
                        pointer.Lister = response.data.data.POSTS
                        for(let i=0;i<pointer.Lister.length;i++)
                        {
                            axios.get('/api/v1/user/others?email='+pointer.Lister[i].Publisher).then(function (response) { 
                        pointer.persons[pointer.id]={Name:response.data.data.Name,Avatar:response.data.data.IMG.Avatar}
                        pointer.id++
                })
            .catch(function (error) {
    console.log(error);
        })
                        }
                    }else {
                        pointer.$message(response.data.error);
                        ElementUI.Message({  
                        message: response.data.message.Message
                        })
                    }
                })
            .catch(function (error) {
    console.log(error);
  })
    },
    methods: {
         
    },
}
</script>
<style scoped>
@import '../assets/css/chat.css';
</style>