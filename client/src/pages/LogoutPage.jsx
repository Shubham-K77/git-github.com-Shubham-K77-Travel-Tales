import axios from "axios";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
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
            dispatch(clearUserInfo());
            enqueueSnackbar("Logging Out! Success!", { variant: "success" });
            setTimeout(() => {
              navigate("/");
            }, 3000);
          }
        } catch (error) {
          enqueueSnackbar("Internal Error!", { variant: "error" });
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
