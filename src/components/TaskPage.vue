<template>
  <div id="task">
    <div class="header w">
      <div class="logo">
        <img src="../assets/imgs/logo.png" alt="" />
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
        <img class="avatar__image" :src="individual.Avatar" />
        <a href="/individual">{{ individual.nick_name }}</a>
      </div>
    </div>
    <div class="publish w">
      <div class="new">
        <el-button @click="To('/task/publish')">New+</el-button>
      </div>
      <div class="new_p"><span>在此发布你的新任务!</span></div>
      <el-table :data="Lister" height="100%" stript style="width: 100%">
        <el-table-column prop="class" label="分类" width="180">
        </el-table-column>
        <el-table-column prop="theme" label="主题" width="180">
        </el-table-column>
        <el-table-column prop="reward" label="报酬"> </el-table-column>
        <el-table-column prop="finish" label="是否完成" width="180">
        </el-table-column>
        <el-table-column prop="deadline" label="截止日期"> </el-table-column>
        <el-table-column prop="details" label="详情"
          ><a href="#"></a
        ></el-table-column>
      </el-table>
      <div class="pagi">
        <el-pagination background layout="prev, pager, next" :total="10">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import ElementUI from "element-ui";
export default {
  data() {
    return {
      individual: {},
    };
  },
  mounted: function () {
    let pointer = this;
    axios
      .get("/api/v1/user/info")
      .then(function (response) {
        console.log(response);
        if (response.status == 200) {
          pointer.individual = response.data.data;
        } else {
          pointer.$message(response.data.error);
          ElementUI.Message({
            message: response.data.message.Message,
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  methods: {
    To: function (url) {
      this.$router.push(url);
    },
  },
};
</script>
<style scoped>
@import "../assets/css/task.css";
</style>
