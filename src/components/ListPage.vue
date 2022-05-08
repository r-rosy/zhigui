<template>
    <div id="list">
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
    <div id="app" class="w">
        <el-table :data="Lister" height="100%" stript style="width: 100%" >
        <el-table-column prop="rank" label="排名" width="180"> </el-table-column>
        <el-table-column prop="name" label="用户名" width="180"> </el-table-column>
        <el-table-column prop="money" label="点赞数" width="180"> </el-table-column>
        <el-table-column prop="finish" label="完成数"> </el-table-column>
        <el-table-column prop="continuing" label="进行中"> </el-table-column>
      </el-table>
      <div class="pagi">
        <el-pagination background layout="prev, pager, next" :total="50" style="text-align:center;background-color:white">
    </el-pagination>
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
            individual: {},
            Lister: [
                {
                    name: '潇潇暮雨',
                    money: '1800',
                    finish: '20',
                    continuing:'5',
                    id: '2020****',
                    rank: '1',
                    },
                    {
                    name: 'rinna',
                    money: '1700',
                    continuing: '10',
                    id: '2021****',
                    finish: '16',
                    rank: '2',
                    },
                    {
                    name: '北川',
                    money: '1600',
                    continuing: '15',
                    id: '2020****',
                    finish: '23',
                    rank: '3',
                    },
                    {
                    name: '人生如戏',
                    money: '1500',
                    continuing: '20',
                    id: '2019****',
                    rank : '4',
                    finish: '2',
                    },
                    {
                    name: '漠然',
                    money: '1400',
                    continuing: '25',
                    id: '2020****',
                    rank : '5',
                    finish: '22',
                    },
                    {
                    name: '神奈七乐',
                    money: '1300',
                    continuing: '30',
                    id: '2021****',
                    rank : '6',
                    finish: '24',
                    },
                    {
                    name: '我们是冠军',
                    money: '1200',
                    continuing: '35',
                    id: '2020****',
                    rank : '7',
                    finish: '21',
                    },
                    {
                    name: '子路',
                    money: '1100',
                    continuing: '40',
                    id: '2019****',
                    rank : '8',
                    finish: '7',
                    },
                    {
                    name: '断桥烟雨@',
                    money: '1000',
                    continuing: '45',
                    id: '2018****',
                    rank : '9',
                    finish: '30',
                    },
                    {
                    name: '凭阑干',
                    money: '900',
                    continuing: '50',
                    id: '2020****',
                    rank : '10',
                    finish: '12',
                    },
                    {
                    name: '火箭少女',
                    money: '800',
                    continuing: '55',
                    id: '2021****',
                    rank : '11',
                    finish: '25',
                    },
                    {
                    name: '电流妹',
                    money: '700',
                    continuing: '60',
                    id: '2017****',
                    rank : '12',
                    finish: '2',
                    }
            ],
            rank:1,
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

            axios.get('/api/v1/ranking?limit=11&page=0').then(function (response) {
                console.log(response)
                    if(response.status==200)
                    {
                        pointer.Lister = response.data.data.USERS
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
  })
    }
}
</script>
<style scoped>
@import '../assets/css/list.css';
</style>