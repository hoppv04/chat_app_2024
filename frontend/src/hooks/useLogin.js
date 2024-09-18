import { useState } from "react";
import { toast } from "react-hot-toast";
import { useAuthContext } from "../contexts/AuthContext";

const handleInputErrors = (formData) => {
  if (!formData.username || !formData.password) {
    toast.error("Please fill in all fields!");
    return false;
  }

  return true;
};

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async (formData) => {
    const isSuccess = handleInputErrors(formData);
    if (!isSuccess) return;

    try {
      setLoading(true);

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthUser(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

export default useLogin;
