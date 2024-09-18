import { useState } from "react";
import CommonForm from "../../components/common/Form";
import { signUpFormControls } from "../../config";
import useSignUp from "../../hooks/useSignUp";

const initialState = {
  fullName: "",
  username: "",
  password: "",
  confirmPassword: "",
  gender: "",
};

const SignUp = () => {
  const [formData, setFormData] = useState(initialState);

  const { loading, signUp } = useSignUp();

  const handleCheckboxChange = (gender) => {
    setFormData({ ...formData, gender });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signUp(formData);
  };

  return (
    <CommonForm
      formTitle={"Sign In"}
      buttonText={"Sign In"}
      formControls={signUpFormControls}
      formData={formData}
      setFormData={setFormData}
      handleSubmit={handleSubmit}
      handleCheckboxChange={handleCheckboxChange}
      selectedGender={formData.gender}
      disabledBtn={loading}
    />
  );
};

export default SignUp;
