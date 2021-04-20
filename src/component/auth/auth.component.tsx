import React from "react";
import { Form, Input, Button } from "antd";
import { useDispatch } from "react-redux";
import { setData } from "../../state/reducer";
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
type AuthType = {
  username: string;
  password: string;
};

export const Auth = () => {
  const dispatch = useDispatch();

  const onFinish = (values: AuthType) => {
    const formData = new FormData();
    formData.append("username", values.username);
    formData.append("password", values.password);
    fetch("http://test-alpha.reestrdoma.ru/api/login/", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(setData(data));
      });
  };

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        label="Username"
        name="username"
        initialValue="superuser@mail.ru"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        initialValue="11111111"
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
