<template>
    <div id="list">
        <div class="header w">
        <div class="logo">
            <img src="../assets/imgs/logo.png" alt="">
        </div>
        <div class="nav">
            <ul>
                <li><span></span><a href="/index">首页</a></li>
                <li><span></span><a href="#">聊聊</a></li>
                <li><span></span><a href="#">任务栏</a></li>
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
    <div id="app">
        <el-table :data="Lister" height="100%" stript style="width: 100%" >
        <el-table-column prop="rank" label="排名" width="180"> </el-table-column>
        <el-table-column prop="name" label="用户名" width="180"> </el-table-column>
        <el-table-column prop="money" label="收入" width="180"> </el-table-column>
        <el-table-column prop="finish" label="完成数"> </el-table-column>
        <el-table-column prop="continuing" label="进行中"> </el-table-column>
      </el-table>
      <div class="pagi">
        <el-pagination background layout="prev, pager, next" :total="10">
    </el-pagination>
    </div>
    </div>  
    </div>
</template>
<script>
export default {
    data() {
        return {
            individual: {},
            }
    },
}
</script>