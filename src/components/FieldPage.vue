<template>
    <div id="field">
        <div class="header w">
        <div class="logo">
            <img src="../assets/imgs/logo.png" alt="">
        </div>
        <div class="nav">
            <ul>
                <li><span></span><a href="/index">首页</a></li>
                <li><span></span><a href="#">聊聊</a></li>
                <li><span></span><a href="/task">任务栏</a></li>
                <li><span></span><a href="#">排行榜</a></li>
                <li><span></span><a href="#">赛事实况</a></li>
                <li><span></span><a href="/indiviual">个人中心</a></li>
            </ul>
        </div>
        <div class="avatar">
                <img class="avatar__image" :src="individual.Avatar" >
                <a href="/individual">{{individual.nick_name}}</a>
            </div>
    </div>
    <div class="search w">
        <input type="search" placeholder="高等数学一对一辅导">
        <button>搜索</button>
    </div>
    <div class="main w">
        <div class="rank">
            <span>排序</span>
            <a href="#" class="hot" @click="sort='hot'">最热</a>
            <a href="#" @click="sort='new'">最新</a>
            <a href="#" @click="sort='expensive'">最高收益</a>
        </div>
        <div class="type">
            <span>分类</span>
            <a href="#" class="typemath">高等数学</a>
            <a href="#">线性代数</a>
            <a href="#">概率论</a>
            <a href="#">复变函数论</a>
            <a href="#">数学分析</a>
            <a href="#">离散数学</a>
            <a href="#">大学物理</a>
            <a href="#">力学</a>
        </div>
        <div class="place">
            <span>地点</span>
            <a href="#" class="face">面授</a>
            <a href="#">线上</a>
            <a href="#">线上线下混合</a>
        </div>
        <div class="money">
            <span>报酬</span>
            <a href="#" class="low">0-50元</a>
            <a href="#">50-200元</a>
            <a href="#">200元以上</a>
        </div>
    </div>
    <div class="list w">
        <table>
            <tr>
                <th>分类</th>
                <th>主题</th>
                <th>报酬</th>
                <th>状态</th>
                <th>热度</th>
            </tr>
            <tr>
                <td>高等数学</td>
                <td><a href="#">线上答疑一学期</a></td>
                <td>150元</td>
                <td>未交易</td>
                <td>已有2人意愿接单</td>
            </tr>
            <tr>
                <td>高等数学</td>
                <td><a href="#">线上答疑一学期</a></td>
                <td>150元</td>
                <td>未交易</td>
                <td>已有2人意愿接单</td>
            </tr>
            <tr>
                <td>高等数学</td>
                <td><a href="#">线上答疑一学期</a></td>
                <td>150元</td>
                <td>未交易</td>
                <td>已有2人意愿接单</td>
            </tr>
            <tr>
                <td>高等数学</td>
                <td><a href="#">线上答疑一学期</a></td>
                <td>150元</td>
                <td>未交易</td>
                <td>已有2人意愿接单</td>
            </tr>
            <tr>
                <td>高等数学</td>
                <td><a href="#">线上答疑一学期</a></td>
                <td>150元</td>
                <td>未交易</td>
                <td>已有2人意愿接单</td>
            </tr>
            <tr>
                <td>高等数学</td>
                <td><a href="#">线上答疑一学期</a></td>
                <td>150元</td>
                <td>未交易</td>
                <td>已有2人意愿接单</td>
            </tr>
            <tr>
                <td>高等数学</td>
                <td><a href="#">线上答疑一学期</a></td>
                <td>150元</td>
                <td>未交易</td>
                <td>已有2人意愿接单</td>
            </tr>
            <tr>
                <td>高等数学</td>
                <td><a href="#">线上答疑一学期</a></td>
                <td>150元</td>
                <td>未交易</td>
                <td>已有2人意愿接单</td>
            </tr>
            <tr>
                <td>高等数学</td>
                <td><a href="#">线上答疑一学期</a></td>
                <td>150元</td>
                <td>未交易</td>
                <td>已有2人意愿接单</td>
            </tr>
            <tr>
                <td>高等数学</td>
                <td><a href="#">线上答疑一学期</a></td>
                <td>150元</td>
                <td>未交易</td>
                <td>已有2人意愿接单</td>
            </tr>
            <tr>
                <td>高等数学</td>
                <td><a href="#">线上答疑一学期</a></td>
                <td>150元</td>
                <td>未交易</td>
                <td>已有2人意愿接单</td>
            </tr>
            <tr>
                <td>高等数学</td>
                <td><a href="#">线上答疑一学期</a></td>
                <td>150元</td>
                <td>未交易</td>
                <td>已有2人意愿接单</td>
            </tr>
        </table>
    </div>

    <div class="cata w">
        <a href="#" class="prev">&lt;&lt;上一页</a>
        <a href="#" class="current">1</a>
        <a href="#">2</a>
        <a href="#">3</a>
        <a href="#">4</a>
        <a href="#">5</a>
        <a href="#" class="elp">...</a>
        <a href="#" class="next">&gt;&gt;下一页</a>
        到第
        <input type="text">
        页
        <button>确定</button>
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
            categories: [],
            sort: '',
            category: '',
            way: '',
            condition: '',
            award: '',
            maths: ['高等数学','线性代数','概率论','复变函数论','数学分析','离散数学','大学物理','力学']
            
        }
    },
    mounted: function() {
        let pointer=this;
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
    },
}
</script>
<style scoped>
@import '../assets/css/field.css';
</style>