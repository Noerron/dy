import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import BloggerInformation from "./pages/Blogger_information";
import VideoInformation from "./pages/Video_information";
import { Switch, Route, useHistory, Redirect } from "react-router-dom";
const { Header, Sider, Content } = Layout;
const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const history = useHistory();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const menu = (e) => {
    history.push(e.key);
  };
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "/bloggerinformation",
              icon: <UserOutlined />,
              label: "博主信息",
            },
            {
              key: "/videoinformation",
              icon: <VideoCameraOutlined />,
              label: "视频信息",
            },
          ]}
          onClick={menu}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Switch>
            <Route path="/bloggerinformation" component={BloggerInformation} />
            <Route path="/videoinformation" component={VideoInformation} />
            <Redirect to="/bloggerinformation" />
          </Switch>
        </Content>
      </Layout>
    </Layout>
  );
};
export default App;
