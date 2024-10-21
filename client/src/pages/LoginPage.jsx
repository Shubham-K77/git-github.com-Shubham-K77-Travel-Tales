import Navbar from "../components/Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import axios from "axios";

const LoginPage = () => {
  // Constants
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  // State for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  //Handle Login
  const handleLogin = async () => {
    // Start loading
    setLoading(true);
    // Validation: Check if email or password is missing
    if (!email || !password) {
      enqueueSnackbar("Credentials are missing!", { variant: "error" });
      setLoading(false);
      return; // Stop execution if validation fails
    }
    try {
      // Send login request
      const query = await axios.post(
        "https://travel-tales-api.vercel.app/api/v1/users/login/",
        { email, password },
        {
          withCredentials: true,
        }
      );
      // Handle failed login case
      if (!query) {
        enqueueSnackbar("Login failed!", { variant: "error" });
        setLoading(false);
        return; // Stop execution if login fails
      }
      // Successful login
      enqueueSnackbar("Login successful!", { variant: "success" });
      // Reset form
      setEmail("");
      setPassword("");
      // Redirect user to the homepage after 3 seconds
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      // Handle any errors
      enqueueSnackbar("Internal Error! {Server Failed OR Password Wrong!}", {
        variant: "error",
      });
      setLoading(false); // Stop loading on error
      console.error(error);
    } finally {
      setLoading(false); // Ensure loading state is stopped
    }
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
            <form className="flex flex-col justify-evenly items-center">
              <input
                className="w-[78vw] h-[8vh] lg:w-[48vw] lg:h-[10vh] flex justify-center items-center p-2 text-[1.5rem] font-[sans-serif] ring-2 ring-gray-200 hover:ring-2 hover:ring-green-500 rounded-md mb-4"
                name="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
              />
              <input
                className="w-[78vw] h-[8vh] lg:w-[48vw] lg:h-[10vh] flex justify-center items-center p-2 text-[1.5rem] font-[sans-serif] ring-2 ring-gray-200 hover:ring-2 hover:ring-green-500 rounded-md mb-4"
                name="password"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
              />
              <button
                className={`w-[78vw] h-[8vh] lg:w-[48vw] lg:h-[10vh] flex justify-center items-center p-2 text-[1.5rem] font-[sans-serif] rounded-md mb-2 bg-red-500 text-white shadow-md hover:bg-red-600 ${
                  loading ? "animate-pulse" : ""
                }`}
                type="button"
                onClick={handleLogin}
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
