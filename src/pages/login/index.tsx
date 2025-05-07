import { Form, Button, type FormProps, notification } from "antd";
import "./index.css";
import FloatingLableInput from "../../components/login/FloatingLableInput";
import { UserLogin } from "../../apis/auth";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  interface FieldType {
    username: string;
    password: string;
  }

  const handleOnFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      const response = await UserLogin(values.username, values.password);
      notification.success({
        message: "Login Success",
        description: `Welcome ${response.data.data.name}`,
      });
      navigate("/dashboard");
    } catch (err) {
      notification.error({
        message: "Login Failed",
        description: "Incorrect Username or Password",
      });
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <Form name="login" onFinish={handleOnFinish} className="login-form">
          <h2 className="login-title">Login</h2>
          <FloatingLableInput
            name="username"
            rules={[
              { required: true, message: "Username is required" },
              { type: "email", message: "Please enter a valid email" },
            ]}
            label="Username"
          />
          <FloatingLableInput
            name="password"
            rules={[{ required: true, message: "Password is required" }]}
            label="Password"
            isPassword={true}
          />
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-button">
              Log In
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
