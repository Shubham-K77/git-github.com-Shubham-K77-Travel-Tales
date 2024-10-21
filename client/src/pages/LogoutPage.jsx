import axios from "axios";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useSelector } from "react-redux";

const LogoutPage = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(true);
  const userToken = useSelector((state) => state.user.userData);

  useEffect(() => {
    if (!userToken) {
      enqueueSnackbar("User Not Logged In!", { variant: "warning" });
      navigate("/");
    } else {
      const handleLogout = async () => {
        try {
          const response = await axios.post(
            "https://travel-tales-api.vercel.app/api/v1/users/logout",
            {},
            { withCredentials: true }
          );

          if (response.status === 200) {
            enqueueSnackbar("Logging Out! Success!", { variant: "success" });
            setTimeout(() => {
              navigate("/");
            }, 3000);
          } else {
            enqueueSnackbar("Logging Out! Failed!", { variant: "error" });
            setTimeout(() => {
              navigate("/logout");
            }, 2000);
          }
        } catch (error) {
          enqueueSnackbar("Internal Error!", { variant: "warning" });
          console.error("Logout failed:", error);
        } finally {
          setLoading(false);
        }
      };
      handleLogout();
    }
  }, [enqueueSnackbar, navigate, userToken]);
  return (
    <div className="min-h-screen flex items-center justify-center">
      {loading ? (
        <div className="animate-spin text-[2rem]">
          <AiOutlineLoading3Quarters />
        </div>
      ) : (
        <div className="text-[2rem] animate-pulse">Redirecting...</div>
      )}
    </div>
  );
};

export default LogoutPage;
