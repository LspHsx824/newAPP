<template>
  <div class="page-me" :style="{ top: dynamicHeight }">
    <div class="black-1">
      <img src="../../static/newImg/logo.c9ddff00.png" alt="" class="logo" />
      <div class="title" :style="{ color: '#f5da8d' }">我的资产</div>
      <div class="row-1">
        <div class="left">
          <img
            width="43px"
            height="44px"
            src="../../static/newImg/b-1.png"
            alt=""
          />
          SLT1N
        </div>
        <div class="right top">
          0
          <div style="font-size: 0.4rem; margin-left: -20px">≈ 0 $</div>
        </div>
      </div>
      <div class="btn-1" @click="handle_money">提现</div>
    </div>

    <div class="black-2">
      <div class="row-2">
        <div class="item">
          <div class="key">直推数量</div>
          <div class="val">{{ num }}</div>
        </div>
        <div class="item">
          <div class="key">社区成员</div>
          <div class="val">{{ teams }}</div>
        </div>
        <div class="item">
          <div class="key">个人业绩</div>
          <div class="val">${{ personal_ahmt }}</div>
        </div>
        <div class="item">
          <div class="key">社区业绩</div>
          <div class="val">${{ community_ahmt }}</div>
        </div>
      </div>
    </div>
    <div class="black-3">
      <div class="title">邀请好友</div>
      <div class="key">邀请连接</div>
      <div class="val">{{ url }}</div>
      <div class="btn-1" @click="handle_copy(url)">一键复制</div>
    </div>

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
import { Toast } from "vant";

import { loadweb3 } from "@/utils/web3";
import { UserReg, LoginMes } from "@/api/trxRequest";
import { setLocalstorage } from "@/utils/utils";
import { getItem } from "@/utils/storage";

import PubSub from "pubsub-js"


export default {
  name: "PersonalInformation",
  data() {
    return {
      invite_ipt: "",
      invite_ipt_show: false,
      url: "",
      dynamicHeight: "71px",
      code: "",
      num: getItem("ztrs"),
      teams: getItem("teams"),
      personal_ahmt: getItem("usdt"),
      community_ahmt: getItem("teams_usdt"),
    };
  },
  async created() {
    //  localStorage.
    this.$nextTick(() => {
      this.dynamicHeight =
        document.getElementById("header").getBoundingClientRect().height + "px";
    });
    const uid = localStorage.getItem("uid");
    const ads = localStorage.getItem("myaddress");
    await loadweb3(this.init);
    this.url = `${window.location.origin}/#/index/content?pid=${ads}`;
    console.log(`${window.location.origin}/#/index/content?pid=${ads}`);

    PubSub.subscribe("setData", (uid) => {
       this.init_localStore()
    });
  },
  methods: {
    handle_copy(val) {
      this.$copyText(val)
        .then(() => {
          Toast("复制成功");
        })
        .catch(() => {
          Toast("复制失败");
        });
    },
    handle_money() {
      this.$toast.error("功能暂未开放，合约生成中。。");
    },
    async init() {
      this.code = this.$route.query?.pid || "";
      const sign = localStorage.getItem("mysign");
      if (!localStorage.getItem("uid") && localStorage.getItem("myaddress")) {
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
            const { data } = await LoginMes({
              uid: localStorage.getItem("uid"),
              sign: localStorage.getItem("mysign"),
            });
            setLocalstorage(data);
            this.init_localStore();
          })
          .catch((err) => {
            console.warn(err);
          });
      } else {
        LoginMes({
          uid: localStorage.getItem("uid"),
          sign: localStorage.getItem("mysign"),
        }).then((data) => {
          setLocalstorage(data);
          this.init_localStore();
        });
      }
    },
    ok_invite() {
      const sign = localStorage.getItem("mysign");
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
          const { data } = await LoginMes({
            uid: localStorage.getItem("uid"),
            sign: localStorage.getItem("mysign"),
          });
          setLocalstorage(data);
          this.init_localStore();
        })
        .catch((err) => {
          console.warn(err);
           this.init_localStore();
        });

       this.init_localStore();
      this.invite_ipt_show = false;
    },
    init_localStore() {
      this.num = getItem("ztrs");
      this.teams = getItem("teams");
      this.personal_ahmt = getItem("usdt");
      this.community_ahmt = getItem("teams_usdt");
    },
  },
};
</script>

<style lang="less" scoped>
.page-me {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  padding-bottom: 1.3rem;
  overflow-y: auto;
  text-align: center;
  background-image: url(../../static/img/me-bg.3fdd1fc3.png);
}

.page-me .black-1 {
  height: 12.32rem !important;
  background-image: url(../../static/img/me-black-1.eff7a093.png) !important;
}

.page-me,
.page-me .black-1 {
  display: inline-block;
  width: 100vw !important;
  background-size: 100% 100%;
}

.page-me .black-1 .logo {
  width: 1.28rem;
  display: block;
  margin: 0 auto;
  margin-top: 3.12rem;
}

.page-me .black-1 .title {
  font-size: 0.45333rem;
  font-family: Source Han Serif CN-Heavy, Source Han Serif CN;
  font-weight: 800;
  color: #fff2e1;
  margin-top: 0.93333rem;
}

.page-me .black-1 .row-1,
.page-me .black-1 .row-1 .left {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  font-size: 0.45333rem;
  font-family: PingFang SC;
  font-weight: 800;
  color: #e3c776;
}

.page-me .black-1 .row-1 {
  color: rgb(227, 199, 118);
  margin: 0 auto;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  margin-top: 0.66667rem;
  padding: 0 1.92rem;
}

.page-me .black-1 .btn-1 {
  display: inline-block;
  width: 4.08rem;
  height: 1.12rem;
  background-image: url(../../static/img/me-block-1-btn.17b38296.png);
  background-size: 100% 100%;
  line-height: 1.12rem;
  font-size: 0.42667rem;
  font-family: Source Han Serif CN-Heavy, Source Han Serif CN;
  font-weight: 800;
  color: #fff2e1;
  margin-top: 1.12rem;
}

/*22*/
.page-me .black-2 {
  width: 10rem;
  max-width: 100vw !important;
  height: 7.2rem;
  background-image: url(../../static/img/me-black-2.41f0d415.png);
}

.page-me .black-2,
.page-me .black-3 .btn-1 {
  display: inline-block;
  background-size: 100% 100%;
}

.page-me .black-2 .row-2 {
  width: 7.25333rem;
  max-width: 100vw !important;
  margin: 2.02667rem auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 0.4rem;
}

.page-me .black-2 .row-2 .item {
  display: inline-block;
  width: 3.33333rem;
  text-align: center;
  height: 1.84rem;
  background-image: url(data:image/png;base64,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);
  background-size: 100% 100%;
}

.page-me .black-2 .key {
  display: inline-block;
  width: 5.70667rem;
  height: 0.90667rem;
  background-image: none;
  background-size: 100% 100%;
  line-height: 0.5rem !important;
  margin-top: 3.78667rem;
  font-size: 0.48rem;
  font-family: Source Han Serif CN-Heavy, Source Han Serif CN;
  font-weight: 800;
  color: #ffd153;
}

.page-me .black-2 .row-2 .item .key,
.page-me .black-2 .row-2 .item .val {
  font-family: Source Han Serif CN-Bold, Source Han Serif CN;
  font-weight: 700;
  color: #fff2e1;
}

.page-me .black-2 .row-2 .item .key {
  width: 3.5rem;
  word-wrap: break-word;
  font-size: 0.34667rem;
  margin-top: 0.29333rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.page-me .black-2 .row-2 .item .val {
  font-size: 0.4rem;
  /* margin-top: 0.13333rem; */
}

/*33*/
.page-me .black-3,
.page-me .black-3 .title {
  display: inline-block;
  background-size: 100% 100%;
}

.page-me .black-3 {
  height: 9.44rem;
  background-image: url(../../static/img/me-black-3.f4da2f59.png);
  margin-top: 1.09333rem;
}

.page-me .black-3 .title {
  width: 5.70667rem;
  height: 0.90667rem;
  background-image: url(../../static/img/home-black-2-title.1bdf75b8.png);
  line-height: 0.90667rem;
  margin-top: 0.98667rem;
  font-size: 0.48rem;
  font-family: Source Han Serif CN-Heavy, Source Han Serif CN;
  font-weight: 800;
  color: #fff2e1;
}

.page-me .black-3,
.page-me .black-3 .title {
  display: inline-block;
  background-size: 100% 100%;
}

.page-me .black-3 .key,
.page-me .black-3 .val {
  font-size: 24px;
  font-weight: 800;
  color: #e3c776;
  background: -webkit-linear-gradient(
    bottom,
    #c59732,
    #f5db8e 40.9668%,
    #cfa849 74.80469%,
    #eeca7d
  );
  background: linear-gradient(
    0deg,
    #c59732,
    #f5db8e 40.9668%,
    #cfa849 74.80469%,
    #eeca7d
  );
  padding: 0 35px;
  -webkit-background-clip: text;
  word-wrap: break-word;
  -webkit-text-fill-color: transparent;
}

.page-me .black-3 .key {
  font-size: 0.48rem;
  margin-top: 2.29333rem;
}

.page-me .black-3 .val {
  margin: 0.72rem auto;
  height: 1.6rem;
  font-size: 0.64rem;
  font-family: PingFang SC;
}

.page-me .black-3 .key,
.page-me .black-3 .val {
  font-weight: 800;
  color: #e3c776;
  background: -webkit-linear-gradient(
    bottom,
    #c59732,
    #f5db8e 40.9668%,
    #cfa849 74.80469%,
    #eeca7d
  );
  background: linear-gradient(
    0deg,
    #c59732,
    #f5db8e 40.9668%,
    #cfa849 74.80469%,
    #eeca7d
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.page-me .black-2,
.page-me .black-3 .btn-1 {
  display: inline-block;
  background-size: 100% 100%;
}

.page-me .black-3 .btn-1 {
  width: 4.08rem;
  height: 1.12rem;
  background-image: url(../../static/img/me-block-3-btn.ab34d4bc.png);
  line-height: 1.12rem;
  font-size: 0.42667rem;
  font-family: Source Han Serif CN-Heavy, Source Han Serif CN;
  font-weight: 800;
  color: #fff2e1;
  margin-top: 0.8rem;
}
</style>
