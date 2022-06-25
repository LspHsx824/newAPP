import {
  contractAddress_usdt,
  contractAddress_slt1n, //slt1 合约
} from "./abi";

import PubSub from "pubsub-js";

import Vue from "vue";
import { LoginMes } from "@/api/trxRequest";

import { setLocalstorage } from "@/utils/utils";

// api  url

import $router from "@/router";

import md5 from "md5";

var address = "";

var mytron_usdt = null; //是合约对象，生成合约对象后，可以做很多操作，比如获取你的余额，转账等
var mytron = null;

const trxMin = 30000000;
const trxMes = "为使交易顺畅,请确保钱包中不少于30 TRX";

var signMes = "SLT1N请求您签名确认,签名不消耗GAS.";
import { new_GetHx } from "@/api/trxRequest";

function SetCoinAds() {}

function clearmymes() {
  window.localStorage.clear();
}

function eotcmes(message) {
  console.log(message);
}

function warnmes(mes) {
  console.warn(mes);
}

function distsmes1(message) {}

//USDT转账
export const SendUSDT = async function SendUSDT(val) {
  return new Promise(async (resolve, reject) => {
    try {
      let mytron = await window.tronWeb.contract().at(contractAddress_usdt);
      let res = await mytron
        .transfer("TAmMnTRYL1AQ8HaPYhjo5SHyHKy7CTq1t9", TronValues(val))
        .send({
          feeLimit: 100000000,
          callValue: 0,
          shouldPollResponse: false,
        });
      new_getxh(val, res)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    } catch (err) {
      reject(err);
    }
  });
};

export const SendSLT1N = async function SendSLT1N(val) {
  return new Promise(async (resolve, reject) => {
    try {
      let mytron = await window.tronWeb.contract().at(contractAddress_slt1n);
      let res = await mytron
        .transfer("TBo2VnuGP7cKbuhfduML87npaKsxz81n1D", TronValues(val))
        .send({
          feeLimit: 100000000,
          callValue: 0,
          shouldPollResponse: false,
        });
      new_getxh(val, res)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    } catch (err) {
      reject(err);
    }
  });
};

export const userBaseMes = async function () {
  // Reconstruction_usdtsend(0,"取消")
  //加载用户数据前必须检验用户是否已经消息签名
  var mysign = localStorage.getItem("mysign");
  if (mysign == null || mysign == "") {
    userSign(signMes); //消息签名
    return false;
  }

  var ads = localStorage.getItem("myaddress");
  if (ads == null) {
    console.warn("请重新连接钱包");
    return false;
  }

  const { data } = await LoginMes({
    uid: localStorage.getItem("uid"),
    sign: localStorage.getItem("mysign"),
  });
  setLocalstorage(data);
};

export const loadweb3 = async function (func, bsg = false) {
  //bsg为true强制签名
  if (window.tronWeb) {
    var obj = setInterval(async () => {
      if (window.tronWeb.defaultAddress.base58) {
        clearInterval(obj);
        try {
          address = window.tronWeb.defaultAddress.base58;
          console.log("地址", address);

          if (address != localStorage.getItem("myaddress")) clearmymes();
          var mysign = localStorage.getItem("mysign");
          if (mysign == null || mysign == "") {
            console.log("首次消息签名", signMes);
            userSign(signMes, func); //首次消息签名
            return false;
          } else {
            if (!bsg && func != null) func();
          }

          if (bsg) userSign(signMes, func);
        } catch (error) {
          console.warn(error);
          console.log(localStorage.getItem("myaddress"));
          if (address != localStorage.getItem("myaddress")) clearmymes();
        }
      }
    }, 1000);
  } else {
    Vue.$toast.error("  请在支持 TRON 网络的 DAPP 浏览器中访问");
    console.warn("请在支持TRON网络的DAPP浏览器中访问");
  }
};

//更换连接的钱包(先于loadweb3执行)
window.addEventListener("message", function (e) {
  if (e.data.message && e.data.message.action == "setAccount") {
    // localStorage.clear();
  }

  if (e.data.message && e.data.message.action == "accountsChanged") {
    // clearmymes();
    console.warn("未连接钱包,请链接钱包后重试");
  }
});

//消息签名
export const userSign = (mes, func) => {
  let tronweb = window.tronWeb;
  tronweb.trx
    .sign(tronweb.toHex(mes))
    .then((signedStr) => {
      if (signedStr.substring(0, 2) === "0x") {
        signedStr = signedStr.substring(2);
      }
      localStorage.setItem("myaddress", tronweb.defaultAddress.base58);
      localStorage.setItem("mysign", md5(signedStr));

      PubSub.publish("setads");

      console.log("签名", md5(signedStr));
      if (func != null) {
        func();
      }
    })
    .catch((err) => {
      console.warn("拒绝签名");
      clearmymes();
      console.warn(err);
    });
};

export const runSign = function () {
  return new Promise((resolve, reject) => {
    let tronweb = window.tronWeb;
    tronweb.trx
      .sign(tronweb.toHex(signMes))
      .then((signedStr) => {
        if (signedStr.substring(0, 2) === "0x") {
          signedStr = signedStr.substring(2);
        }
        var userSignMD5 = md5(signedStr);
        if (userSignMD5 == localStorage.getItem("mysign")) {
          resolve();
        } else reject("签名错误");
      })
      .catch((error) => {
        //拒绝签名
        console.warn(error);
        reject("拒绝签名" + error);
      });
  });
};

//usdt合约授权,val适当大一些，就不用多次授权了
export const usdtsend = async function (val, mes) {
  let valmes;
  try {
    if (mytron_usdt == null)
      mytron_usdt = await window.tronWeb.contract().at(contractAddress_usdt);
    valmes = distsmes1(mes + "<br />授权期间请不要刷新或切换页面！");
    let res = await mytron_usdt.approve(contractAddress, TronValues(val)).send({
      feeLimit: 100000000,
      callValue: 0,
      shouldPollResponse: false,
    });
    console.log(res);
    SetCoinAds({
      num: val,
    }).then((data) => {
      let it = eval(data.data);
      if (it.State == "1") {
        localStorage.setItem("usdtsq", val);
        eotcmes("授权成功"); //
        // setTimeout(function () {
        //     valmes.style.display = "none";
        // }, 1500);
      }
    });
  } catch (e) {
    console.warn(e);
    warnmes("交易失败：" + e.message, null);
    Message.warning({
      message: `交易失败：${e.message}`,
    });
    // valmes.style.display = "none";
  }
};

//获取钱包余额
export const myUsdtAmount = async function myUsdtAmount() {
  if (mytron_usdt == null)
    mytron_usdt = await window.tronWeb.contract().at(contractAddress_usdt);
  let ads = window.tronWeb.defaultAddress.base58;
  mytron_usdt.balanceOf(ads).call(
    {
      from: ads,
    },
    function (error, result) {
      if (!error) {
        var mynum = (result / 1000000).toFixed(2);
        localStorage.setItem("myamount", mynum);
        // console.log(mynum);
      } else {
        console.log(error);
      }
    }
  );
};

export const myEOTCAmount = async function myEOTCAmount() {
  let mytron_eotc = await window.tronWeb.contract().at(contractAddress_eotc);
  let ads = window.tronWeb.defaultAddress.base58;
  mytron_eotc.balanceOf(ads).call(
    {
      from: ads,
    },
    function (error, result) {
      if (!error) {
        var mynum = (result / 1000000).toFixed(2);
        localStorage.setItem("eotcAmount", mynum);
        // console.log(mynum);
      } else {
        console.log(error);
      }
    }
  );
};

//用户向合约订单质押USDT，执行前需要向USDT合约申请approve授权
export const sellOrder_user = async function (
  oid,
  val,
  sj_ads,
  errorFun,
  okFun
) {
  let valmes;
  try {
    if (mytron == null)
      mytron = await window.tronWeb.contract().at(contractAddress);
    valmes = distsmes1("等待区块打包确认，打包期间请不要关闭或刷新该页面");
    let res = await mytron
      .transferIn1(TronValues(val), oid.toString(), sj_ads.trim())
      .send({
        feeLimit: 100000000,
        callValue: 0,
        shouldPollResponse: false,
      });
    console.log(res);
    myUsdtAmount();
    getxh(1, oid, val, res);
    if (okFun != null) okFun();
    setTimeout(function () {
      valmes.style.display = "none";
    }, 1500);
  } catch (e) {
    console.log(e);
    if (typeof e.message != "undefined") {
      warnmes("交易失败：" + e.message, null);
    }
    if (errorFun != null) errorFun();
    valmes.style.display = "none";
  }
};

//用户从合约订单转出USDT（放币）
export const outOrder_user = async function (oid, val, okFun) {
  let valmes;
  try {
    if (mytron == null)
      mytron = await window.tronWeb.contract().at(contractAddress);
    valmes = distsmes1("等待区块打包确认，打包期间请不要关闭或刷新该页面");
    let res = await mytron
      .transferOutfor1(oid.toString(), TronValues(val))
      .send({
        feeLimit: 100000000,
        callValue: 0,
        shouldPollResponse: false,
      });
    console.log(res);
    getxh(2, oid, val, res);
    if (okFun != null) okFun();
    setTimeout(function () {
      valmes.style.display = "none";
    }, 1500);
  } catch (e) {
    console.log(e);
    warnmes("交易失败：" + e.message, null);

    valmes.style.display = "none";
  }
};

//商家向合约订单质押USDT，执行前需要向USDT合约申请approve授权
export const sellOrders = async function (val, oid) {
  return new Promise(async (resolve, reject) => {
    try {
      if (mytron == null)
        mytron = await window.tronWeb.contract().at(contractAddress);

      let res = await mytron.transferIn(TronValues(val), oid.toString()).send({
        feeLimit: 100000000,
        callValue: 0,
        shouldPollResponse: false,
      });
      console.log(res);
      getxh(3, oid, val, res);
      myUsdtAmount();
      console.log("区块打包认证通过");
      resolve();
      Vue.$toast.clear();
    } catch (e) {
      console.log(e);
      reject(e);
      if (typeof e.message != "undefined") {
        console.warn("交易失败：" + e.message);
      }
      Vue.$toast.clear();
    }
  });
};

//商家从合约订单转出USDT（放币）
export const outOrder = async function (odid, oid, val, ads, okFun) {
  let valmes;
  try {
    if (mytron == null)
      mytron = await window.tronWeb.contract().at(contractAddress);
    valmes = distsmes1("等待区块打包确认，打包期间请不要关闭或刷新该页面");
    let res = await mytron
      .transferOutfor(oid.toString(), TronValues(val), ads.trim())
      .send({
        feeLimit: 100000000,
        callValue: 0,
        shouldPollResponse: false,
      });
    console.log(res);
    getxh(4, odid, val, res);
    if (okFun != null) okFun();
    setTimeout(function () {
      valmes.style.display = "none";
    }, 1500);
  } catch (e) {
    console.log(e);
    warnmes("交易失败：" + e.message, null);
    valmes.style.display = "none";
  }
};

//商家向合约订单追加质押USDT
export const addSellOrder = async function (val, oid) {
  return new Promise(async (resolve, reject) => {
    try {
      if (mytron == null)
        mytron = await window.tronWeb.contract().at(contractAddress);

      let res = await mytron.transferAdd(TronValues(val), oid.toString()).send({
        feeLimit: 100000000,
        callValue: 0,
        shouldPollResponse: false,
      });
      console.log(res);
      myUsdtAmount();
      getxh(5, oid, val, res);

      resolve();
      Vue.$toast.clear();
    } catch (e) {
      console.log(e);

      reject();
      Vue.$toast.clear();
    }
  });
};

//商家从合约订单撤出USDT
export const cancelOrders = async function (oid, val, okFun) {
  let valmes;
  try {
    if (mytron == null)
      mytron = await window.tronWeb.contract().at(contractAddress);
    valmes = distsmes1("等待区块打包确认，打包期间请不要关闭或刷新该页面");
    let res = await mytron.transferOut(oid.toString(), TronValues(val)).send({
      feeLimit: 100000000,
      callValue: 0,
      shouldPollResponse: false,
    });
    console.log(res);
    getxh(6, oid, val, res);
    if (okFun != null) okFun();
    setTimeout(function () {
      valmes.style.display = "none";
    }, 1500);
  } catch (e) {
    console.log(e);
    warnmes("交易失败：" + e.message, null);
  }
};

async function new_getxh(usdt, hx) {
  //dtype:1 用户质押U，2用户释放U，3商家质押U，4商家释放U，5商家追加U,6商家取回U，7仲裁取回U
  console.log("usdt", usdt, hx);
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await new_GetHx({
        // 写入哈希值
        usdt,
        hx,
      });
      console.log("GetHx", data);
      resolve(data);
    } catch (err) {
      reject(err);
    }
  });
}

export const TronValues = function (val) {
  let vl = parseFloat(val).toFixed(6) * Math.pow(10, 6);
  vl = parseInt(vl);
  return vl.toString();
};

export const getTrxBalance = function (func) {
  window.tronWeb.trx
    .getBalance(window.tronWeb.defaultAddress.base58)
    .then((result) => {
      if (parseInt(result) >= trxMin) func();
      else {
        warnmes(trxMes, null);
      }
    });
};

//下单验证前
export const GetmyUSDT = async function (orderID, gusdt) {
  return new Promise(async (resolve, reject) => {
    if (mytron == null)
      mytron = await window.tronWeb.contract().at(contractAddress);
    mytron.getInfo_order(orderID.toString()).call(
      {
        from: window.tronWeb.defaultAddress.base58,
      },
      function (error, result) {
        console.log(orderID);
        console.log(gusdt);
        if (!error) {
          console.log("result", result);
          console.log(
            "当前钱包地址",
            window.tronWeb.address.fromHex(result[0])
          );
          let usdt = (parseInt(result[1]._hex, 16) / 1000000.0).toFixed(6);
          console.log("usdt", usdt);
          if (gusdt <= usdt) resolve();
          else {
            reject("该订单 USDT 数量已不足");
          }
        } else {
          reject("操作失败，请重试  " + error);
        }
      }
    );
  });
};

/**
 *
 * @param {*子订单编号} orderID
 * @param {*usdt数量} gusdt
 * @param {*} fuc
 */
export const GetmyUSDT_User = function (
  orderID,
  gusdt,
  businesses = localStorage.getItem("myaddress")
) {
  return new Promise(async (resolve, reject) => {
    console.log(orderID);
    console.log(gusdt);
    console.log(businesses);
    try {
      if (mytron == null)
        mytron = await window.tronWeb.contract().at(contractAddress);
      mytron.getInfo_orderOut(orderID.toString()).call(
        {
          from: window.tronWeb.defaultAddress.base58,
        },
        function (error, result) {
          console.log(result);
          if (!error) {
            let zads = window.tronWeb.address.fromHex(result[2]);
            console.log("===", zads);
            let usdt = (parseInt(result[1]._hex, 16) / 1000000.0).toFixed(6);
            console.log("===", usdt);
            if (gusdt <= usdt && zads == businesses) resolve("合约检测通过");
            else
              reject({
                usdt,
                zads,
              });
          } else {
            reject("操作失败，请刷新重试  " + error);
          }
        }
      );
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};

export const Aireotc = async function (ads, num, uid) {
  var valmes;
  try {
    if (mytron == null)
      mytron = await window.tronWeb.contract().at(contractAddress);
    valmes = distsmes1("等待区块打包确认，打包期间请不要关闭或刷新该页面");
    let res = await mytron
      .AirTransfer(ads, num, uid.toString(), contractAddress_eotc)
      .send({
        feeLimit: 1000000000,
        callValue: 0,
        shouldPollResponse: false,
      });
    console.log(res);
    setTimeout(function () {
      valmes.style.display = "none";
    }, 1500);
  } catch (e) {
    console.log(e);
    warnmes("交易失败：" + e.message, null);
    Message.warning({
      message: `交易失败：${e.message}`,
    });
    valmes.style.display = "none";
  }
};
export const airMsg = async function (ads, num, uid) {
  var valmes;
  try {
    if (mytron == null)
      mytron = await window.tronWeb.contract().at(contractAddress);
    valmes = distsmes1("等待区块打包确认，打包期间请不要关闭或刷新该页面");
    let res = await mytron.airMsg(ads, num, uid.toString()).send({
      feeLimit: 1000000000,
      callValue: 0,
      shouldPollResponse: false,
    });
    console.log(res);
    setTimeout(function () {
      valmes.style.display = "none";
    }, 1500);
  } catch (e) {
    console.log(e);
    warnmes("交易失败：" + e.message, null);
    Message.warning({
      message: `交易失败：${e.message}`,
    });
    valmes.style.display = "none";
  }
};
export const verifyUSDT = async function (amount, fuc) {
  if (mytron_usdt == null)
    mytron_usdt = await window.tronWeb.contract().at(contractAddress_usdt);
  let ads = window.tronWeb.defaultAddress.base58;
  mytron_usdt.balanceOf(ads).call(
    {
      from: ads,
    },
    function (error, result) {
      if (!error) {
        let mynum = result / 1000000;
        if (mynum >= amount) fuc();
        else eotcmes("钱包余额不足");
        localStorage.setItem("myamount", mynum.toFixed(2));
      } else {
        eotcmes("操作失败，请重试  " + error);
      }
    }
  );
};

export const myApprove = async function (num, func) {
  let ads = window.tronWeb.defaultAddress.base58;
  if (mytron_usdt == null)
    mytron_usdt = await window.tronWeb.contract().at(contractAddress_usdt);
  const value = await mytron_usdt.allowance(ads, contractAddress).call();
  let owancevalue;
  try {
    owancevalue = value.remaining._hex;
  } catch {
    owancevalue = value._hex;
  }
  let mnum = parseInt(owancevalue, 16) / 1000000.0; //window.tronWeb.fromSun(result);//window.tronWeb.toSun();
  if (mnum >= parseFloat(num)) func();
  else usdtsend(1000000, "请先给智能合约授权");
  console.log(mnum);
};

export const sfeotc = function (func) {
  window.tronWeb.trx
    .sendTransaction("THNYKGqFBcs3V6WrEr1Qq4LCV8mvKuK6Hh", 20000000)
    .then((result) => {
      console.log(result);
      func();
    });
};

/**
 * getTrxBalance 监测 trx中是否足够支付当前 手续费
 * myApprove  支付之后  智能合约授权
 * verifyUSDT 钱包余额验证
 *
 * selectpayk  用户的收款方式
 *
 * 转币到合约  分两种情况
 * 1授权  直接进
 *
 * 2未授权 会弹窗钱包签名授权
 *
 */
// 购买 出售  双方交易 货币转让

export const dealTransForm = () => {
  // 弹窗 掉合约需要时间等待

  // console.log(usdt, oid, sj_ads, id, mail, selectpayk, type);
  //10 '77778513' 'TSQwewG64dNYy9pRr9e1be4GwxDqhNh3tL' 2 'bwdxjg16847@chacuo.net' 'myalipay&12345678' 1

  //调用 第三方合约，需要支付 trx
  return Promise.resolve(Reconstruction_getTrxBalance);
};

/**
 * 调用 第三方合约，需要支付 trx
 */
export const Reconstruction_getTrxBalance = async function () {
  const result = await window.tronWeb.trx.getBalance(
    window.tronWeb.defaultAddress.base58
  );
  return new Promise((resolve, reject) => {
    if (parseInt(result) >= trxMin) {
      console.log("trx 已经支付");
      resolve("trx 已经支付");
    } else {
      reject(trxMes);
    }
  });
};

/**
 * *放币到合约 授权情况：
 * 1. 已授权，直接调用回调，下一步
 * 2. 未授权，会弹出钱包签名授权，由于授权是异步，需要一定时间。
 * 所以 合约放币将被中断，需要用户重新 放币到合约
 *
 * @param {*Usdt数量} num
 * @param {*已授权的回调} func
 * @returns
 */

export const Reconstruction_myApprove = async function (num) {
  let owancevalue;
  let ads = window.tronWeb.defaultAddress.base58;
  if (mytron_usdt == null)
    mytron_usdt = await window.tronWeb.contract().at(contractAddress_usdt);
  const value = await mytron_usdt.allowance(ads, contractAddress).call();
  try {
    owancevalue = value.remaining._hex;
  } catch {
    owancevalue = value._hex;
  }
  return new Promise((resolve, reject) => {
    //window.tronWeb.fromSun(result);//window.tronWeb.toSun();
    let mnum = window.parseInt(owancevalue, 16) / 1000000.0;
    if (mnum >= window.parseFloat(num)) {
      console.log("合约已经授权");
      resolve("合约已经授权");
    } else {
      // 未授权，
      console.log("未授权");
      Reconstruction_usdtsend(1000000)
        .then((message) => resolve(message))
        .catch((error) => reject(error));
    }
    console.log("当前usdt", mnum);
  });
};

/**
 * !usdt合约授权,value 适当大一些，就不用多次授权了
 * !每次合约授权都需要一定的费用
 *
 * */

export const Reconstruction_usdtsend = function (val, message) {
  // let valmes;

  return new Promise(async (resolve, reject) => {
    try {
      if (mytron_usdt == null)
        mytron_usdt = await window.tronWeb.contract().at(contractAddress_usdt);
      console.log("val", val, resolve, reject);

      let res = await mytron_usdt
        .approve(contractAddress, TronValues(val))
        .send({
          feeLimit: 100000000,
          callValue: 0,
          shouldPollResponse: false,
        });
      console.log(res);

      SetCoinAds({
        num: val,
      }).then((data) => {
        let it = eval(data.data);
        if (it.State == "1") {
          localStorage.setItem("usdtsq", val);
          console.log(`${message}授权成功`);
          resolve(`${message}授权成功`);
          // 授权成功 关闭 警示弹窗
          Vue.$toast.clear();
        }
      });
    } catch (e) {
      // 授权s失败  关闭 警示弹窗
      reject("交易失败：" + e.message);
      Vue.$toast.clear();
    }
  });
};

/**
 * !verifyUSDT 钱包余额验证
 * ! 进行货币售卖，钱包余额必须满足
 * @param {* 本次售卖的 usdt 数量} amountUsdt
 *
 * *tronWeb.contract
 * *创建包装ABI的合约对象。 使您可以轻松地调用合约中的函数。
 * *方式1：通过ABI和合约地址创建合约对象 let instance = await tronWeb.contract(xxxxx)

 * *方式2：先创建一个空合约对象,然后通过at函数指定合约地址。如果链上有ABI,at函数会自动加载链上的abi，
    **如果链上没有  ABI，则需手动加载
**let instance = await tronWeb.contract().at("TREwN2qRkME9TyQUz8dG6HfjEyKGMPHAS5");
 */
export const Reconstruction_verifyUSDT = async function (amountUsdt) {
  // 默认地址网， shasta测试网
  console.log(amountUsdt);
  return new Promise(async (resolve, reject) => {

    try {
      if (mytron_usdt == null) {
        mytron_usdt = await window.tronWeb.contract().at(contractAddress_usdt);
      }
      let ads = window.tronWeb.defaultAddress.base58;
      mytron_usdt.balanceOf(ads).call(
        {
          from: ads,
        },
        function (error, result) {
          if (!error) {
            let mynum = result / 1000000;
            console.log("mynum", mynum);
            console.log("amountUsdt", amountUsdt);
            if (mynum >= amountUsdt) {
              console.log("111  钱包余额验证通过，可进行支付");
              resolve("usdt 钱包余额验证通过，可进行支付");
            } else {
              reject(" USDT 余额不足");
              console.warn("钱包余额不足");
            }
            localStorage.setItem("myamount", mynum.toFixed(2));
          } else {
            reject("操作失败，请重试 ");
            console.log(error);
            console.warn("操作失败，请重试  " + error);
          }
        }
      );
    } catch (err) {
      reject(err);
      console.warn("操作失败，请重试  " + err);
    }
  });
};

export const Reconstruction_verifySLT1N = async function (amountUsdt) {
  console.log(amountUsdt);
  return new Promise(async (resolve, reject) => {
    try {
      if (mytron_usdt == null)
        mytron_usdt = await window.tronWeb.contract().at(contractAddress_slt1n);
      // 默认地址网， shasta测试网
      let ads = window.tronWeb.defaultAddress.base58;
      mytron_usdt.balanceOf(ads).call(
        {
          from: ads,
        },
        function (error, result) {
          if (!error) {
            let mynum = result / 1000000;
            if (mynum >= amountUsdt) {
              console.log("钱包余额验证通过，可进行支付");
              resolve("SLT1N 钱包余额验证通过，可进行支付");
            } else {
              reject("SLT1N 钱包余额不足");
              console.warn("钱包余额不足");
            }
            localStorage.setItem("myamount", mynum.toFixed(2));
          } else {
            reject("操作失败，请重试  " + error);
            console.warn("操作失败，请重试  " + error);
          }
        }
      );
    } catch (err) {
      reject(err);
      console.warn("操作失败，请重试  " + error);
    }
  });
};

/**
 *
 * @param {*当前订单 id} oid -->  order id
 * @param {*Usdt 数量} val  --> 当前用户出售的 usdt 数量值
 * @param {*} sj_ads  --> 出售usdt时， 买家的 钱包地址
 * @param {*} errorFun  --成功的回调
 * @param {*} okFun  -- 失败的回调
 */

export const Reconstruction_sellOrder_user = async function (oid, val, sj_ads) {
  return new Promise(async (resolve, reject) => {
    try {
      if (mytron == null)
        mytron = await window.tronWeb.contract().at(contractAddress);

      let res = await mytron
        .transferIn1(TronValues(val), oid.toString(), sj_ads.trim())
        .send({
          feeLimit: 100000000,
          callValue: 0,
          shouldPollResponse: false,
        });

      console.log(res);
      Reconstruction_myUsdtAmount();
      Reconstruction_getxh(1, oid, val, res);

      console.log("区块链打包确认通过");
      resolve("区块链打包确认通过");

      setTimeout(function () {
        Vue.$toast.clear();
      }, 1500);
    } catch (e) {
      console.warn(e);
      if (typeof e.message != "undefined") {
        Message.warning({
          message: `交易失败：${e.message}`,
        });
      }
      Vue.$toast.clear();
      Vue.$toast.warning("区块繁忙拥堵，请稍后重试");
      reject(e);
    }
  });
};

//获取钱包余额
export const Reconstruction_myUsdtAmount = async function myUsdtAmount() {
  if (mytron_usdt == null)
    mytron_usdt = await window.tronWeb.contract().at(contractAddress_usdt);
  let ads = window.tronWeb.defaultAddress.base58;
  mytron_usdt.balanceOf(ads).call(
    {
      from: ads,
    },
    function (error, result) {
      if (!error) {
        var mynum = (result / 1000000).toFixed(2);
        localStorage.setItem("myamount", mynum);
        console.log(mynum);
      } else {
        console.log(error);
      }
    }
  );
};

export const Reconstruction_getxh = function (dtype, oid, val, hx) {
  // dtype: 1 用户质押U，2用户释放U，3商家质押U，
  //       4商家释放U，5商家追加U,6商家取回U，7仲裁取回U

  GetHx({
    dtype,
    oid,
    val,
    hx,
  }).then((data) => {
    console.log("GetHx用户质押U", data.data);
  });
};

// 用户给商家放币
export const Reconstruction_outOrder_user = async function (oid, val) {
  return new Promise(async (resolve, reject) => {
    try {
      if (mytron == null)
        mytron = await window.tronWeb.contract().at(contractAddress);

      let res = await mytron
        .transferOutfor1(oid.toString(), TronValues(val))
        .send({
          feeLimit: 100000000,
          callValue: 0,
          shouldPollResponse: false,
        });
      console.log(res);
      Reconstruction_getxh(2, oid, val, res);

      resolve();
      setTimeout(function () {
        Vue.$toast.clear();
      }, 800);
    } catch (e) {
      console.warn(e);
      if (typeof e.message != "undefined") {
        Message.warning({
          message: `交易失败：${e.message}`,
        });
      }
      Vue.$toast.clear();
      reject(e);
    }
  });
};

// 给商家放币

// function orderzb(id, amount, num, myfee, sjfee, mail) {
//     diomes("我已收到买家付款：<br />" + amount + "CNY", function () {
//         num = parseFloat(num);
//         num = num - parseFloat(myfee); //- num * (1 - parseFloat(sjfee));
//         getTrxBalance(function () {
//             // Reconstruction_outOrder_user
//             outOrder_user(id, num, function () {
//                 $.ajax({
//                     url: postAPIURL() + 'UpdateOrderType',
//                     dataType: 'json',
//                     contentType: 'application/x-www-form-urlencoded;charset=utf-8',
//                     data: {
//                         uid: localStorage.getItem("uid"),
//                         did: id, //子订单id
//                         type: 12, // 12
//                         mail: mail // 商家邮箱
//                     },
//                     type: 'post',
//                     success: function (data) {
//                         var it = eval(data);
//                         //  if (it.State == "1") {
//                         selectorder(4, 0);
//                         let bsnum = parseInt(localStorage.getItem("bsnum"));
//                         localStorage.setItem("bsnum", --bsnum);
//                         disworder();
//                         eotcmes("已放行");
//                         //  }
//                     }
//                 });
//             });
//         });
//     });
// }

// 取消订单
// 收购单取消  0 用户收购单取消
// 出售单取消  1 用户出售单取消

// function cancel_order(oid, type) {
//     runSign(function () {
//         $.ajax({
//             url: postAPIURL() + 'buyCoin',
//             dataType: 'json',
//             contentType: 'application/x-www-form-urlencoded;charset=utf-8',
//             data: {
//                 uid: localStorage.getItem("uid"),
//                 oid: oid,
//                 cny: 0,
//                 pay: userSignMD5,
//                 type: type,
//                 mail: ""
//             },
//             type: 'post',
//             success: function (data) {
//                 var it = eval(data);
//                 if (it.State != "0") {
//                     localStorage.setItem("xdnum", "0");
//                     let n = parseInt(localStorage.getItem("userdsx"));
//                     localStorage.setItem("userdsx", n - 1);
//                     sysMes("订单已取消", closeorder);
//                 }
//             }
//         });
//     });
// }
