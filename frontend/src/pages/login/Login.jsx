import { useState } from "react";
import CommonForm from "../../components/common/Form";
import { loginFormControls } from "../../config";

const initialState = {
  username: "",
  password: "",
};

const Login = () => {
  const [formData, setFormData] = useState(initialState);

  const handleSubmit = () => {};
  return (
    <CommonForm
      formTitle={"Login"}
      buttonText={"Login"}
      formControls={loginFormControls}
      formData={formData}
      setFormData={setFormData}
      handleSubmit={handleSubmit}
      isLogin
    />
  );
};

export default Login;
