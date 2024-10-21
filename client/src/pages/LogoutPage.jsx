import axios from "axios";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { clearUserInfo } from "path_to_your_userSlice"; // Adjust the path

const LogoutPage = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(true);
  const userToken = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userToken) {
      enqueueSnackbar("User Not Logged In!", { variant: "warning" });
      setLoading(false);
      navigate("/"); // Redirect to home if user is not logged in
    } else {
      const handleLogout = async () => {
        try {
          const response = await axios.post(
            "https://travel-tales-api.vercel.app/api/v1/users/logout",
            {},
            { withCredentials: true }
          );

          if (response.status === 200) {
            dispatch(clearUserInfo());
            enqueueSnackbar("Logged out successfully!", { variant: "success" });
            setTimeout(() => {
              navigate("/"); // Redirect to home after successful logout
            }, 3000);
          } else {
            enqueueSnackbar("Logout failed! Please try again.", {
              variant: "error",
            });
          }
        } catch (error) {
          // Display specific error messages if possible
          const errorMessage =
            error.response?.data?.message || "Internal Error!";
          enqueueSnackbar(errorMessage, { variant: "error" });
          console.error("Logout failed:", error);
        } finally {
          setLoading(false);
        }
      };

      handleLogout();
    }
  }, [enqueueSnackbar, navigate, userToken, dispatch]);

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
