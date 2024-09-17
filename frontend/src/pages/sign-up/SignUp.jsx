import { useState } from "react";
import CommonForm from "../../components/common/Form";
import { signUpFormControls } from "../../config";

const initialState = {
  fullName: "",
  username: "",
  password: "",
  confirmPassword: "",
  gender: "",
};

const SignUp = () => {
  const [formData, setFormData] = useState(initialState);

  const handleSubmit = () => {};
  return (
    <CommonForm
      formTitle={"Sign In"}
      buttonText={"Sign In"}
      formControls={signUpFormControls}
      formData={formData}
      setFormData={setFormData}
      handleSubmit={handleSubmit}
    />
  );
};

export default SignUp;
