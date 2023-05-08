import request from '@/utils/request';

/**
 * 获取URL
 * @param {*} data
 * @returns
 */
export const GetUrlList = (params) =>
  request(`/site-site_api.html?token=q7aI2M68wjvwNshOqDf4MTBC`, {
    params,
    method: 'post',
  });

export const queryUrlInfo = (key, parmas) =>
  request(`/baidurank/siteinfos/${key}?domains=${parmas}`);

/**
 * 保存扩展内容
 * @param {*} data
 * @returns
 */
export const addDevice = (data) => request('/extend-content', { method: 'get' });

/**
 * 通过设备号查询相关设备列表  选好了点击绑定时根据当前选择的设备id查询
 * 同终端列表
 * @param {*} params
 * @returns
 */
export const getTerminalDeviceList = (id) => request(`/hatc-device/${id}`);
