<template>
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
                                <h3>支付条款</h3>
                            </div>
                            <div class="pay__contract_content">
                                {{PayContract}}
                            </div>
                    </div>
                    <el-button type="primary" @click="Open">点击支付</el-button>  
</template>
<script>
export default {
    data() {
        return {
            PayMethod: '微信',
            PayMoney: '100',
            PayContract: 'XXXXXXX',
            PayUrl: '',
        }
    },
    methods: {
        Open: function () {
            this.$alert('<strong><img src='+ PayUrl + 'width=100px height=100px>','请扫描下方二维码进行支付：', {
                dangerouslyUseHTMLString: true,
                confirmButtonText: '已完成支付',
                cancelButtonText: '取消支付',
                callback: action => {
                    this.$router.push('/paySuccess');
                }
            });
        }
    }
}
</script>