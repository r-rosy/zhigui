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
        <div></div>
        
    </div>
    <el-divider></el-divider>
    <div class="main w">
        <div class="publish_new" >
                    <el-divider></el-divider>
            <span>还在等什么,去发布新任务吧！</span>
            <el-button plain>>>>去发布</el-button>
        </div>
            <el-divider></el-divider>
        <div class="rank">
            <p>排序   </p>
    <el-radio v-model="sort" label="hot" border>最热</el-radio>
    <el-radio v-model="sort" label="new" border>最新</el-radio>
    <el-radio v-model="sort" label="expensive" border>最高收益</el-radio>
            
        </div>
        <div class="type">
            <p>分类</p>
            <el-radio v-model="category" :label="type" border v-for="type in categories" :key="type">{{type}}</el-radio>
        </div>
        <div class="place">
            <p>地点</p>
            <el-radio v-model="way" label="online" border>线上</el-radio>
            <el-radio v-model="way" label="offoline" border>线下</el-radio>
            <el-radio v-model="way" label="all" border>线上线下结合</el-radio>
        </div>
        <div class="money">
            <p>报酬</p>
            <el-radio v-model="limit" label="{left:0,right:50}" border>0-50</el-radio>
            <el-radio v-model="limit" label="{left:50,right:200}" border>50-200</el-radio>
            <el-radio v-model="limit" label="{left:200,right:10000000000}" border>200以上</el-radio>
                
        </div>
        
        <el-divider></el-divider>
    </div>
    <el-divider></el-divider>
    <div class="list w">
        <table>
            <tr>
                <th>分类</th>
                <th>主题</th>
                <th>报酬</th>
                <th>状态</th>
                <th>热度</th>
            </tr>
            <tr v-for="task in tasks" :key="task">
                <td>{{task.category}}</td>
                <td>{{task.title}}</td>
                <td>{{task.award}}元</td>
                <td>{{task.status}}</td>
                <td>{{task.hot}}</td>
            </tr>
        </table>
    </div>
    <div class="pagi">
        <el-pagination background layout="prev, pager, next" :total="50" :page-size="5" :pager-count="6">
    </el-pagination>
    </div>
    </div>
</template>
<script>
import axios from 'axios'
import ElementUI from 'element-ui'
export default {
    name: 'FieldPage',
    data() {
        return {
            style :{
                color: 'color: colar;'
            },
            prev: 1,
            pager: 1,
            next: 2,
            individual: {},
            categories: [],
            sort: '',
            category: '',
            way: '',
            condition: '',
            limit: {
                left :0,
                right: 0
            },
            tasks: [
                {
                category: '高等数学',
                title: '线上辅导',
                award: 150,
                status: '未交易',
                hot: 2,
            },
            {
                category: '高等数学',
                title: '线上辅导',
                award: 150,
                status: '未交易',
                hot: 2,
            },
            {
                category: '高等数学',
                title: '线上辅导',
                award: 150,
                status: '未交易',
                hot: 2,
            },
            {
                category: '高等数学',
                title: '线上辅导',
                award: 150,
                status: '未交易',
                hot: 2,
            },
            ],
            maths: ['高等数学','线性代数','概率论','复变函数论','数学分析','离散数学','大学物理','力学'],
            English: ['四六级','专四专八','考研','雅思托福','口语'],
            professions: ['学长学姐咨询','学霸分享','考试技巧','上岸经验','往年试题'],
            competitions: ['挑战杯','数学建模','创新创业','计算机设计','CCPC\\ICPC'],
            PEs: ['田径','篮球 ','足球','羽毛球','乒乓球'],
            games: ['陪玩','刷级','上分','组团开黑','代肝'],
            enjoy: ['周末出游','寒暑假出游','组团旅游'],
            meals: ['外卖拼单','带饭','跑腿','代购']
        }
    },
    mounted: function() {
        var type=this.$route.params.type
        if(type=='math'){
            this.categories=this.maths
        }else if(type=='English'){
            this.categories=this.English
        }else if(type=='profession'){
            this.categories=this.professions
        }else if(type=='competition'){
            this.categories=this.competitions
        }else if(type=='PE'){
            this.categories=this.PEs
        }else if(type=='game'){
            this.categories=this.games
        }else if(type=='enjoy'){
            this.categories=this.enjoy
        }else if(type=='meal'){
            this.categories=this.meals
        }
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
  })}
    ,
    methods: {

    }
}
</script>
<style scoped>
@import '../assets/css/field.css';
</style>