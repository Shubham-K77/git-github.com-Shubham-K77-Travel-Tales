import Navbar from "../components/Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import axios from "axios";

const LoginPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    if (!email || !password) {
      enqueueSnackbar("Credentials are missing!", { variant: "error" });
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "https://travel-tales-api.vercel.app/api/v1/users/login/",
        { email, password },
        { withCredentials: true }
      );

      if (!response.data) {
        enqueueSnackbar("Login failed!", { variant: "error" });
        setLoading(false);
        return;
      }

      enqueueSnackbar("Login successful!", { variant: "success" });
      setEmail("");
      setPassword("");

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response.data);
        enqueueSnackbar(error.response.data.message || "Internal Error!", {
          variant: "error",
        });
      } else {
        console.error("Error:", error.message);
        enqueueSnackbar("Internal Error! {Server Failed OR Password Wrong!}", {
          variant: "error",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    handleLogin();
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <Navbar />
      <div className="w-[95%] h-[180vh] lg:h-[120vh] flex mt-8 mb-8 flex-col items-center justify-around lg:flex-row lg:justify-evenly lg:items-center">
        <div
          className="w-[95%] lg:w-[35%] h-[80vh] lg:h-[110vh] shadow-md"
          style={{
            backgroundImage: `url('Images/login.avif')`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        ></div>
        <div className="w-[95%] lg:w-[60%] h-[95vh] lg:h-[110vh] shadow-md flex flex-col justify-evenly items-center">
          <div className="flex flex-col justify-evenly items-center lg:flex-row lg:justify-evenly lg:items-center p-2 mb-2 lg:w-full w-[90%]">
            <div
              className="w-[38vw] h-[26vh] lg:h-[34vh] lg:w-[16vw] rounded-[50%] lg:mr-0"
              style={{
                backgroundImage: `url('Images/logo.png')`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            ></div>
            <div className="text-[2rem] lg:text-[2.75rem] font-[sans-serif] text-justify font-bold text-orange-500">
              Authenticate
            </div>
          </div>
          <div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col justify-evenly items-center"
            >
              <input
                className="w-[78vw] h-[8vh] lg:w-[48vw] lg:h-[10vh] flex justify-center items-center p-2 text-[1.5rem] font-[sans-serif] ring-2 ring-gray-200 hover:ring-2 hover:ring-green-500 rounded-md mb-4"
                name="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                className="w-[78vw] h-[8vh] lg:w-[48vw] lg:h-[10vh] flex justify-center items-center p-2 text-[1.5rem] font-[sans-serif] ring-2 ring-gray-200 hover:ring-2 hover:ring-green-500 rounded-md mb-4"
                name="password"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                className={`w-[78vw] h-[8vh] lg:w-[48vw] lg:h-[10vh] flex justify-center items-center p-2 text-[1.5rem] font-[sans-serif] rounded-md mb-2 bg-red-500 text-white shadow-md hover:bg-red-600 ${
                  loading ? "animate-pulse" : ""
                }`}
                type="submit"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
