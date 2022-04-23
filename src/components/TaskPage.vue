<template>
    <div id="task">
        <div class="header w">
        <div class="logo">
            <img src="../assets/imgs/logo.png" alt="">
        </div>
        <div class="nav">
            <ul>
                <li><span></span><a href="index.html">首页</a></li>
                <li><span></span><a href="#">聊聊</a></li>
                <li><span></span><a href="#">任务栏</a></li>
                <li><span></span><a href="#">排行榜</a></li>
                <li><span></span><a href="indiviual.html">个人中心</a></li>
            </ul>
        </div>
        <div class="avatar">
                <img class="avatar__image" :src="individual.Avatar" >
                <a href="/individual">{{individual.nick_name}}</a>
            </div>
        </div>
    <div class="publish">
        <p>在此发布你的新任务!</p>
        <el-button @click="To('/task/publish')">New+</el-button>
        <el-table :data="Lister" height="100%" stript style="width: 100%">
        <el-table-column prop="prefecture_id" label="专区" width="180" > </el-table-column>
        <el-table-column prop="tag" label="分类" width="180" > </el-table-column>
        <el-table-column prop="content" label="主题" width="180" > </el-table-column>
        <el-table-column prop="award" label="报酬" > </el-table-column>
        <el-table-column prop="status" label="是否完成" width="180" > </el-table-column>
        <el-table-column prop="willing_num" label="热度" > </el-table-column>
        <el-table-column
      prop="ID"
      fixed="right"
      label="详情"
      width="100">
      <template slot-scope="scope">
        <a :href="'/task/detail/'+scope.row.ID" target="_blank" style="text-decoration:none;color:black;">详情</a>
      </template>
    </el-table-column>
      </el-table>
      <div class="pagi">
        <el-pagination background layout="prev, pager, next" :total="number" :page-size="11" :current-page.sync="currentpage">
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
            number: 0,
            Lister: [],
            individual: {},
            currentpage: 1,
            pages: {
                limit: 11,
                page: 0
            }
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
            axios.get('/api/v1/taskbar?limit='+this.pages.limit+'&page='+this.pages.page).then(function (response) {
                console.log(response)
                    if(response.status==200)
                    {
                        pointer.Lister = response.data.data.TASKS
                        pointer.number=response.data.data.NUM
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
        To: function(url) {
            this.$router.push(url);
        }
    },
    watch: {
        currentpage: function(newpage) {
            this.pages.page = newpage-1
            let pointer=this;
            axios.get('/api/v1/taskbar?limit='+this.pages.limit+'&page='+this.pages.page).then(function (response) {
                console.log(response)
                    if(response.status==200)
                    {
                        pointer.Lister = response.data.data.TASKS
                    }else {
                        this.$message(response.data.error);
                        ElementUI.Message({  
                        message: response.data.message.Message
                        })
                    }
                })
            .catch(function (error) {
    console.log(error);
    })
    
        }
    }
}
</script>
<style scoped>
@import '../assets/css/task.css';
</style>
