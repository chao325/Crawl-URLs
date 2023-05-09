import { ProFormText, ProFormTextArea, ProFormSelect } from '@ant-design/pro-form';
import { ProForm, FooterToolbar } from '@ant-design/pro-components';
import { Card, Form, message, Button, Space, Row, Col } from 'antd';
import { useState, useEffect, useRef } from 'react';
import { GetUrlList } from '@/serverAPI/url';
import { history } from 'umi';

export default (props) => {
  const { editValue, funEven } = props;
  console.log(props, props.editValue);
  const { tid, domain } = editValue;
  const formItemLayout = { labelCol: { span: 8 }, wrapperCol: { span: 16 } };
  const [dispatch, setDispatch] = useState();
  const { form } = Form.useForm;
  const formRef = useRef();
  useEffect(() => {
    GetUrlList({
      write: 0,
      data: { tid: tid },
    })
      .then((res) => {
        setDispatch(res);
        const data = res?.site[0];
        console.log(data);

        formRef?.current?.setFieldsValue(data);
      })
      .catch(function (e) {
        console.log('fetch fail', e);
      })
      .finally((r) => {
        console.log('fetch fail', r);
      });
  }, [tid]);
  const onFinish = (values) => {
    console.log('Received values of form:', values);
    // 在这里处理表单数据
    GetUrlList({
      write: 1,
      data: { ...values },
      domain: domain,
    })
      .then((result) => {
        message.success(`提交成功`);
        funEven();
      })
      .catch(function (e) {
        console.log('fetch fail', e);
      })
      .finally((r) => {});
  };

  // useEffect(() => {

  //   return () => {
  //     cleanup
  //   };
  // }, [input]);

  return (
    <ProForm
      onFinish={onFinish}
      onReset={() => {
        return;
      }}
      submitter={{
        searchConfig: {
          submitText: '提交',
          resetText: '重置',
        },
      }}
    >
      <ProForm.Group>
        <ProForm.Item name="email" label="邮箱">
          <ProFormText />
        </ProForm.Item>
        <ProForm.Item name="phone" label="手机号">
          <ProFormText />
        </ProForm.Item>
      </ProForm.Group>

      <ProForm.Group>
        <ProForm.Item name="qq" label="QQ">
          <ProFormText />
        </ProForm.Item>
        <ProForm.Item name="weixin" label="微信">
          <ProFormText />
        </ProForm.Item>
      </ProForm.Group>

      <ProForm.Group>
        <ProForm.Item name="other_contact" label="其他联系方式">
          <ProFormText />
        </ProForm.Item>
        <ProForm.Item name="status" label="域名状态">
          <ProFormSelect
            width={200}
            options={[
              { label: '正常', value: '0' },
              { label: '已售', value: '1' },
              { label: '不出', value: '2' },
              { label: '跟进', value: '3' },
              { label: '已经群发邮件', value: '4' },
            ]}
          />
        </ProForm.Item>
      </ProForm.Group>

      <ProForm.Item name="other" label="备注">
        <ProFormTextArea />
      </ProForm.Item>
    </ProForm>
  );
};
