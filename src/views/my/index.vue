<template>
  <div class="page-content">
    <div class="cn">
      <img class="img" src="../../static/newImg/888.jpg" alt="" />
      <p class="txt">
        <!-- SLT1N -->
      </p>
    </div>

    <div class="newBlock">
      <div class="swiper-top">
        <van-swipe
          class="my-swipe-1"
          width="100vw"
          :autoplay="3000"
          indicator-color="white"
        >
          <van-swipe-item>
            <img class="img" src="../../static/newImg/l01.png" alt="" />
          </van-swipe-item>
          <van-swipe-item>
            <img class="img" src="../../static/newImg/l02.png" alt="" />
          </van-swipe-item>
          <van-swipe-item>
            <img class="img" src="../../static/newImg/l03.png" alt="" />
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>

    <div class="black-1">
      <div class="title">{{ $t("home_top.brief") }}</div>
      <div class="desc" :style="{ width: '7rem' }">
        {{ $t("home_top.briefcontent") }}
      </div>
      <div class="price">
        <img
          src="@/static/newImg/logo.c9ddff00.png"
          :style="{ marginTop: '35px' }"
          alt=""
        />
        <div class="key" :style="{ marginTop: '35px' }">
          {{ $t("home_top.homeT_price") }}
        </div>
        <div class="val" :style="{ marginTop: '35px' }">
          $ {{ Curslt1n_price }}
        </div>
      </div>
    </div>

    <div class="black-2">
      <div class="key">NFT</div>
      <van-swipe
        class="my-swipe my-swipe-1"
        width="100vw"
        :show-indicators="false"
        :autoplay="3000"
        indicator-color="white"
      >
        <van-swipe-item v-for="(item, i) in dataList" :key="i">
          <img class="img img-2" :src="item.img_url" alt="" />
          <section class="sec">
            <p>{{ $t("home_top.earnings", { type: item.content }) }}</p>
            <p>{{ $t("home_top.data", { type: item.data }) }}</p>
          </section>
          <div class="btn-swipe" @click="show_buy(++i)">
            {{ $t("home_top.homeBto_participate") }}
          </div>
        </van-swipe-item>
      </van-swipe>
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
                v-model="inputVal"
                placeholder="请输入数量"
                class="van-field__control"
              />
              <div class="van-field__button">U</div>
            </div>
          </div>
        </div>
        <div class="row-1">
          <div class="key">预计扣除</div>
          <div class="val">{{ card_price }} SLT1N</div>
        </div>
        <div class="btn-1" @click="handle_toast">确定</div>
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

    <div class="about">
      <div class="about-title">CONTACT US</div>
      <div class="about-row">
        <img src="../../static/img/ab1.png" alt="" />
        <img src="../../static/img/ab2.png" alt="" />
        <img src="../../static/img/ab3.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import { loadweb3 } from "@/utils/web3";
import {
  Reconstruction_getTrxBalance,
  SendUSDT,
  SendSLT1N,
  Reconstruction_verifyUSDT,
  Reconstruction_verifySLT1N
} from "@/utils/web3";

import { UserReg, LoginMes,CheckNft,BuyNFT } from "@/api/trxRequest";

import { setLocalstorage } from "@/utils/utils";
import { getItem } from "@/utils/storage";

export default {
  name: "my-home",
  async created() {
    await loadweb3(this.init);
  },
  data() {
    return {
      Curslt1n_price: getItem("slt1n_price") || "0.8", //当前货币价格
      curLang: getItem("lang") || "en", //当前语言类型
      invite_ipt_show: false,  // 用户注册 邀请码 input
      invite_ipt: "", // 钱包邀请码地址
      inputVal: "",  // 当前购买 U 的数量
      activeIndex: "", // 当前激活的 卡牌序号
      show: false, // 购买卡牌 弹窗显示
      uid: undefined,
      card_price: "", // 当前的价格
      code: "",  // 邀请码 code
      dataList: [
        {
          content: "一星级 50 U",
          data: "日收益 2%",
          img_url: require("../../static/newImg/card-1.png"),
        },
        {
          content: "二星级 100 U",
          data: "日收益 3%",
          img_url: require("../../static/newImg/card-2.png"),
        },
        {
          content: "三星级 300 U",
          data: "日收益 4%",
          img_url: require("../../static/newImg/card-3.png"),
        },
        {
          content: "四星级 1000 U",
          data: "日收益 5%",
          img_url: require("../../static/newImg/card-4.png"),
        },
        {
          content: "五星级 5000 U",
          data: "日收益 6%",
          img_url: require("../../static/newImg/card-5.png"),
        },
        {
          content: "六星级 10000 U",
          data: "日收益 7%",
          img_url: require("../../static/newImg/card-6.png"),
        },
        {
          content: "七星级 50000 U",
          data: "日收益 8%",
          img_url: require("../../static/newImg/card-7.png"),
        },
      ],
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
    async show_buy(num_i) {
      this.inputVal = "";
      const uid = localStorage.getItem("uid");
      if (!uid || uid === "0") {
        this.ok_invite();
        return false;
      }
      this.activeIndex = num_i;
      this.hadle_active(num_i);
      console.log(num_i);

      const my_vip = getItem("vip");

      if (my_vip + 1 === num_i) {
        this.show = true;
      } else if (my_vip + 1 < num_i) {
        this.$toast.error("不能越级购买 NFT 卡牌！");
        return false
      } else {
        const { data } = await CheckNft(num_i);
        if (data.State === "0") {
          this.show = true;
        } else {
          this.$toast.error("当前 NFT卡牌 未释放玩");
        }
      }
    },
    async handle_toast() {

       if ([1, 7].includes(this.activeIndex)) {
        console.log(" 1 7");
        try {
          await Reconstruction_getTrxBalance();
          await Reconstruction_verifyUSDT(this.inputVal);
          await SendUSDT(this.inputVal);
          await BuyNFT(this.inputVal);

          const { data } = await LoginMes({
            uid: localStorage.getItem("uid"),
            sign: localStorage.getItem("mysign"),
          });
          setLocalstorage(data);
          this.$toast.success("购买成功");
          localStorage.setItem("vip", this.activeIndex);
        } catch (err) {
          this.$toast.error(err);
          console.warn(err);
        }
      } else if ([2, 3, 4, 5, 6].includes(this.activeIndex)) {
        console.log("先执行 stl1N 转账");
        try {
          await Reconstruction_getTrxBalance();
          await Reconstruction_verifySLT1N(this.card_price);
          await Reconstruction_verifyUSDT(this.inputVal);
          await SendSLT1N(this.card_price);
          await SendUSDT(this.inputVal);
          await BuyNFT(this.inputVal);

          const { data } = await LoginMes({
            uid: localStorage.getItem("uid"),
            sign: localStorage.getItem("mysign"),
          });
          setLocalstorage(data);
          this.$toast.success("购买成功");
          localStorage.setItem("vip", this.activeIndex);
        } catch (err) {
          this.$toast.error(err);
          console.warn(err);
        }
      }
      this.show = false;


    },
    async init() {
      this.code = this.$route.query?.pid || "";
      const sign = localStorage.getItem("mysign");
      if (!localStorage.getItem("uid") || localStorage.getItem("myaddress")) {
        UserReg({
          wallet: localStorage.getItem("myaddress") || "",
          code: this.code,
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
            console.log("当前用户 uid", localStorage.getItem("uid"));
            const { data } = await LoginMes({
              uid: localStorage.getItem("uid"),
              sign: localStorage.getItem("mysign"),
            });
            setLocalstorage(data);
            console.log("data", data);
          })
          .catch((err) => {
            console.warn(err);
          });
      } else {
        LoginMes({
          uid: localStorage.getItem("uid"),
          sign: localStorage.getItem("mysign"),
        }).then((data) => {
          setLocalstorage(data.data);
        });
      }
    },
    hadle_active(num) {
      switch (num) {
        case 1: {
          this.inputVal = 50;
          this.card_price = 0;
          break;
        }
        case 2: {
          this.inputVal = 100 * 0.9;
          this.card_price = ((100 * 0.1) / getItem("slt1n_price")).toFixed(6);
          break;
        }
        case 3: {
          this.inputVal = 300 * 0.8;
          this.card_price = ((300 * 0.2) / getItem("slt1n_price")).toFixed(6);
          break;
        }
        case 4: {
          this.inputVal = 1000 * 0.7;
          this.card_price = ((1000 * 0.3) / getItem("slt1n_price")).toFixed(6);
          break;
        }
        case 5: {
          this.inputVal = 5000 * 0.6;
          this.card_price = ((5000 * 0.4) / getItem("slt1n_price")).toFixed(6);
          break;
        }
        case 6: {
          this.inputVal = 10000 * 0.5;
          this.card_price = ((10000 * 0.5) / getItem("slt1n_price")).toFixed(6);
          break;
        }
        case 7: {
          this.inputVal = 50000;
          this.card_price = 0;
          break;
        }
      }
    },
  },
};
</script>

<style scoped lang="less">
@import url("../../static/css/01.css");
@import url("../../static/css/02.css");
@import url("../../static/css/03.css");
@import url("../../static/css/04.css");
@import url("../../static/css/app.css");

@base_size: 415px;

.newBlock {
  position: relative;
  width: 100vw;
}
.swiper-top {
  position: absolute;
  width: 100vw;
  left: 0;
  top: -335px;
  .img {
    margin-bottom: 20px;
  }
}

.sec {
  font-size: 0.5rem;
  position: absolute;
  bottom: 25%;
  left: 50%;
  color: #4c1a0b;
  line-height: 80px;
  transform: translateX(-50%);
}

.img {
  width: 100vw;
}
.img-2 {
  margin-bottom: 25px;
}
.cn {
  position: relative;
  .img {
    width: 100vw;
  }
}
.txt {
  font-family: "Microsoft YaHei";
  color: rgb(245, 218, 141);
  background-color: #000;
  position: absolute;
  left: 0;
  top: 0;
}

.price {
  height: 300px;
  line-height: 300px;
  width: 100%;
  background-image: url(../../static/newImg/a-3.png);
  background-size: cover;
  margin-top: 8.01333rem !important;
}
.blank-2 {
  margin-top: 1.18667rem !important;
}

.my-dialog {
  display: inline-block;
  width: 10rem;
  height: 8.13333rem;
  background-image: url(../../static/img/dialog-bg.ee98ca4a.png);
  background-size: 100% 100%;
}
.my-dialog .title {
  font-size: 0.45333rem;
  font-family: Source Han Serif CN-Heavy, Source Han Serif CN;
  font-weight: 800;
  color: #ffd153;
  margin-top: 1.04rem;
}
.my-dialog .cancel {
  width: 1.22667rem;
  position: absolute;
  top: 0;
  right: 0.53333rem;
}
.my-dialog .input-1 {
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
.my-dialog .input-1 .van-field__control {
  color: #fff2e1;
}
.my-dialog .input-1 .van-field__button {
  color: #fbc407;
  font-weight: 800;
}
.my-dialog .row-1 {
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
.my-dialog .btn-1 {
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

::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
</style>
