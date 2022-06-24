<template>
  <div class="page-store" :style="{ top: dynamicHeight }">
    <div class="page-content">
      <div class="row-1">
        <div class="item">
          NFT 交易市场
          <p>Company profile</p>
        </div>
        <div class="item" v-for='(item,i) in dataList' :key='i'>
          <img
            :src='item.img_url'
            alt
            class="card"
          />
          <div class="price">{{item.content}}</div>
          <div class="btn-1" @click="show_buy(++i)">购买</div>
        </div>
      </div>
    </div>

    <van-dialog
      class="my-dialog"
      :closeOnClickOverlay="true"
      :showConfirmButton="false"
      v-model="show"
    >
      <template>
        <div class="title">获得NFT</div>
        <div class="input-1 van-cell van-field">
          <div class="van-cell__value van-cell__value--alone van-field__value">
            <div class="van-field__body">
              <input
                type="text"
                readonly
                v-model="value"
                placeholder="请输入数量"
                class="van-field__control"
              />
              <div class="van-field__button">U</div>
            </div>
          </div>
        </div>
        <div class="row-1">
          <div class="key">预计扣除</div>
          <div class="val">0.00 SLT1N</div>
        </div>
        <div class="btn-1" @click="handle_toast()">确定</div>
      </template>
    </van-dialog>

    <van-dialog
      class="my-dialog"
      :closeOnClickOverlay="true"
      :showConfirmButton="false"
      v-model="invite_ipt_show"
    >
      <template>
        <div class="title">邀请码</div>
        <div class="input-1 van-cell van-field">
          <div class="van-cell__value van-cell__value--alone van-field__value">
            <div class="van-field__body">
              <input
                type="text"
                v-model="invite_ipt"
                placeholder="请输入钱包邀请码地址"
                class="van-field__control"
              />
            </div>
          </div>
        </div>
        <div class="btn-1" @click="ok_invite">确定</div>
      </template>
    </van-dialog>
    
  </div>
</template>

<script>


import { Reconstruction_getTrxBalance,SendUSDT,Reconstruction_verifyUSDT } from "@/utils/web3"

import { UserReg, LoginMes } from "@/api/trxRequest";

import { setLocalstorage } from "@/utils/utils";

export default {
  name: "store-page-content",
  data() {  
    return {
      invite_ipt_show:false,
      invite_ipt:"",
      dynamicHeight: "0px",
      show: false,
      value:undefined,
      active_Item:undefined,
      dataList:[{
        content:'日收益 2%',
        img_url:require("../../static/newImg/card-1.png")
      },{
        content:'日收益 3%',
        img_url:require("../../static/newImg/card-2.png")
      },{
        content:'日收益 4%',
        img_url:require("../../static/newImg/card-3.png")
      },{
        content:'日收益 5%',
        img_url:require("../../static/newImg/card-4.png")
      },{
        content:'日收益 6%',
        img_url:require("../../static/newImg/card-5.png")
      },{
        content:'日收益 7%',
        img_url:require("../../static/newImg/card-6.png")
      },{
        content:'日收益 8%',
        img_url:require("../../static/newImg/card-7.png")
      },]
    };
  },
  methods: {
     ok_invite() {
      const sign = localStorage.getItem("mysign");
      console.log(sign);
      UserReg({
        wallet: localStorage.getItem("myaddress") || "",
        code: this.invite_ipt,
        sign: sign,
      })
        .then(async (res) => {
          const uid = res.data.State;
          localStorage.setItem("uid", uid);
          if (!uid || uid === "0") {
            this.$toast.error("请输入钱包邀请码");
            this.invite_ipt_show = true;
            return false;
          }
          console.log(localStorage.getItem("uid"));
          const { data } = await LoginMes({
            uid: localStorage.getItem("uid"),
            sign: localStorage.getItem("mysign"),
          });
          setLocalstorage(data);
        })
        .catch((err) => {
          console.warn(err);
        });
      this.invite_ipt_show = false;
    },
    show_buy(active) {
      this.value = ''
      const uid = localStorage.getItem("uid");
      if (!uid || uid === "0") {
          this.$toast.error('请输入钱包邀请码进行注册')
        this.invite_ipt_show = true
          return false
      }
      if(active ===1){
        this.value = 50
      }
      this.active_Item = active
      this.show = true;
    },
    async handle_toast(){
      if( this.active_Item!==1){
         this.$toast.clear()
        this.$toast.error('等待合约生成中....')
        return false
      }
      const isVip = localStorage.getItem("vip")
      if(isVip==='0'){
         console.log('继续购买')
         try{
            await Reconstruction_getTrxBalance()
            await Reconstruction_verifyUSDT(this.value)
            SendUSDT(this.value)
            this.$toast.success("购买成功")
            localStorage.setItem('vip','1')
         }catch(err){
          this.$toast.error(err)
          console.warn(err);
         }
      }else{
         this.$toast.warning('请勿重复购买')
      }
      this.show = false;
    }
  },
  
};
</script>

<style lang="less" scoped>

.page-store{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow-y: auto;
}
.page-content {
    padding-top: 4.2rem;
}

.page-store .my-dialog {
  display: inline-block;
  width: 10rem;
  height: 8.13333rem;
  background-image: url(../../static/img/dialog-bg.ee98ca4a.png);
  background-size: 100% 100%;
}
.page-store .my-dialog .title {
  font-size: 0.45333rem;
  font-family: Source Han Serif CN-Heavy, Source Han Serif CN;
  font-weight: 800;
  color: #ffd153;
  margin-top: 1.04rem;
}
.page-store .my-dialog .cancel {
  width: 1.22667rem;
  position: absolute;
  top: 0;
  right: 0.53333rem;
}
.page-store .my-dialog .input-1 {
  width: 6rem;
  height: 1.2rem;
  background: -webkit-linear-gradient(top, #382b27, #47342d);
  background: linear-gradient(180deg, #382b27, #47342d);
  border-radius: 0.13333rem 0.13333rem 0.13333rem 0.13333rem;
  opacity: 1;
  border: 0.02667rem solid #ffd153;
  margin: 0 auto;
  margin-top: 0.93333rem;
  font-size: 0.37333rem;
  font-family: Source Han Serif SC-Regular, Source Han Serif SC;
  font-weight: 400;
  color: #fff2e1;
}
.page-store .my-dialog .input-1 .van-field__control {
  color: #fff2e1;
}
.page-store .my-dialog .input-1 .van-field__button {
  color: #fbc407;
  font-weight: 800;
}

.page-store .my-dialog .row-1 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  margin: 0 1.86667rem;
  margin-top: 0.50667rem;
  font-size: 0.37333rem;
  font-family: Source Han Serif SC-Bold, Source Han Serif SC;
  font-weight: 700;
  color: #fff2e1;
}
.page-store .my-dialog .btn-1 {
  display: inline-block;
  width: 4.50667rem;
  height: 1.22667rem;
  background-image: url(../../static/img/btn.a950811b.png);
  background-size: 100% 100%;
  margin-top: 0.8rem;
  line-height: 1.22667rem;
  font-size: 0.42667rem;
  font-family: Source Han Serif CN-Heavy, Source Han Serif CN;
  font-weight: 800;
  color: #fff2e1;
}

.page-store {
  min-height: 100vh;
  background: #000;
  text-align: center;
  padding-bottom: 0.96rem;
  display: inline-block;
  width: 10rem;
  height: 36.69333rem;
  background-image: url(../../static/img/store-bg.5b0799bc.png);
  background-size: 100% 100%;
  height: auto;
  .title-1 {
    width: 4.8rem;
    font-size: 0.72rem;
    font-family: Source Han Serif CN-Heavy, Source Han Serif CN;
    font-weight: 800;
    color: #400700;
    line-height: 1.01333rem;
    text-align: left;
    padding-left: 0.4rem;
    -webkit-text-fill-color: #581e04;
    margin-top: 1.04rem;
  }
  .desc-1 {
    font-size: 0.37333rem;
    font-family: Source Han Serif CN-Bold, Source Han Serif CN;
    font-weight: 700;
    color: #581e04;
    text-align: left;
    padding-left: 0.4rem;
    margin: 0;
    margin-top: 0.18667rem;
    margin-bottom: 0px !important;
    -webkit-text-fill-color: #581e04;
  }
  
  .row-1 {
    margin-bottom: 0.85333rem;
    padding: 0 0.4rem;
    display: grid;
    grid-template-columns: 1fr 1fr !important;
    grid-template-rows: auto;
    display: grid;
    grid-gap: 1rem 0.4rem;
    align-items: center;

    .item:first-child {
      grid-row: 1/2 !important;
      grid-column: 1/3 !important;
      font-family: "Courier New", Courier, monospace;
      color: #581e04;
      font-size: 1rem;
      margin-top: 30px;
      height: 1.7rem;
    }

    .item {
      justify-self: center;
      text-align: center;
      position: relative;
      img {
        width: 4.4rem;
        // clip-path: circle(36% at 50% 42%);
      }
      height: 7.22667rem;
      .card {
        width: 4.4rem;
      }
      .price {
        display: inline-block;
        width: 4rem;
        height: 1rem rem;
        margin: 0 auto;
        text-indent: 15px;
        background-image: url(../../static/img/store-card-price-bg.8d22d295.png);
        background-size: 100% 100%;
        line-height: 1rem;
        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);
        bottom: 8%;
        font-size: 0.26667rem;
        font-family: Source Han Serif CN-Bold, Source Han Serif CN;
        font-weight: 700;
        color: #fff2e1;
      }
      .btn-1 {
        display: inline-block;
        width: 3.46667rem;
        height: 0.93333rem;
        background-image: url(../../static/img/me-block-3-btn.ab34d4bc.png);
        background-size: 100% 100%;
        display: block;
        margin: 0 auto;
        text-align: center;
        line-height: 0.93333rem;
        font-size: 0.37333rem;
        font-family: Source Han Serif CN-Heavy, Source Han Serif CN;
        font-weight: 800;
        color: #fff2e1;
        position: absolute;
        left: 0.48rem;
        top: 6.8rem;
      }
    }
  }
}




</style>

<style >
::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
  
</style>






































































</style>
