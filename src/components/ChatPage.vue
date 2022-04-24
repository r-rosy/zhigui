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
        <div class="num2 w" v-for="item in Lister" :key="item.ID">
            <div class="user1 w">
                <a href="#"><img class="user_image"  :src="persons[id].Avatar"></a>
            </div>
            <div class="name">
                <span>{{persons[id].Name}}</span>
            </div>
            <div class="discuss2">
                <h3>{{item.Title}}</h3>
                <p>{{item.Content}}</p>
                <span>{{item.CreateAt}}</span>
            </div>
            {{id}}
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
        //pointer.id=2
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