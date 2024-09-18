import { useState } from "react";
import CommonForm from "../../components/common/Form";
import { loginFormControls } from "../../config";
import useLogin from "../../hooks/useLogin";

const initialState = {
  username: "",
  password: "",
};

const Login = () => {
  const [formData, setFormData] = useState(initialState);

  const { loading, login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData);
  };
  return (
    <CommonForm
      formTitle={"Login"}
      buttonText={"Login"}
      formControls={loginFormControls}
      formData={formData}
      setFormData={setFormData}
      handleSubmit={handleSubmit}
      isLogin
      disabledBtn={loading}
    />
  );
};

export default Login;
