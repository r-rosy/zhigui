<template>
<div id="index">
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
        <div class="banner">
            <!---- 这里是轮播图的组件>  <!-->
            <el-carousel :interval="5000" arrow="always" >
                <el-carousel-item v-for="img in imgs" :key="img">
                    <img :src="img" alt="">
                </el-carousel-item>
            </el-carousel>
            <!---- 这里是轮播图的组件>  <!-->
        </div>
        <div class="recommend w">
            <h2>为你推荐</h2>
            <ul class="connect">
                <li><a href="#">高数一对一辅导2小时</a>
                    <h4>可获得100元/次</h4>
                    <p>已有32人意愿接单</p>
                </li>
                <li><a href="#">3月6日剧本杀七缺三</a>
                    <h4>可获得0元/次</h4>
                    <p>已有40人意愿接单</p>
                </li>
                <li><a href="#">C语言指导题目咨询</a>
                    <h4>可获得300元/学期</h4>
                    <p>已有12人意愿接单</p>
                </li>
            </ul>
            <div class="more">
                <a href="#">更多&gt;</a>
            </div>
        </div>
        <div class="study w">
            <h2>学习区</h2>
            <div class="box" onclick="window.open('./study.html')" id="pointer_box">
                <img src="../assets/imgs/math修改版.jpg" alt="">
                <a href="">数理专区</a>
                <p class="content1">
                    高等数学/线性代数/概率论/离散...
                </p>
                <div class="number1">共135条未接任务</div>
            </div>

            <div class="box2" id="pointer_box">
                <img src="../assets/imgs/8.0.png" alt="">
                <a href="#">英语专区</a>
                <p class="content2">
                    四六级/口语练习/专四专八/演讲...
                </p>
                <div class="number2">共112条未接任务</div>
            </div>

            <div class="box3" id="pointer_box">
                <img src="../assets/imgs/合作.jpg" alt="">
                <a href="#">专业课专区</a>
                <p class="content3">
                    学长姐咨询/学霸分享/考试技巧/...
                </p>
                <div class="number3">共45条未接任务</div>
            </div>

            <div class="box4" id="pointer_box">
                <img src="../assets/imgs/竞赛.jpg" alt="">
                <a href="#">竞赛专区</a>
                <p class="content4">
                    挑战杯/数学建模/创新创业/计算机...
                </p>
                <div class="number4">共126条未接任务</div>
            </div>
        </div>
        <div class="amusement w">
            <h2>娱乐区</h2>
            <ul class="clearfix">
                <li class="box5">
                    <img src="../assets/imgs/体育.jpg" alt="">
                    <a href="#">体育专区</a>
                    <p class="sport">
                        跑步/篮球/羽毛球/足球...
                    </p>
                    <div class="sporters">共103条未接任务</div>
                </li>
                <li class="box6">
                    <img src="../assets/imgs/电子游戏.jpg" alt="">
                    <a href="#">游戏专区</a>
                    <p class="game">
                        陪玩/刷级/上分/组团开黑...
                    </p>
                    <div class="gamers">共130条未接任务</div>
                </li>
                <li class="box7">
                    <img src="../assets/imgs/游乐场.jpg" alt="">
                    <a href="#">赏乐专区</a>
                    <p class="travel">
                        周末出游/寒暑假旅行
                    </p>
                    <div class="travelers">共35条未接任务</div>
                </li>
                <li class="box8">
                    <img src="../assets/imgs/美食.jpg" alt="">
                    <a href="#">吃喝专区</a>
                    <p class="eat">
                        外卖拼单/带饭
                    </p>
                    <div class="eaters">共88条未接任务</div>
                </li>
            </ul>
        </div>
        <div class="footer">
            <div class="w">
                <div class="links">
                    <dl>
                        <dt>关于我们</dt>
                        <dd><a href="#">公司信息</a></dd>
                        <dd><a href="#">加入我们</a></dd>
                        <dd><a href="#">成长历程</a></dd>
                        <dd><a href="#">媒体报道</a></dd>
                    </dl>
                    <dl>
                        <dt>服务</dt>
                        <dd><a href="#">帮助中心</a></dd>
                        <dd><a href="#">最新功能</a></dd>
                        <dd><a href="#">服务条款</a></dd>
                        <dd><a href="#">隐私条款</a></dd>
                    </dl>
                    <dl>
                        <dt>联系我们</dt>
                        <dd><a href="#">监督举报</a></dd>
                        <dd><a href="#">侵权申诉</a></dd>
                    </dl>
                </div>
            </div>
        </div>
</div>
</template>

<script>
import axios from 'axios'
import ElementUI from 'element-ui'
export default {
    name: 'IndexPage',
    data() {
        return {
            individual: {},
            imgs: [
                    require('../assets/imgs/春节.jpg'),
                    require('../assets/imgs/电子游戏.jpg'),
                    require('../assets/imgs/合作.jpg'),
                    require('../assets/imgs/竞赛.jpg'),
                ]
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
    methods: {
        RedictTo: function(url) {
            this.$router.push(url)
        }
    }

}
</script>

<style scoped>
@import '../assets/css/index.css';
</style>