import React, { useState, useEffect, useRef } from 'react';
import { Button, Popconfirm, Modal, Form, Input, message } from 'antd';

export default (props) => {
  const [Password, setPassword] = useState({ isPassword: false, value: '' });
  const [isShow, setIsShow] = useState(false);

  const handeOpenModal = () => {
    setIsShow(true);
  };

  const handeOK = () => {
    if (Password.value === 'shujuku321') {
      setPassword({ isPassword: true });
      message.success('密码正确');
    } else {
      message.error('密码错误！');
      setPassword({ isPassword: false });
      setIsShow(false);
    }
  };
  return (
    <div>
      <Button type="primary" htmlType="Submit">
        用户设置
      </Button>
      <Button style={{ margin: '0 2em' }} type="primary" onClick={handeOpenModal}>
        数据库设置
      </Button>
      <Modal
        title="设置"
        open={isShow}
        onOk={handeOK}
        cancelText="关闭"
        onCancel={() => {
          setPassword({ isPassword: false });
          setIsShow(false);
        }}
        closable={false}
      >
        {!Password.isPassword ? (
          <>
            <p>密码：</p>
            <Input
              type="password"
              onChange={(res) => {
                setPassword({ value: res.target.value });
              }}
            />
          </>
        ) : (
          <>
            <Button style={{ margin: '0 2em' }} type="primary">
              清空数据库---百度
            </Button>
          </>
        )}
      </Modal>
    </div>
  );
};
