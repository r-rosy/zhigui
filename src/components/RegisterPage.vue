<template>
<div id="register">
 <div class="Box">
        <form action="">
            <h4>注册|纸贵</h4>
            <h3>闲来写得青山卖&nbsp;不使人间造孽钱</h3>
            <div class="name">
                <input type="text" name="username" placeholder="请输入用户名" maxlength="6" v-model="individual.nickname">
            </div>
            <div class="email">
                <input type="text" name="email" placeholder="请输入邮箱" v-model="individual.email">
            </div>
            <div class="pass">
                <input type="password" placeholder="请输入密码" v-model="individual.password">
            </div>
            <div class="again">
                <input type="password" placeholder="请确认密码" name="pwd" v-model="checkdetails.o_password">
            </div>
            <a href="#" class="btn yes" @click="Register">点击注册</a>
            <div class="agree">
                <label for="check"><input id="check" type="checkbox"
                        checked="checked" v-model="checkdetails.submission"><span><span></span></span>我同意</label>
                <a href="javascript:;">注册条款</a>
            </div>
        </form>
    </div>
</div>
</template>

<script>
import axios from "axios"
import ElementUI from 'element-ui'
export default {
    name: 'RegisterPage',
    data() {
        return {
            individual: {
            email: "",
            nickname: "",
            password: "",
            password_again: "",
        },
        checkdetails: {
            o_password: "",
            submission: false,
        },
        }
    }, 
    methods: {
        check: function() {
            if (this.individual.nickname == "") {
                alert('用户名不能为空');
                return false;
            }
            if (this.individual.email == '') {
                alert('邮箱不能为空');
                return false;
            }
            var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); //正则表达式
            var obj = this.individual.email //要验证的对象
            if(!reg.test(obj)){ //正则验证不通过，格式不对
                    alert("邮箱格式不正确!");
                    return false;
                    }
            if (this.individual.password == '') {
                alert('密码不能为空');
                return false;
            }
            if (this.individual.password != this.checkdetails.o_password) {
                alert('两次密码不一致');
                return false;
            }
            if (this.checkdetails.submission == false) {
                alert('请同意注册条款');
                return false;
            }
            return true;
        },
    Register: function() {
        if(this.check()) {
            this.individual.password_again=this.individual.password
            var pointer=this
            axios.post('/api/v1/auth/register',this.individual).then(function (response) {
                if(response.status==200)
                    {
                         ElementUI.Message({  
                        message: "注册成功,即将跳转至登陆页面",
                        })
                        pointer.$router.push('/login');
                    }else {
                         ElementUI.Message({  
                        message: response.data.message.Message
                        })
                    }
                    console.log(response);
                })
            .catch(function (error) {
    console.log(error);
  });
        }
    },
    }
}
</script>

<style scoped>
@import '../assets/css/register.css';
</style>