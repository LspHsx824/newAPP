<template>
  <div class="page-invite">
    <div class="page-content">
      <div class="black-1">
        <div class="title-1">SLT1N</div>
        <div class="desc-1">
          SLT1N 引领全球市商第一平台，打造高性能、高可 信、高安全的元宇宙空间
        </div>
      </div>
      <div class="black-2">
        <div class="title-1">卡牌收益</div>
        <div class="select">
          <div
            class="item"
            :class="{ active: isShow }"
            @click="switch_card(true)"
          >
            日收益
          </div>
          <div
            class="item"
            :class="{ active: !isShow }"
            @click="switch_card(false)"
          >
            加速收益
          </div>
        </div>
        <div class="list" v-if="isShow">
          <table>
            <tr>
              <td>游艇</td>
              <td>价格</td>
              <td>日收益</td>
            </tr>
            <tr>
              <td>一星级</td>
              <td>50U(100%U)</td>
              <td>2%</td>
            </tr>
            <tr>
              <td>二星级</td>
              <td>100U(90%U+10%SLT1N)</td>
              <td>3%</td>
            </tr>
            <tr>
              <td>三星级</td>
              <td>300U(80%U+20%SLT1N)</td>
              <td>4%</td>
            </tr>
            <tr>
              <td>四星级</td>
              <td>1000U(70%U+30%SLT1N)</td>
              <td>5%</td>
            </tr>
            <tr>
              <td>五星级</td>
              <td>5000U(60%U+40%SLT1N)</td>
              <td>6%</td>
            </tr>
            <tr>
              <td>六星级</td>
              <td>10000U(50%U+50%SLT1N)</td>
              <td>7%</td>
            </tr>
            <tr>
              <td>七星级</td>
              <td>50000U(100%SLT1N)</td>
              <td>8%</td>
            </tr>
          </table>
        </div>

        <div class="list list2" v-else>
          <table>
            <tr>
              <td>直接分享</td>
              <td>加速收益</td>
            </tr>
            <tr>
              <td>1人</td>
              <td>一代每日收益的10%</td>
            </tr>
            <tr>
              <td>2人</td>
              <td>二代每日收益的8%</td>
            </tr>
            <tr>
              <td>3人</td>
              <td>三代每日收益的5%</td>
            </tr>
            <tr>
              <td>4人</td>
              <td>四代每日收益的2%</td>
            </tr>
            <tr>
              <td>5人</td>
              <td>五代每日收益的1%</td>
            </tr>
            <tr>
              <td>6人</td>
              <td>六代每日收益的2%</td>
            </tr>
            <tr>
              <td>7人</td>
              <td>七代每日收益的3%</td>
            </tr>
             <tr>
              <td>8人</td>
              <td>七代每日收益的4%</td>
            </tr>
             <tr>
              <td>9人</td>
              <td>七代每日收益的5%</td>
            </tr>
          </table>
        </div>

        <div class="desc-1">
          <p>每三个小时释放一次，两倍出局</p>
          <br />
          <p>每个账户不能跨级购买卡牌</p>
        </div>
      </div>
      <div class="black-3">
        <div class="title-1">节点收益</div>
        <div class="card-1">
          <div class="key">
            <div class="span" :style="{ fontSize: '.4rem' }">初级节点</div>
            <p>奖励:网体所有收益5%</p>
          </div>
          <div class="val">要求:</div>
          <div class="val">
            <div>
              <span></span>&nbsp;&nbsp;1.个人达到三星级帆船
              <br />
              <span></span>&nbsp;&nbsp;2.直接分享10人
              <br />
              <span></span>&nbsp;&nbsp;3.团队70个有效账户
            </div>
          </div>
        </div>
        <div class="card-1 nocard1">
          <div class="key">
            <div class="span" :style="{ fontSize: '.4rem' }">中级节点</div>
            <p>奖励:网体所有收益7%</p>
          </div>
          <div class="val">要求:</div>
          <div class="val">
            <div>
              <span></span>&nbsp;&nbsp;1.个人达到四星级帆船
              <br />
              <span></span>&nbsp;&nbsp;2.直接分享20人
              <br />
              <span></span>&nbsp;&nbsp;3.团队300个有效账户
            </div>
          </div>
        </div>
        <div class="card-1 nocard2">
          <div class="key">
            <div class="span" :style="{ fontSize: '.4rem' }">高级节点</div>
            <p>奖励:网体所有收益9%</p>
          </div>
          <div class="val">要求:</div>
          <div class="val">
            <div>
              <span></span>&nbsp;&nbsp;1.个人达到五星级帆船
              <br />
              <span></span>&nbsp;&nbsp;2.直接分享30人
              <br />
              <span></span>&nbsp;&nbsp;3.团队700个有效账户
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HowToPlay",
  data() {
    return {
      isShow: true,
    };
  },
  methods: {
    switch_card(flg) {
      this.isShow = flg;
    },
  },
};
</script>

<style scoped>
.page-invite {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow-y: auto;
}
.page-invite .page-content {
  padding-top: 1.86667rem;
}

.page-content {
  padding-top: 1.84rem;
}

/*11*/
.page-invite .black-1 {
  margin-top: -0.13333rem;
  display: inline-block;
  width: 10rem;
  height: 11.48rem;
  background-image: url(../../static/newImg/invite-black-1.jpg);
  background-size: 100% 100%;
}

.page-invite .black-1 .title-1 {
  font-family: FZZhengHeiS-EB-GB;
  font-size: 0.85333rem;

  background: -webkit-linear-gradient(top, #f2da5c, #8e690f);
  background: linear-gradient(180deg, #f2da5c, #8e690f);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-top: 1.30667rem;
}

/*desc-1 //11*/
.page-invite .black-1 .desc-1 {
  width: 8.56rem;
  height: 1.22667rem;
  font-size: 0.4rem;
  background: -webkit-linear-gradient(top, #ffce7f, #facb50);
  background: linear-gradient(180deg, #ffce7f, #facb50);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 0.66667rem;
  margin: 0 auto;
  margin-top: 0.50667rem;
}

.page-invite .black-1 .title-2 {
  font-size: 0.48rem;
  font-family: Source Han Serif CN-Heavy, Source Han Serif CN;
  font-weight: 800;
  color: #583104;
  margin-top: 4.16rem;
}

.page-invite .black-1 .row-1 {
  margin-top: 0.66667rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  grid-row-gap: 0.4rem;
  text-align: left;
  padding: 0 0.4rem;
}

.page-invite .black-1 .row-1 .item {
  width: 4.26667rem;
}
.key {
  font-size: 0.32rem !important;
}

.page-invite .black-1 .row-1 .item .key {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  font-size: 0.4rem;
  font-family: Source Han Serif CN-Bold, Source Han Serif CN;
  font-weight: 700;
  color: #583104;
}

.page-invite .black-1 .row-1 .item .key img {
  width: 0.8rem;
}

.page-invite .black-1 .row-1 .item .val {
  font-size: 0.34667rem;
  font-family: Source Han Serif CN-Bold, Source Han Serif CN;
  font-weight: 700;
  color: #583104;
  line-height: 0.53333rem;
  text-align: center;
}

/*22*/
.page-invite .black-2 {
  margin-top: -0.34667rem;
  display: inline-block;
  width: 10rem;
  height: 22.50667rem;
  background-image: url(../../static/img/invite-black-2.e7f29b93.png);
  background-size: 100% 100%;
}

.page-invite .black-2 .title-1 {
  display: inline-block;
  width: 5.70667rem;
  height: 0.90667rem;
  background-image: url(../../static/newImg/invite-black-2-title.1bdf75b8.png);
  background-size: 100% 100%;
  -webkit-background-clip: unset;
  -webkit-text-fill-color: #fff2e1;
  line-height: 0.90667rem;
  font-size: 0.48rem;
  font-family: Source Han Serif CN-Heavy, Source Han Serif CN;
  font-weight: 800;
  color: #fff2e1;
  margin-top: 1.14667rem;
}

.page-invite .black-2 .select {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: space-evenly;
  -webkit-justify-content: space-evenly;
  -ms-flex-pack: space-evenly;
  justify-content: space-evenly;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  margin-top: 0.93333rem;
}

.page-invite .black-2 .list {
  display: inline-block;
  width: 9.2rem;
  height: 11rem;
  background-image: url(../../static/img/invite-black-2-list.50accf9c.png);
  background-size: 100% 100%;
  margin-top: 0.66667rem;
  padding-top: 0.26667rem;
}
.page-invite .black-2 .list2{
  height: 13rem;
} 

.page-invite .black-2 .list table {
  width: 100%;
  padding: 0 0.4rem;
}

.page-invite .black-2 .list table tr {
  position: relative;
  bottom: 26px;
}

.page-invite .black-2 .list table tr:first-child td {
  font-size: 0.4rem;
  font-family: Source Han Serif CN-Bold, Source Han Serif CN;
  font-weight: 700;
  color: #fff2e1;
  margin-bottom: 15px;
}

.page-invite .black-2 .list table td {
  height: 1.2rem;
  font-size: 0.35rem;
  font-family: Source Han Serif CN-Bold, Source Han Serif CN;
  font-weight: 700;
  color: #382715;
}

.page-invite .black-2 .list table tr:after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  border-bottom: 0.02667rem solid #473c2a;
}

.page-invite .black-2 .desc-1 {
  font-size: 0.53333rem;
  font-weight: 700;
  line-height: 0.8rem;
  width: 8.96rem;
  margin: 0 auto;
  margin-top: 1.5rem;
  height: auto !important;
  background: -webkit-linear-gradient(top, #ffce81, #f8ca3e 48%, #ffefc0);
  background: linear-gradient(180deg, #ffce81, #f8ca3e 48%, #ffefc0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.page-invite .black-2 .select .item.active {
  display: inline-block;
  width: 3.2rem;
  height: 0.93333rem;
  background-image: url(../../static/img/invite-black-2-select-active.26c4c5aa.png);
  background-size: 100% 100%;
}

.page-invite .black-2 .select .item {
  display: inline-block;
  width: 3.2rem;
  height: 0.93333rem;
  background-image: url(../../static/img/invite-black-2-select.7b993abc.png);
  background-size: 100% 100%;
  line-height: 0.93333rem;
  font-size: 0.4rem;
  font-family: Source Han Serif CN-Bold, Source Han Serif CN;
  font-weight: 700;
  color: #fff2e1;
}

/*33*/
.page-invite .black-3 {
  display: inline-block;
  width: 10rem;
  height: 20rem;
  background-image: url(../../static/img/invite-black-3.c480b8ef.png);
  background-size: 100% 100%;
}

.page-invite .black-3 .title-1 {
  display: inline-block;
  width: 5.70667rem;
  height: 0.90667rem;
  background-image: url(../../static/img/invite-black-2-title.1bdf75b8.png);
  background-size: 100% 100%;
  line-height: 0.90667rem;
  -webkit-background-clip: unset;
  -webkit-text-fill-color: #fff2e1;
  font-size: 0.48rem;
  font-family: Source Han Serif CN-Heavy, Source Han Serif CN;
  font-weight: 800;
  color: #ffd153;
  margin-top: 1.04rem;
}

.page-invite .black-3 .card-1 {
  display: inline-block;
  width: 100vw;
  height: 7.2rem;
  background-image: url(../../static/newImg/b-2.png);
  background-size: 100% 100%;
  margin-top: 1.22667rem;
}

.page-invite .black-3 .card-1 .key,
.page-invite .black-3 .card-1 .key .span {
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}

.page-invite .black-3 .card-1 .key {
  margin-top: 0.5rem;
  margin-bottom: 30px;
  font-size: 0.32rem;
  text-align: left;
  font-family: Source Han Serif CN-Bold, Source Han Serif CN;
  font-weight: 700;
  color: #ffd153;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  justify-content: center;
  display: flex;
  flex-direction: column;
}
.page-invite .black-3 .card-1 .key .span {
  display: inline-block;
  height: 0.83333rem;
  line-height: 0.83333rem;
  padding: 5px 20px;
  margin-bottom: 15px;
  background-image: url(../../static/img/invite-black-3-card-1-span.3083a78a.png);
  background-size: 100% 100%;
  width: auto;
  max-width: 2.13333rem;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  font-size: 0.29333rem;
  font-family: Source Han Serif CN-Heavy, Source Han Serif CN;
  font-weight: 800;
  color: #e1eeff;
  margin-right: 0.13333rem;
  text-align: center;
}
.page-invite .black-3 .card-1 .key,
.page-invite .black-3 .card-1 .key .span {
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}

*,
body #app,
html {
  padding: 0;
  margin: 0;
}
* {
  box-sizing: border-box;
}
user agent stylesheet div {
  display: block;
}

.page-invite .black-3 .card-1 .val {
  width: 6.26667rem;
  font-size: 0.32rem;
  font-family: Source Han Serif CN-Medium, Source Han Serif CN;
  font-weight: 500;
  color: #fff2e1;
  line-height: 0.50667rem;
  text-align: left;
  margin-top: 0.13333rem;
  margin-left: 220px !important;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
}
.page-invite {
  text-align: center;
}
.page-invite .black-3 .card-1 .val {
  width: 6.26667rem;
  font-size: 0.32rem;
  font-family: Source Han Serif CN-Medium, Source Han Serif CN;
  font-weight: 500;
  color: #fff2e1;
  line-height: 0.50667rem;
  text-align: left;
  margin-top: 0.13333rem;
  margin-left: 0.93333rem;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
}
.nocard1 .span,
.nocard3 .span {
  background-image: url(../../static/img/invite-black-3-card-2-span.9037e218.png) !important;
}
.nocard2 .span,
.nocard4 .span {
  background-image: url(../../static/img/invite-black-3-card-3-span.d843aa7d.png) !important;
}
</style>
