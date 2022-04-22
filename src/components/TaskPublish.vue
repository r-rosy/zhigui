<template>
  <div id="task_publish">
    <div class="header w">
      <div class="logo">
        <img src="../assets/imgs/logo.png" alt="" />
      </div>
      <div class="nav">
        <ul>
          <li><span></span><a href="/index">首页</a></li>
          <li><span></span><a href="#">聊聊</a></li>
          <li><span></span><a href="/task">任务栏</a></li>
          <li><span></span><a href="list.html">排行榜</a></li>
          <li><span></span><a href="/individual">个人中心</a></li>
        </ul>
      </div>
      <div class="avatar">
        <img class="avatar__image" :src="individual.Avatar" />
        <a href="/individual">{{ individual.nick_name }}</a>
      </div>
    </div>
    <div class="info_box w">
      <span class="demonstration1">选择发布任务的专区:</span>
      <el-cascader
        v-model="value1"
        :options="options1"
        :props="{ expandTrigger: 'hover' }"
      ></el-cascader>
      <span class="demonstration2">选择发布任务的形式:</span>
      <el-cascader
        v-model="value2"
        :options="options2"
        :props="{ expandTrigger: 'hover' }"
      ></el-cascader>
      <div class="award">
        <span>请输入任务金额(元)</span>
        <el-input
          type="text"
          placeholder="请输入金额"
          v-model="text"
          maxlength="10"
          show-word-limit
        ></el-input>
      </div>
      <div style="margin: 20px 0"></div>
      <div class="content">
        <span>请输入任务内容</span>
        <el-input
          type="textarea"
          placeholder="请输入任务内容"
          v-model="textarea"
          :autosize="{ minRows: 2, maxRows: 4 }"
          maxlength="100"
          show-word-limit
        ></el-input>
      </div>
      <div class="submit">
        <el-button plain>提交</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import ElementUI from "element-ui";
import axios from "axios";
export default {
  data() {
    return {
      individual: {},
      task: {},
      text: "",
      textarea: "",
      value1: [],
      value2: [],
      options1: [
        {
          value: "field",
          label: "专区",
          children: [
            {
              value: "math/physic",
              label: "数理专区",
              children: [
                {
                  value: "yizhi",
                  label: "高等数学",
                },
                {
                  value: "fankui",
                  label: "线性代数",
                },
                {
                  value: "xiaolv",
                  label: "概率论",
                },
                {
                  value: "kekong",
                  label: "复变函数论",
                },
                {
                  value: "kekong",
                  label: "数学分析",
                },
                {
                  value: "kekong",
                  label: "离散数学",
                },
                {
                  value: "kekong",
                  label: "大学物理",
                },
                {
                  value: "kekong",
                  label: "力学",
                },
              ],
            },
            {
              value: "daohang",
              label: "英语专区",
              children: [
                {
                  value: "cexiangdaohang",
                  label: "四六级",
                },
                {
                  value: "dingbudaohang",
                  label: "专四专八",
                },
                {
                  value: "dingbudaohang",
                  label: "考研",
                },
                {
                  value: "dingbudaohang",
                  label: "雅思托福",
                },
                {
                  value: "dingbudaohang",
                  label: "口语",
                },
                {
                  value: "dingbudaohang",
                  label: "GRE/GMAT/TOEFL/SAT",
                },
              ],
            },
            {
              value: "daohang",
              label: "专业课专区",
              children: [
                {
                  value: "cexiangdaohang",
                  label: "学长学姐咨询",
                },
                {
                  value: "dingbudaohang",
                  label: "学霸分享",
                },
                {
                  value: "dingbudaohang",
                  label: "考试技巧",
                },
                {
                  value: "dingbudaohang",
                  label: "上岸经验",
                },
                {
                  value: "dingbudaohang",
                  label: "往年试题",
                },
              ],
            },
            {
              value: "daohang",
              label: "竞赛专区",
              children: [
                {
                  value: "cexiangdaohang",
                  label: "挑战杯",
                },
                {
                  value: "dingbudaohang",
                  label: "数学建模",
                },
                {
                  value: "dingbudaohang",
                  label: "创新创业",
                },
                {
                  value: "dingbudaohang",
                  label: "计算机设计",
                },
                {
                  value: "dingbudaohang",
                  label: "CCPC/ICPC",
                },
                {
                  value: "dingbudaohang",
                  label: "互联网+",
                },
                {
                  value: "dingbudaohang",
                  label: "其他类竞赛",
                },
              ],
            },
            {
              value: "daohang",
              label: "体育专区",
              children: [
                {
                  value: "cexiangdaohang",
                  label: "田径",
                },
                {
                  value: "dingbudaohang",
                  label: "篮球",
                },
                {
                  value: "dingbudaohang",
                  label: "足球",
                },
                {
                  value: "dingbudaohang",
                  label: "羽毛球",
                },
                {
                  value: "dingbudaohang",
                  label: "乒乓球",
                },
              ],
            },
            {
              value: "daohang",
              label: "游戏专区",
              children: [
                {
                  value: "cexiangdaohang",
                  label: "陪玩",
                },
                {
                  value: "dingbudaohang",
                  label: "刷级",
                },
                {
                  value: "dingbudaohang",
                  label: "上分",
                },
                {
                  value: "dingbudaohang",
                  label: "组团开黑",
                },
                {
                  value: "dingbudaohang",
                  label: "代肝",
                },
              ],
            },
            {
              value: "daohang",
              label: "赏乐专区",
              children: [
                {
                  value: "cexiangdaohang",
                  label: "周末出游",
                },
                {
                  value: "dingbudaohang",
                  label: "寒暑假旅行",
                },
                {
                  value: "dingbudaohang",
                  label: "组团旅游",
                },
              ],
            },
            {
              value: "daohang",
              label: "吃喝专区",
              children: [
                {
                  value: "cexiangdaohang",
                  label: "外卖拼单",
                },
                {
                  value: "dingbudaohang",
                  label: "带饭",
                },
                {
                  value: "dingbudaohang",
                  label: "跑腿",
                },
                {
                  value: "dingbudaohang",
                  label: "代购",
                },
              ],
            },
          ],
        },
      ],
      options2: [
        {
          value: "zujian",
          label: "地点",
          children: [
            {
              value: "basic",
              label: "线上",
            },
            {
              value: "form",
              label: "线下",
            },
            {
              value: "data",
              label: "线上下结合",
            },
          ],
        },
      ],
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
};
</script>
<style scoped>
@import "../assets/css/task_publish.css";
</style>