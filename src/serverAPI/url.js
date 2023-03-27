import request from '@/utils/request';

/**
 * 保存扩展内容
 * @param {*} data
 * @returns
 */
export const GetUrlList = (data) => request('/extend-content', { method: 'get' });
