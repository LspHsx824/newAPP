import request from "@/utils/request";
import utils from "@/utils/utils";

import { getItem } from "@/utils/storage";

export const parseSearchParams = function (searchParamsString) {
  console.log(searchParamsString.split("?"));
  return searchParamsString.split("&").reduce((searchParams, curKV) => {
    const [k, v] = curKV.split("=").map(decodeURIComponent);
    searchParams[k] = v;
    return searchParams;
  }, {});
};

//注册
export const UserReg = ({ wallet, code, sign }) => {
  const params = {
    wallet,
    code,
    sign,
  };
  return request({
    method: "post",
    url: "/UserReg",
    params,
  });
};

// 获取用户基本信息
export const LoginMes = ({ uid, sign }) => {
  const params = {
    uid,
    sign,
  };

  return request({
    method: "post",
    url: "/LoginMes",
    params,
  });
};

// 用户和商家质押相关
export const new_GetHx = ({ usdt, uid = getItem("uid"), hx }) => {
  const data = utils.initFormData({
    uid,
    hx,
    usdt,
  });

  return request({
    method: "POST",
    url: `/Gethx`,
    data,
  });
};


export const BuyNFT = (usdt) => {
  const params = {
    uid: getItem("uid"),
    pid: getItem("pid"),
    sign: getItem("mysign"),
    usdt,
  };

  return request({
    method: "post",
    url: "/BuyNFT",
    params,
  });
};
