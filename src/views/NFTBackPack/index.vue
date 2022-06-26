<template>
  <div class="page-content page-mynft">
    <div class="title-1">View your NFT backpack</div>
    <div class="desc-1">Choose your exclusive NFT~</div>
    <div class="row-1">
      <div class="item" v-for="(item, i) in viod_List" :key="i">
        <template >
          <img :src="item.img_url" alt class="card" />
          <div class="price">{{ item.content }}</div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { getItem } from "@/utils/storage";
export default {
  name: "NFTBackPack",
  data() {
    return {
      isshow: false,
      card_viodL: getItem("vip"),
      dataList: [
        {
          content: "日收益 2%",
          img_url: require("../../static/newImg/card-1.png"),
        },
        {
          content: "日收益 3%",
          img_url: require("../../static/newImg/card-2.png"),
        },
        {
          content: "日收益 4%",
          img_url: require("../../static/newImg/card-3.png"),
        },
        {
          content: "日收益 5%",
          img_url: require("../../static/newImg/card-4.png"),
        },
        {
          content: "日收益 6%",
          img_url: require("../../static/newImg/card-5.png"),
        },
        {
          content: "日收益 7%",
          img_url: require("../../static/newImg/card-6.png"),
        },
        {
          content: "日收益 8%",
          img_url: require("../../static/newImg/card-7.png"),
        },
      ],
    };
  },
  computed:{
    viod_List(){
      return this.dataList.slice(0,this.card_viodL)
    }
  }
};
</script>
<style lang="less" scoped>
.page-mynft {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
  color: #fff;
  min-height: 100vh;
  text-align: center;
  background: #000;
  padding-bottom: 2.4rem;
  display: inline-block;
  background-image: url(../../static/img/store-bg.5b0799bc.png);
  background-size: 100% 100%;
  height: 100vw;
  .title-1 {
    width: 4.8rem;
    font-size: 0.72rem;
    font-family: Source Han Serif CN-Heavy, Source Han Serif CN;
    font-weight: 800;
    color: #400700 !important;
    line-height: 1.01333rem;
    text-align: left;
    padding-left: 0.4rem;
    margin-top: 1.04rem;
    -webkit-text-fill-color: #400700 !important;
  }
  .desc-1 {
    font-size: 0.37333rem;
    font-family: Source Han Serif CN-Bold, Source Han Serif CN;
    font-weight: 700;
    color: #581e04;
    text-align: left;
    padding-left: 0.4rem;
    margin-top: 0.18667rem;
    margin-bottom: 0;
    -webkit-text-fill-color: #400700 !important;
    margin: 0;
  }
  .row-1 {
    margin-top: 0.53333rem;
    margin-bottom: 0.85333rem;
    padding: 0 0.4rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 2.48rem 0.4rem;
  }
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

  .item {
    justify-self: center;
    text-align: center;
    position: relative;
    img {
      width: 4.4rem;
    }
    height: 7.22667rem;
    .card {
      width: 4.4rem;
    }
    .price {
      display: inline-block;
      width: 4rem;
      height: 1rem;
      margin: 0 auto;
      text-indent: 15px;
      background-image: url(../../static/img/store-card-price-bg.8d22d295.png);
      background-size: 100% 100%;
      line-height: 1rem;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      bottom: -5%;
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

</style>
