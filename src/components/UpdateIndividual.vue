<template>
<div id="update_individual">
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
    </div>
    <div class="w">
        <div class="inf-title">
            <span class="inf-title-icon"></span>
            <span class="inf-title-text">我的信息</span>
        </div>
        <div class="inf">
            <div class="box">
                
                <el-upload class="avatar-uploader" :headers="header" action="/api/v1/user/avatar" name="file" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                    <label class="user-name">上传新头像：</label>
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                     <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <div class="name">
                    <label class="user-name">用户名：</label>
                    <div class="name-content">
                        <div class="el-input">
                            <input autocomplete="off" placeholder="你的昵称" type="text" maxlength="6" validateevent="true" v-model="individual.nick_name"
                                class="el-input__inner">
                        </div>
                    </div>
                </div>
                <div class="email">
                    <label class="user-email">邮箱：</label>
                    <div class="email-content">
                        <div class="el-input">
                            {{individual.email}}
                        </div>
                    </div>
                </div>
                <div class="phone">
                    <label class="user-phone">手机号：</label>
                    <div class="phone-content">
                        <div class="el-input">
                            <input autocomplete="off" placeholder="你的手机号" type="text" maxlength="6" validateevent="true" v-model="individual.phone_num"
                                class="el-input__inner">
                        </div>
                    </div>
                </div>
                <!--
                <div class="school">
                    <label class="user-school">就读学校：</label>
                    <div class="school-content">
                        <div class="el-input">
                            <input autocomplete="off" placeholder="你的学校" type="text" maxlength="6" validateevent="true"
                                class="el-input__inner">
                        </div>
                    </div>
                </div>
                -->
                <!--
                <div class="ID">
                    <label class="user-ID">学号：</label>
                    <div class="ID-content">
                        <div class="el-input">
                            <input autocomplete="off" placeholder="你的学号" type="text" maxlength="6" validateevent="true"
                                class="el-input__inner">
                        </div>
                    </div>
                </div>
                -->
                <div class="save">
                    <button type="button" class="btn" @click="Update">
                        <span>保存</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import ElementUI from 'element-ui'
import axios from 'axios'
export default {
    data() {
        return {
            individual: {},
            imageUrl: '',
            header: {
                'Authorization': 'Bearer:'+localStorage.getItem('zhigui-token'),
            },
        }
    },
    mounted: function(){
        var pointer=this
            axios.get('/api/v1/user/info').then(function (response) {
                console.log(response)
                if(response.status==200)
                {
                    pointer.individual=response.data.data
                }else {
                    pointer.$message(response.data.error);
                    ElementUI.Message({  
                    message: response.data.error,
                    })
                    console.log(response)
                }
                })
            .catch(function (error) {
    console.log(error);
  });
    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        alert('上传成功!')
      },
      beforeAvatarUpload(file) {
        this.$message({
          message: '上传中...',
          duration: 3 * 1000,
        });
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isLt2M;
      },
      Update() {
        var pointer=this
            axios.post('/api/v1/user/info',this.individual).then(function (response) {
                console.log(response)
                if(response.status==200)
                {
                    pointer.$alert('修改成功!')
                    pointer.$router.push('/individual');

                }else {
                    pointer.$message(response.data.error);
                    ElementUI.Message({  
                    message: response.data.error,
                    })
                    console.log(response)
                }
                })
            .catch(function (error) {
    console.log(error);
  });
      },
    }
}
</script>
<style scoped>
@import '../assets/css/update_individual.css';
#update_individual .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
#update_individual .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
#update_individual .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
#update_individual .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>