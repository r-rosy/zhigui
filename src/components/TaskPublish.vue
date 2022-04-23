<template>
    <div id="task_publish">
        <div class="header w">
            <div class="logo">
                <img src="../assets/imgs/logo.png" alt="">
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
            <div class="Avatar">
                <img class="Avatar__image" :src="individual.Avatar" >
                <a href="/individual">{{individual.nick_name}}</a>
            </div>
        </div>
        <div class="info_box">
            <span class="demonstration1">选择发布任务的专区 分类以及方式</span>
  <el-cascader v-model="value1" :options="options1" :props="{ expandTrigger: 'hover' }"></el-cascader>
  <span class="demonstration2">选择发布任务的方式</span>
  <el-cascader v-model="value2" :options="options2" :props="{ expandTrigger: 'hover' }"></el-cascader>
  <div class="award">
    <span>请输入任务金额(元)</span>
    <el-input type="text" placeholder="请输入金额" v-model="text" maxlength="10" show-word-limit></el-input>
  </div>
      <div style="margin: 20px 0;"></div>
      <div class="content">
      <span>请输入任务内容</span>
    <el-input type="textarea" placeholder="请输入任务内容" v-model="textarea" :autosize="{ minRows: 2, maxRows: 4}" maxlength="100" show-word-limit></el-input>
    
  </div>
  
  <div class="submit">
    <el-upload
              action="' '" 
              list-type="picture-card"
              :limit="1"
              show-file-list
              :auto-upload="false"
              :on-change="change"
              multiple
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
<el-button type="plain" @click="submit">提交</el-button>
        </div>
    </div>
    </div>
</template>
<script>
import ElementUI from 'element-ui';
import axios from 'axios';
export default {
    data() {
        return {
          dialogImageUrl: "",
          dataList: [],
          header: {
                'Authorization': 'Bearer:'+localStorage.getItem('zhigui-token'),
            },
            request :{
              prefecture_id: '',
              tag_id: '',
              content: '',
              award: 0,
              method: '',
            },
            id : '',
            individual: {},
            task: {

            },
            text: '',
            textarea: '',
            value1: [],
            value2: [],
        options1: [{
          value: '专区',
          label: '专区',
          children: [{
            value: '数理专区',
            label: '数理专区',
            children: [{
              value: '高等数学',
              label: '高等数学'
            }, {
              value: '线性代数',
              label: '线性代数'
            }, {
              value: '概率论',
              label: '概率论'
            }, {
              value: '复变函数论',
              label: '复变函数论'
            },
            {
              value: '数学分析',
              label: '数学分析'
            }
            ]
          }, {
            value: '英语专区',
            label: '英语专区',
            children: [{
              value: '四六级',
              label: '四六级'
            }, {
              value: '专四专八',
              label: '专四专八'
            },
            {
              value: '考研',
              label: '考研'
            },
            {
              value: '雅思托福',
              label: '雅思托福'
            },
            {
              value: '口语',
              label: '口语'
            },
            ]
          },
          {
            value: '专业课专区',
            label: '专业课专区',
            children: [{
              value: '学长学姐咨询',
              label: '学长学姐咨询'
            }, {
              value: '学霸分享',
              label: '学霸分享'
            },
            {
              value: '考试技巧',
              label: '考试技巧'
            },
            {
              value: '上岸经验',
              label: '上岸经验'
            },
            {
                value: '往年试题',
                label: '往年试题'
            }
            ]
          },
          {
            value: '竞赛专区',
            label: '竞赛专区',
            children: [{
              value: '挑战杯',
              label: '挑战杯'
            }, {
              value: '数学建模',
              label: '数学建模'
            },
            {
              value: '创新创业',
              label: '创新创业'
            },
            {
              value: '计算机设计',
              label: '计算机设计'
            },
            {
              value: 'CCPC/ICPC',
              label: 'CCPC/ICPC'
            }
            ]
          },
          {
            value: '体育专区',
            label: '体育专区',
            children: [{
              value: '田径',
              label: '田径'
            }, {
              value: '篮球',
              label: '篮球'
            },
            {
              value: '足球',
              label: '足球'
            },
            {
              value: '羽毛球',
              label: '羽毛球'
            },
            {
              value: '乒乓球',
              label: '乒乓球'
            },
            ]
          },
          {
            value: '游戏专区',
            label: '游戏专区',
            children: [{
              value: '陪玩',
              label: '陪玩'
            }, {
              value: '刷级',
              label: '刷级'
            },
            {
              value: '上分',
              label: '上分'
            },
            {
              value: '组团开黑',
              label: '组团开黑'
            },
            {
              value: '代肝',
              label: '代肝'
            }
            ]
          },
          {
            value: '赏乐专区',
            label: '赏乐专区',
            children: [{
              value: '周末出游',
              label: '周末出游'
            }, {
              value: '寒暑假旅行',
              label: '寒暑假旅行'
            },
            {
              value: '组团旅游',
              label: '组团旅游'
            },
            ]
          },
          {
            value: '吃喝专区',
            label: '吃喝专区',
            children: [{
              value: '外卖拼单',
              label: '外卖拼单'
            }, {
              value: '带饭',
              label: '带饭'
            },
            {
              value: '跑腿',
              label: '跑腿'
            },
            {
              value: '代购',
              label: '代购'
            },
            ]
          },
          ]
        }],
        options2:[
           {
          value: '地点',
          label: '地点',
          children: [{
            value: '线上',
            label: '线上',
          }, {
            value: '线下',
            label: '线下',
          }, {
            value: '线上下结合',
            label: '线上下结合',
          }
        ]}
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
    methods : {
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
      check: function() {
        if(this.value1.length==0||this.value2.length==0||this.text==''||this.textarea==''||this.dataList.length==0)
        {
          this.$message('请填写完整信息并上传图片');
          return false;
        }else if(isNaN(Number(this.text,10))){
          this.$message('任务金额输入非数字');
          return false;
	}
        return true;
      },
      change(file, fileList) {
   //将每次图片数组变化的时候，实时的进行监听，更改数组里面的图片数据
      var arr = [];
      fileList.forEach((item) => {
        arr.push(item.raw);
      });
      this.dataList = arr;
      console.log(arr);
    },
      submit: function() {
        var pointer=this;
        if(this.check()) {
          this.request.prefecture_id=this.map(this.value1[1])+"";
          this.request.tag_id=this.map(this.value1[2])+"";
          this.request.award=Number(this.text,10)
          this.request.content=this.textarea
          this.request.method=this.value2[1]
          axios.post('/api/v1/tasks/publish',this.request).then(function (response) {
                console.log(response)
                    if(response.status==200)
                    {
                        pointer.id=response.data.data.Task.ID+"";
                        let config = {
        timeout: 30000,
        headers: {
          "Content-Type": "multipart/form-data", //设置headers
        },
      };
     const formData = new FormData();
    // 首先判断是否上传了图片，如果上传了图片，将图片存入到formData中
      console.log(pointer.dataList);
      if (pointer.dataList) {
        pointer.dataList.forEach((item, index) => {
           console.log(index)
          formData.append("file", item);
        });
      }
  // console.log(formData.get(0));
  formData.append("id", pointer.id);
         axios.post(
            "/api/v1/tasks/publish/picture", //请求后端的url
            formData,
            config
          )
          .then((res) => {
            console.log(res)
            if (res.status == 200) {
              pointer.$message.success("发布成功");
              pointer.$router.push('/task')
            } else {
              this.$message('任务图片上传失败')
              pointer.$router.push('/task/publish')
            }
          })
          .catch((error) => {
            console.log(error);
          });
      //用户可以在上传完成之后将数组给清空，这里直接跳转到首页了，没有做清空的操作
                        
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
        
      }
    }
}
</script>
<style scoped>
@import '../assets/css/task_publish.css';
</style>