import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  // Access the snackbar context
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  // Registration Elements
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Function Handling The Rest API:
  const registerUser = async () => {
    try {
      setLoading(true);
      if (!name || !email || !password) {
        enqueueSnackbar("The Credentials Are Missing!", { variant: "warning" });
        setLoading(false);
        return;
      }
      //The Password's Didn't Matched
      if (password !== confirmPassword) {
        enqueueSnackbar("User Creation Failed! Password's Didn't Matched!", {
          variant: "error",
        });
        setLoading(false);
        return;
      }
      // Data are filled properly
      const create = await axios.post(
        "http://localhost:5555/api/v1/users/register/",
        {
          name,
          email,
          password,
        }
      );
      //Creation Failure!
      if (!create) {
        enqueueSnackbar("User Creation Failed!", { variant: "info" });
        return;
      }
      //Creation Success!
      enqueueSnackbar("User Creation Successful!", { variant: "success" });
      //Reset The Field Values
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      //Resend The User Back To HomePage
      setTimeout(() => {
        navigate("/");
      }, 2000);
      setLoading(false);
    } catch (error) {
      enqueueSnackbar(
        "Internal Error! Request Failed! Password's Didn't Matched!",
        { variant: "error" }
      );
      console.error(error);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <Navbar />
      <div className="w-[95%] h-[180vh] lg:h-[120vh] flex mt-8 mb-8 flex-col items-center justify-around lg:flex-row lg:justify-evenly lg:items-center">
        <div
          className="w-[95%] lg:w-[35%] h-[80vh] lg:h-[110vh] shadow-md"
          style={{
            backgroundImage: `url('Images/signup.avif')`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        ></div>
        <div className="w-[95%] lg:w-[60%] h-[95vh] lg:h-[110vh] shadow-md flex flex-col justify-evenly items-center">
          <div className="flex flex-col justify-evenly items-center lg:flex-row lg:justify-evenly lg:items-center p-2 mb-2 lg:w-full w-[90%]">
            <div
              className="w-[38vw] h-[26vh] lg:h-[34vh] lg:w-[16vw] rounded-[50%]"
              style={{
                backgroundImage: `url('Images/logo.png')`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            ></div>
            <div className="text-[2rem] lg:text-[2.75rem] font-[sans-serif] text-justify font-bold text-orange-500">
              Get Started
            </div>
          </div>
          <div>
            <form className="flex flex-col justify-evenly items-center">
              <input
                className="w-[78vw] h-[8vh] lg:w-[48vw] lg:h-[10vh] flex justify-center items-center p-2 text-[1.5rem] font-[sans-serif] ring-2 ring-gray-200 hover:ring-2 hover:ring-green-500 rounded-md mb-4"
                name="name"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
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
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <input
                className="w-[78vw] h-[8vh] lg:w-[48vw] lg:h-[10vh] flex justify-center items-center p-2 text-[1.5rem] font-[sans-serif] ring-2 ring-gray-200 hover:ring-2 hover:ring-green-500 rounded-md mb-4"
                name="Confirm Password"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                className={`w-[78vw] h-[8vh] lg:w-[48vw] lg:h-[10vh] flex justify-center items-center p-2 text-[1.5rem] font-[sans-serif] rounded-md mb-2 bg-blue-500 text-white shadow-md hover:bg-blue-600 ${
                  loading === true ? "animate-pulse" : ""
                }`}
                onClick={registerUser}
                type="button"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
