import React, { useState, useEffect, useRef } from 'react';
import { Button, Popconfirm, Modal, Form, Input, message } from 'antd';

export default (props) => {
  return (
    <div>
      <Input />
      <Button type="primary" htmlType="Submit">
        确定
      </Button>
    </div>
  );
};
