import { message } from 'antd';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
/**
 *
 * @param {Array} title_list 表格每列的标题
 * @param {Array} data_List 数据源
 * @param {Array} data_columns 数据源和标题对应的值
 * @param {String} file_name 文件名
 */

export function functi_exprot(title_list, data_List, data_columns, file_name) {
  // 转换为包含 {title, key} 的数组
  const columns = data_columns.map((col) => ({
    key: col,
  }));
  const data = [title_list, ...data_List.map((obj) => columns.map((col) => obj[col.key]))];
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(data);
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  const now = new Date();
  const month = now.getMonth() + 1; // 月份从0开始计数，所以需要加1
  const day = now.getDate();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  // 使用 padStart() 方法在小时、分钟和秒钟数字前面添加零以确保它们始终有两个数字
  const formattedTime = `${month.toString().padStart(2, '0')} ${day
    .toString()
    .padStart(2, '0')} ${hours.toString().padStart(2, '0')}${minutes
    .toString()
    .padStart(2, '0')}${seconds.toString().padStart(2, '0')}`;

  XLSX.writeFile(wb, `${file_name}.xlsx`);
  message.success(`导出成功，共${data_List.length}条数据。`);
}

// export const functi_exprot = (title_list, data_List, data_columns, file_name) => {
/**
 * 在使用 export 关键字导出函数时，两种方式 export const
 * 和 export function 的本质区别是：
 * 第一种方式是声明并导出一个常量（函数变量），它的值为一个函数；而第二种方式直接导出一个函数。
 */
