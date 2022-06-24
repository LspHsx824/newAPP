// 0 0 0 trx

import PubSub from "pubsub-js"

import { setItem } from "./storage";

function initFormData(data) {
  const formData = new FormData();

  for (const [key, value] of Object.entries(data)) {
    formData.append(key, value);
  }

  return formData;
}

export default {
  initFormData,
};

export const setLocalstorage = (obj) => {
  obj = obj?.data || obj;
  for (const [key, val] of Object.entries(obj)) {
    console.log(key, val);
    setItem(key, val);
  }
  PubSub.publish("setData");
};

