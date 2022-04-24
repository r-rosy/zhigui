<template>
<div id="pay">
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
      <div class="w">
            <div class="pay">
                <div class="pay__title">
                    <h2>支付</h2>
                </div>
                <div class="pay__content">
                    <div class="pay__content__item">
                        <div class="pay__content__item__title">
                            <h3>支付方式</h3>
                        </div>
                        <div class="pay__content__item__content">
                            {{PayMethod}}
                        </div>
                    </div>
                    <div class="pay__content__item">
                        <div class="pay__content__item__title">
                            <h3>支付金额</h3>
                        </div>
                        <div class="pay__content__item__content">
                            {{PayMoney}}
                        </div>
                        <div class="pay__contract">
                            <div class="pay__contract_details">
                                <a href="#">支付条款</a>
                            </div>
                    </div>
                    <div class="pay_btn">
                        <el-button type="primary" @click="Open" class="btn">点击支付

                        </el-button>
                    </div>
                </div>
            </div>
            
            
        </div>
    </div>
</div>
</template>
<script>
import axios from 'axios';
import ElementUI from 'element-ui';
export default {
    data() {
        return {
            individual : {},
            PayMethod: '微信',
            PayMoney: '100',
            PayUrl: require('../assets/imgs/收款码.jpg'),
        }
    },
    mounted: function() {
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
  }) },
    methods: {
        Open: function () {
            this.$alert('<strong><img src='+ this.PayUrl + ' width=350px height=400px">','请扫描下方二维码进行支付：', {
                dangerouslyUseHTMLString: true,
                confirmButtonText: '已完成支付',
                cancelButtonText: '取消支付',
                center: true,
                callback: action => {
                    if (action=='confirm')
                    {
                        this.$message({
                            type: 'success',
                            message: '操作成功，请等待收款审核！',
                        })
                        this.$router.push('/individual')
                    }
                    if (action=='cancel')
                    {
                        this.$message({
                            type: 'info',
                            message: '您已取消支付！',
                        })
                    }
                }
            });
        }
    }
}
</script>
<style scoped>
@import '../assets/css/pay.css';
</style>