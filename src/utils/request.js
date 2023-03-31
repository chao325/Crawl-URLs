/**
 * by；@baozhangchao
 * time：2023/3/22 16:16PM
 * copyright: ©2023 baozhangchao
 * email：zcsupercn@foxmail.com
 */

import { message } from 'antd';
import { request } from 'umi';

/**
 * 自定义修改umi-request的行为、
 *
 * 默认错误处理行为是通过messages组件报错的。
 * 也可以设置option.showType来修改默认行为
 *
 * export enum ErrorShowType {
 *   SILENT = 0, // 不提示错误
 *   WARN_MESSAGE = 1, // 警告信息提示
 *   ERROR_MESSAGE = 2, // 错误信息提示
 *   NOTIFICATION = 4, // 通知提示
 *   REDIRECT = 9, // 页面跳转，会跳转到 /exception 页面
 * }
 */
const prefix = `${API_BASE}/`;

function requestInterceptor(url, options) {
  const headers = options.headers || {};
  const token = localStorage.getItem('token')
    ? { Authorization: localStorage.getItem('token') }
    : {};

  // const prefix = `${API_BASE}/`;

  return {
    url: `${prefix}${url}`,
    options: {
      ...options,
      headers: {
        ...headers,
        ...token,
      },
    },
  };
}

export const requestConfig = {
  errorConfig: {
    adaptor: (resData, ctx) => {
      console.log('-------------resDate', resData, ctx);
      const showError = ctx.req.options?.showType;
      return {
        ...resData,
        success: resData.code === 1000,
        errorMessage: resData.message,
        showType: isNaN(showError) ? 1 : showError, // 默认通过 message 组件报错
      };
    },
  },
  requestInterceptors: [requestInterceptor],
};

export default (...args) => request(...args).then((r) => r);

export function queryTable(apiRequest) {
  return function (params) {
    console.log('-----------params-----------', params);

    return apiRequest({
      ...params,
      // pageNum: params.current,
    })
      .then((res) => {
        console.log('----------------------', res);
        return {
          data: res,
          success: true,
        };
      })
      .catch((err) => {
        message.error('请求失败', err);
        return {
          success: false,
        };
      });
  };
}
