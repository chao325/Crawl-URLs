import { ProFormText, ProFormTextArea, ProFormSelect } from '@ant-design/pro-form';
import { ProForm } from '@ant-design/pro-components';
import { Card, Form, message, Button } from 'antd';
import { useState, useEffect, useRef } from 'react';
import { GetUrlList } from '@/serverAPI/url';
import { history } from 'umi';

export default (props) => {
  const { location } = props;
  const { tid, domain } = location.query;
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
        history.goBack();
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
    <Card>
      <ProForm
        formRef={formRef}
        onFinish={onFinish}
        {...formItemLayout}
        // submitter={{
        //   searchConfig: {
        //     submitText: '提交',
        //     resetText: '重置',
        //   },
        // }}
        submitter={{
          render: (props, doms) => {
            return [
              <Button htmlType="button" onClick={() => history.goBack()} key="edit">
                返回
              </Button>,
              ...doms,
            ];
          },
        }}
      >
        <ProFormText name="email" label="邮箱" width={300} />
        <ProFormText name="phone" label="手机号" width={300} />
        <ProFormText name="qq" label="QQ" width={300} />
        <ProFormText name="weixin" label="微信" width={300} />
        <ProFormText name="other_contact" label="其他联系方式" width={300} />
        <ProFormTextArea name="other" label="备注" width={300} />
        <ProFormSelect
          width={300}
          name="status"
          label="域名状态"
          options={[
            { label: '正常', value: '0' },
            { label: '已售', value: '1' },
            { label: '不出', value: '2' },
            { label: '跟进', value: '3' },
          ]}
        />
      </ProForm>
    </Card>
  );
};
