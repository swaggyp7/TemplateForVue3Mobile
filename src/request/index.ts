import Axios, { AxiosRequestConfig } from "axios"; // 此处引入axios官方文件
import { addPendingRequest, removePendingRequest } from "./cancelRepeatRquest"; // 取消重复请求
import { againRequest } from "./requestAgainSend"; // 请求重发
import { getToken, clearToken } from "@/shared/index";
import { Toast } from "vant";
import { i18n } from "@/language/index";

const { t } = i18n.global;
// 返回结果处理
// 自定义约定接口返回{code: xxx, data: xxx, msg:'err message'}
const responseHandle = {
  200: (response) => {
    return response.data.data;
  },
  401: (response) => {
    Toast.fail(t("Http.loginError"));
    clearToken();
    window.location.href = window.location.origin;
  },
  default: (response) => {
    Toast.fail(t("Http.defaultError"));
    return Promise.reject(response);
  },
};

declare module "axios" {
  interface AxiosRequestConfig {
    retry?: number;
    cancelRequest?: boolean;
  }
}

const axios = Axios.create({
  baseURL: process.env.VUE_APP_API_URL || "",
  timeout: 30000,
});

// 添加请求拦截器
axios.interceptors.request.use(
  function (config: AxiosRequestConfig & any) {
    // 请求头用于接口token 认证
    if (!config.headers) config.headers = {};
    getToken() && (config.headers["token"] = getToken());
    if (!config.method) config.method = "post";
    if (
      config.method.toLocaleLowerCase() === "post" ||
      config.method.toLocaleLowerCase() === "put"
    ) {
      // 参数统一处理，请求都使用data传参
      // config.data = config.data;
    } else if (
      config.method.toLocaleLowerCase() === "get" ||
      config.method.toLocaleLowerCase() === "delete"
    ) {
      // 参数统一处理
      config.params = config.data;
    } else {
      alert("不允许的请求方法：" + config.method);
    }
    // pendding 中的请求，后续请求不发送（由于存放的peddingMap 的key 和参数有关，所以放在参数处理之后）
    addPendingRequest(config); // 把当前请求信息添加到pendingRequest对象中
    //  请求缓存
    // cacheReqInterceptor(config, axios);
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  (response) => {
    // 响应正常时候就从pendingRequest对象中移除请求
    removePendingRequest(response);
    // cacheResInterceptor(response);
    return responseHandle[response.data.code || "default"](response);
  },
  (error) => {
    // 从pending 列表中移除请求
    removePendingRequest(error.config || {});
    // 需要特殊处理请求被取消的情况
    if (!Axios.isCancel(error)) {
      // 请求重发
      return againRequest(error, axios);
    }
    // 请求缓存处理方式
    if (
      Axios.isCancel(error) &&
      error.message.data &&
      error.message.data.config.cache
    ) {
      return Promise.resolve(error.message.data.data.data); // 返回结果数据
    }
    return Promise.reject(error);
  }
);
export default axios;
