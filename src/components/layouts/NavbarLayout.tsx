import {
  Layout,
  Menu,
  Avatar,
  Dropdown,
  Drawer,
  Button,
  type MenuProps,
} from "antd";
import { MenuOutlined, LogoutOutlined } from "@ant-design/icons";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./NavbarLayout.css";
import { useState } from "react";

const NavbarLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const username = Cookies.get("username") || "A";
  const { Header, Content } = Layout;
  const [drawerVisible, setDrawerVisible] = useState(false);

  // Navbar options
  const menuItems = [
    {
      label: "Dashboard", // option label
      key: "/dashboard", // url to navigate
    },
    {
      label: "Budget",
      key: "/inputs",
    },
    {
      label: "Transactions",
      key: "/transactions",
    },
    {
      label: "Global Settings",
      key: "/settings",
    },
  ];

  // User menu to logout
  const userProfileMenu: MenuProps["items"] = [
    {
      key: "1",
      label: "Logout",
      icon: <LogoutOutlined />,
      onClick: () => handleLogout,
    },
  ];

  // remove tokens and go to login page
  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("username");
    navigate("/");
  };

  // for movile responsive navbar menu
  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
    setDrawerVisible(false);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header className="navbar-header">
        {/* mobile menu button */}
        <div className="navbar-left">
          <Button
            className="menu-toggle"
            icon={<MenuOutlined />}
            onClick={() => setDrawerVisible(true)}
            type="text"
          />
        </div>

        {/* Nav bar */}
        <div className="navbar-right">
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[location.pathname]}
            items={menuItems}
            onClick={handleMenuClick}
            className="navbar-menu"
          />

          {/* User profile menu */}
          <Dropdown menu={{ items: userProfileMenu }} trigger={["click"]}>
            {/* First letter of user made into profile picture */}
            <Avatar
              className="profile-avatar"
              style={{ backgroundColor: "#87d068" }}
            >
              {username[0]}
            </Avatar>
          </Dropdown>
        </div>
      </Header>

      {/* mobile nav bar menu */}
      <Drawer
        title="Menu"
        placement="left"
        closable
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
      >
        <Menu
          mode="vertical"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
        />
      </Drawer>

      {/* Children components go here */}
      <Content className="navbar-content">
        <Outlet />
      </Content>
    </Layout>
  );
};

export default NavbarLayout;
