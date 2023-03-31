import React, { useState, useEffect } from 'react';
import { request } from 'umi';
import { Spin } from 'antd';
import { queryUrlInfo } from '@/serverAPI/url';

export default (props) => {
  const [loading, setLoading] = useState(false);
  const [success_urlInfo, setSuccess_urlInfo] = useState([]);
  const { urls_value, onChange, ...leftProps } = props;
  console.log(props, 'propspropspropspropsprops');
  const url_key = '306d4f6c530a8d596269bdc1a744eff4';
  useEffect(() => {
    setLoading(true);
    queryUrlInfo(url_key, urls_value)
      .then((result) => {
        const { success, failed, count } = result.data;
        setSuccess_urlInfo(success);
        // console.log(success[0], success[0].domain);
      })
      .catch(function (e) {
        console.log('fetch fail');
      })
      .finally((r) => {
        setLoading(false);
      });
    // request(`https://apistore.aizhan.com/baidurank/siteinfos/${url_key}?domains=${urls_value}`)
    //   .then((res) => {
    //     console.log(res, '----------------');
    //     setData(res);
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //   });
  }, [urls_value]);

  return (
    <div>
      {loading && <Spin />}
      {!loading && (
        <div>
          {/* pc_br	int	
PC权重
m_br	int	
移动权重
ip	string	
预计来路
pc_ip	string	
PC预计来路
m_ip
string	
移动预计来路 */}
          <p>查询域名：{success_urlInfo[0]?.domain}</p>
          <p>PC权重：{success_urlInfo[0]?.pc_br}</p>
          <p>移动权重：{success_urlInfo[0]?.m_br}</p>
          <p>预计来路：{success_urlInfo[0]?.ip}</p>
          <p>PC预计来路：{success_urlInfo[0]?.pc_ip}</p>
          <p>移动预计来路：{success_urlInfo[0]?.m_ip}</p>
        </div>
      )}
    </div>
  );
};
