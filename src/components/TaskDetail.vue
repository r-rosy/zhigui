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
                <span><a href="/task">&lt;&lt;退出</a></span>
            </div>
            <div class="like w">
                <span>已有{{details.willing_num}}人意愿接单</span>
            </div>
            <div class="task_more w">
                <h2>{{details.prefecture_id}}{{details.method}}任务</h2>
                <p>金额：{{details.award}}元</p>
                <p>{{details.content}}</p>
                <p>发布者： {{details.publisher}}</p>
                <el-tag v-for="tag in tags" :key="tag" type="info">
                        {{tag}}
                </el-tag>
                <div class="demo-image__preview">
  <el-image v-if="details.Image.Length==0"
    style="width: 100px; height: 100px"
    :src="details.Image[0]" 
    :preview-src-list="srcList">
  </el-image>
</div>
            </div>
            <div class="accept">
                <button v-if="details.status=='Unaccepted'&&mywill=='未发送意愿'" @click="GetTheTask" class="the_button">申请接受任务</button>
                <el-button v-else-if="mywill!='未发送意愿'&&details.status=='Unaccepted'" type="info" disabled >您已申请</el-button>
                <el-button v-else-if="mywill=='未发送意愿'&&details.status!='Unaccepted'" type="info" disabled >已被接受</el-button>
                <el-button v-else type="info" disabled >已被接受</el-button>
            </div>
        </div>

    </div>
</template>
<script>
import axios from 'axios';
import ElementUI from 'element-ui';
export default {
    data() {
        return {
            mywill: '',
            tags: [],
            individual: {},
            details: {
            },
            }

    },
    mounted: function() {
        let pointer = this;
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
        axios.get('/api/v1/tasks/details?id=' + this.$route.params.id).then(function(response) {
            console.log(response)
                if (response.status == 200) {
                    pointer.mywill=response.data.data.MyWilli;
                    pointer.details = response.data.data.Task
                    pointer.tags.push(response.data.data.Task.prefecture_id)
                    pointer.tags.push(response.data.data.Task.tag)
                    pointer.tags.push(response.data.data.Task.method)
                } else {
                    pointer.$message(response.data.error);
                    ElementUI.Message({
                        message: response.data.message.Message
                    })
                }
            })
            .catch(function(error) {
                console.log(error);
            })
    },
    methods: {
        GetTheTask() {
            var pointer=this;
            const params = new URLSearchParams();
            params.append('task_id', this.details.ID+"")
            axios.post('/api/v1/tasks/accept',params).then(function (response) {
                console.log(response)
                    if(response.status==200)
                    {
                        pointer.$message({
                            message: '申请成功',
                            type: 'success'
                        })
                        pointer.$router.push('/task')
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
        }
    },
    }
</script>
<style scoped>
@import '../assets/css/task_detail.css';
</style>