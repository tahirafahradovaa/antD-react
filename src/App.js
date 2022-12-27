import "./App.css";
import { Route, Link, Routes } from "react-router-dom";
import Products from "./Products/Products";

import { Layout, Menu, theme } from "antd";
const { Header, Content, Footer } = Layout;
function App() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  let menus = [
    {
      key: 1,
      label: <Link to="/">Products</Link>,
    },
  ];
  return (
    <Layout>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
        }}
      >
        <div
          style={{
            float: "left",
            width: 120,
            height: 31,
            margin: "16px 24px 16px 0",
            background: "rgba(255, 255, 255, 0.2)",
          }}
        />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={menus}
        />
      </Header>
      <Content
        className="site-layout"
        style={{
          padding: "0 50px",
        }}
      >
        <div
          style={{
            padding: 24,
            minHeight: 380,
            background: colorBgContainer,
          }}
        >
          <Routes>
            <Route path="/" element={<Products />}></Route>
          </Routes>
        </div>
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
}

export default App;
