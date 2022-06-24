<template>
  <div class="contatiner page-index">
    <!-- 导航栏 -->
    <div id="header" class="header" :class="{ blur: left_show }">
      <div class="logo">
        <!-- <b>LOGO</b> -->
        <img
          src="@/static/newImg/logo.c9ddff00.png"
          @click="
            $router.replace({
              name: 'content',
            })
          "
          alt=""
        />
      </div>
      <div class="right">
        <div class="address" :style="{ fontSize: '13px' }">
          {{ ads | filterads }}
        </div>
        <img
          @click="show_leftmenu"
          src="@/static/img/menu.png"
          class="menu"
          alt=""
        />
      </div>

      <!-- 左侧弹出层 -->
      <van-popup
        v-model="left_show"
        position="left"
        get-container="body"
        class="menu-popup"
        :style="{ width: '70%', height: '100%' }"
      >
        <div class="menu-popup-content">
          <div class="top">
            <img src="@/static/newImg/logo.c9ddff00.png" class="logo1" alt="" />
            <img
              src="../../static/img/cancel.png"
              @click="cancel_gb"
              class="cancel"
              alt=""
            />
          </div>
          <div class="popup-address">
            {{ ads | filterads }}
            <img
              src="../../static/img/copy.png"
              @click="copyContent(ads, '钱包地址复制成功')"
              alt=""
            />
          </div>
          <div class="list">
            <div class="van-cell" @click="handle_router('content')">
              <div class="van-cell__title">
                <div>首页</div>
              </div>
              <img src="../../static/img/xz.png" alt="" />
            </div>
            <div class="van-cell" @click="handle_router('store')">
              <div class="van-cell__title">
                <div>NFT</div>
              </div>
              <img src="../../static/img/xz.png" alt="" />
            </div>
            <div class="van-cell" @click="handle_router('NFTBackPack')">
              <div class="van-cell__title">
                <div>NFT 背包</div>
              </div>
              <img src="../../static/img/xz.png" alt="" />
            </div>
            <div class="van-cell" @click="handle_router('PersonalInformation')">
              <div class="van-cell__title">
                <div>个人信息</div>
              </div>
              <img src="../../static/img/xz.png" alt="" />
            </div>
            <div class="van-cell" @click="handle_router('HowToPlay')">
              <div class="van-cell__title">
                <div>玩法介绍</div>
              </div>
              <img src="../../static/img/xz.png" alt="" />
            </div>
            <div class="van-cell" @click="pushHttp">
              <div class="van-cell__title">
                <div>区块链游览器</div>
              </div>
              <img src="../../static/img/xz.png" alt="" />
            </div>
          </div>

          <van-popover
            v-model="showPopover"
            trigger="click"
            :actions="selectLangs"
            @select="handle_lang"
          >
            <template #reference>
              <van-button class="lang-bg">
                {{ default_lang }}
                <img src="../../static/img/xz.png" alt="" class="icon-bottom" />
              </van-button>
            </template>
          </van-popover>
        </div>
      </van-popup>
    </div>
    <router-view :class="{ blur: left_show }"> </router-view>
  </div>
</template>

<script>
import PubSub from "pubsub-js";

export default {
  name: "home-index",
  data() {
    return {
      showPopover: false,
      default_lang: "简体中文",
      selectLangs: [
        { text: "简体中文", lang: "zh" },
        { text: "English", lang: "en" },
      ],
      left_show: false,
      ads: localStorage.getItem("myaddress") || "",
    };
  },
  created() {
    PubSub.subscribe("setads", () => {
      this.ads = localStorage.getItem("myaddress");
    });
  },
  methods: {
    handle_lang(lang) {
      console.log(lang.text);
      console.log(lang.lang);
      this.default_lang = lang.text
      this.$i18n.locale = lang.lang || 'zh'
      localStorage.setItem("lang", lang.lang )
    },
    cancel_gb() {
      this.left_show = false;
    },
    show_leftmenu() {
      this.left_show = true;
    },
    pushHttp() {
      window.location.href = "https://tronscan.io/";
    },
    handle_router(path) {
      this.left_show = false;
      this.$router.push({
        name: path,
      });
    },
  },
  filters: {
    filterads(val) {
      if (!val) {
        return "";
      }
      let startMyAddress = val?.substr(0, 8);
      let midMyAddress = ".".repeat(3);
      let endMyAddress = val?.substr(-8, 8);
      return startMyAddress + midMyAddress + endMyAddress;
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

.contatiner {
  max-width: 100vw !important;
}

.page-index {
  text-align: center;
  background: #000;
  position: relative;
  display: inline-block;
  width: 10rem;
  height: 53.33333rem;
  background-image: url(../../static/img/home-bg.e97fca59.png) !important;
  background-size: 100% 100%;
  height: auto;
}
.menu-popup {
  text-align: center;
}

.logo {
  b {
    color: #999;
  }
}

::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}





</style>
