<template>
    <div id="field">
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
            <el-button plain @click="To('/task/publish')">>>>去发布</el-button>
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
            <tr v-for="task in Lister" :key="task">
                <td>{{task.tag}}</td>
                <td>{{task.content}}</td>
                <td>{{task.award}}元</td>
                <td>{{task.method}}</td>
                <td>{{task.willing_num}}</td>
            </tr>
        </table>
    </div>
    <div class="pagi">
        <el-pagination background layout="prev, pager, next" :total="number" :page-size="11" :current-page.sync="currentpage">
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
            number: 0,
            prefecture_id : 0,
            tag: '',
            currentpage: 0,
            individual: {},
            categories: [],
            Lister: [],
            sort: '',
            category: '',
            way: '',
            condition: '',
            limit: {
                left :0,
                right: 0
            },
            tasks: [
            ],
            maths: ['高等数学','线性代数','概率论','复变函数论','数学分析'],
            English: ['四六级','专四专八','考研','雅思托福','口语'],
            professions: ['学长学姐咨询','学霸分享','考试技巧','上岸经验','往年试题'],
            competitions: ['挑战杯','数学建模','创新创业','计算机设计','CCPC/ICPC'],
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
            this.prefecture_id=1
        }else if(type=='English'){
            this.categories=this.English
            this.prefecture_id=2
        }else if(type=='profession'){
            this.categories=this.professions
            this.prefecture_id=3
        }else if(type=='competition'){
            this.categories=this.competitions
            this.prefecture_id=4
        }else if(type=='PE'){
            this.categories=this.PEs
            this.prefecture_id=5
        }else if(type=='game'){
            this.categories=this.games
            this.prefecture_id=6
        }else if(type=='enjoy'){
            this.categories=this.enjoy
            this.prefecture_id=7
        }else if(type=='meal'){
            this.categories=this.meals
            this.prefecture_id=8
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
  })
        axios.get('/api/v1/tasks/prefecture?prefecture='+(this.prefecture_id+"")+'&limit=11&page=0').then(function (response) {
                console.log(response)
                    if(response.status==200)
                    {
                        pointer.number=response.data.data.NUM
                        pointer.Lister = response.data.data.Tasks
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
    ,
    methods: {
        map: function(str) {
        switch(str) {
            case '数理专区':
              return 1
            case '英语专区':
              return 2
            case '专业课专区':
              return 3
            case '竞赛专区':
              return 4
            case '体育专区':
              return 5
            case '游戏专区':
              return 6
            case '赏乐专区':
              return 7
            case '吃喝专区':
              return 8
            case '高等数学':
              return 1
            case '线性代数':
              return 2
            case '概率论':
              return 3
            case '复变函数论':
              return 4
            case '数学分析':              
              return 5
            case '四六级':
              return 1
            case '专四专八':
              return 2
            case '考研':
              return 3
            case '雅思托福':
              return 4
            case '口语':
              return 5
            case '学长学姐咨询':
              return 1
            case '学霸分享':
              return 2
            case '考试技巧':
              return 3
            case '上岸经验':
              return 4
            case '往年试题':
              return 5
            case '挑战杯':
              return 1
            case '数学建模':
              return 2
            case '创新创业':
              return 3
            case '计算机设计':
              return 4
            case 'CCPC/ICPC':
              return 5
            case '田径':
              return 1
            case '篮球':
              return 2
            case '足球':
              return 3
            case '羽毛球':
              return 4
            case '乒乓球':
              return 5
            case '陪玩':
              return 1
            case '刷级':
              return 2
            case '上分':
              return 3
            case '组团开黑':
              return 4
            case '代肝':
              return 5
            case '周末出游':
              return 1
            case '寒暑假旅行':
              return 2
            case '组团旅游':
              return 3
            case '外卖拼单':
              return 1
            case '带饭':
              return 2
            case '跑腿':
              return 3
            case '代购':
              return 4
            default:
              return 0
        }
    },
    To(Url) {
        this.$router.push(Url)
    }
},

}
</script>
<style scoped>
@import '../assets/css/field.css';
</style>