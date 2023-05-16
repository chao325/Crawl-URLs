import React from 'react';
import { Select, Input, Space } from 'antd';

const { Option } = Select;
const options = [
  {
    value: '=',
    label: '等于 =',
  },
  {
    value: '>',
    label: '大于 >',
  },
  {
    value: '<',
    label: '小于 <',
  },
];
export default (props) => {
  const { value = { '=': '' }, onChange } = props;
  const handleSelect = (val) => onChange && onChange({ [val]: value[1] });
  const handleInput = (e) => onChange && onChange({ [value[0]]: e.target.value });

  return (
    <div>
      {/* <Select value={value[0]} onChange={handleSelect}>
        <Option value="option1">Option 1</Option>
        <Option value="option2">Option 2</Option>
        <Option value="option3">Option 3</Option>
      </Select>
      <Input value={value[1]} onChange={handleInput} /> */}
      <Space.Compact>
        <Select
          value={Object.keys(value)[0]}
          defaultValue="="
          onChange={handleSelect}
          options={options}
        />
        <Input value={Object.values(value)[0]} onChange={handleInput} />
      </Space.Compact>
    </div>
  );
};
