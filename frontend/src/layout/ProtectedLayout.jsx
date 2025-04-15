import React, { Children, useCallback, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Message from "../components/Message/Message";
import { useDispatch, useSelector } from "react-redux";
import { Layout, Menu } from "antd";
import {
  HomeOutlined,
  LoginOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ProfileOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { GetCurrentUser, HandleUserLogout } from "../api/user";
import { hideLoading, setMessage, showLoading } from "../store/ui";
import { setUser } from "../store/userSlice";

const { Header, Content, Footer, Sider } = Layout;

const ProtectedLayout = () => {
  const { loading } = useSelector((state) => state.ui.loader);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getValidUser = useCallback(async () => {
    try {
      dispatch(showLoading());
      const response = await GetCurrentUser();
      if (response.success) {
        dispatch(setUser(response.user));
      } else {
        throw new Error("Unauthorized");
      }
    } catch (err) {
      navigate("/login");
      dispatch(
        setMessage({
          type: "error",
          // eslint-disable-next-line no-constant-binary-expression
          content: "Unauthorized access. Please login." || err.message,
        })
      );
    } finally {
      dispatch(hideLoading());
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    getValidUser();
  }, [getValidUser]);

  const handleLogout = async () => {
    const response = await HandleUserLogout();

    if (response.success) {
      navigate("/login");
      dispatch(
        setMessage({
          type: "success",
          content: response.message,
        })
      );
    } else {
      dispatch(
        setMessage({
          type: "error",
          content: "Try Again",
        })
      );
    }
  };

  const navItems = [
    {
      key: "home",
      label: <span onClick={() => navigate("/", { replace: true })}>Home</span>,
      icon: <HomeOutlined />,
    },
    {
      key: "roleProfile",
      label: (
        <span
          onClick={() => {
            if (user.role === "admin") {
              navigate("/admin", { replace: true });
            } else if (user.role === "partner") {
              navigate("/partner", { replace: true });
            } else {
              navigate("/profile", { replace: true });
            }
          }}
        >
          {user?.role === "admin" && "Movie Management"}
          {user?.role === "partner" && "Theatre Management"}
          {user?.role === "user" && "My Bookings"}
        </span>
      ),
      icon: <ProfileOutlined />,
    },
    {
      key: "profile",
      label: `${user ? user.name : ""}`,
      icon: <UserOutlined />,
      children: [
        {
          key: "logout",
          label: <span onClick={handleLogout}>Logout </span>,
          icon: <LoginOutlined />,
        },
      ],
    },
  ];

  return (
    <>
      <Message />
      <Layout>
        <Header
          className="d-flex justify-content-between"
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            width: "100%",
            alignItems: "center",
          }}
        >
          <h3 className="text-white m-0" style={{ color: "white" }}>
            BookMyShow
          </h3>
          <Menu theme="dark" mode="horizontal" items={navItems} />
        </Header>
        <Content style={{ maxHeight: "100vh" }}>
          {loading && (
            <div className="loader-container">
              <div className="loader"></div>
            </div>
          )}
          <Outlet />
        </Content>
        <Footer
          style={{
            textAlign: "center",
            background: "#001529",
            color: "white",
            position: "absolute",
            bottom: 0,
            zIndex: 1,
            width: "100%",
          }}
        >
          BookMyShow ©{new Date().getFullYear()} Created by Scaler
        </Footer>
      </Layout>
    </>
  );
};

export default ProtectedLayout;
