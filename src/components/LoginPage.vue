<template>
    <div id="login">
        <div class="Box">
            <form action="">
                <h4>登录</h4>
                <div class="putin">
                    <input type="text" placeholder="请输入邮箱" v-model="individual.email">
                    <input type="password" placeholder="请输入密码" v-model="individual.password">
                </div>
                <a href="javascript:;" class="btn test" @click="Login">点击验证</a>
                <div class="fn">
                    <label for="check"><input id="check" type="checkbox"><span><span></span></span>记住我</label>
                    <a href="javascript:;">忘记密码</a>
                </div>
                <div class="reg">
                    <p>还没有账号？
                        <a href="register.html" class="register">立即注册</a>
                    </p>
                </div>
            </form>
    </div>
</div>
</template>

<script>
import axios from "axios"
import ElementUI from 'element-ui'
export default {
    name: 'LoginPage',
    data() {
        return {
            individual: {
            email: "",
            password: "",
        }
        }
    },
    methods: {
        check: function() {
            if (this.individual.email == '') {
                alert('邮箱不能为空');
                return false;
            }
            if (this.individual.password == '') {
                alert('密码不能为空');
                return false;
            }
            return true;
        },
        Login: function() {
        if(this.check()) {
            var pointer=this
            axios.post('/api/v1/auth/login',this.individual).then(function (response) {
                console.log(response)
                    if(response.status==200)
                    {
                        localStorage.setItem('zhigui-token',response.data.data)
                        pointer.$router.push('/index');
                    }else {
                        pointer.$message(response.data.error);
                        ElementUI.Message({  
                        message: response.data.message.Message
                        })
                    }
                })
            .catch(function (error) {
    console.log(error);
  });
        }
    },
    }
    ,
}
</script>
<style scoped>
@import '../assets/css/login.css';
</style>