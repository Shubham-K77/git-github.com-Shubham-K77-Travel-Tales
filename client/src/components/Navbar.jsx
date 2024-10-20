import { RiLoginCircleLine } from "react-icons/ri";
import { CiBookmarkPlus } from "react-icons/ci";
import { useEffect } from "react";
import axios from "axios";
import { IoMdCreate } from "react-icons/io";
import { IoMdLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../slices/userSlice";
const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);
  useEffect(() => {
    const userFetcher = async () => {
      try {
        const response = await axios.get(
          "https://travel-tales-api.vercel.app/api/v1/users/fetchCookie",
          { withCredentials: true }
        );
        console.log(response);
        dispatch(setUserInfo(response.data.userData));
      } catch (error) {
        dispatch(setUserInfo(null));
        console.error("Error fetching user data:", error);
      }
    };
    userFetcher();
  }, [dispatch]);

  return (
    <div className="w-full lg:w-[98%] h-[22vh] flex justify-around items-center border-b-2 border-gray-300">
      <div
        className="w-[55%] h-[18vh] lg:w-[30%] font-cursive text-[3rem] flex justify-center items-center hover:cursor-pointer font-bold"
        onClick={() => navigate("/")}
      >
        {userData ? userData.name : `TravelTales`}
      </div>
      <div className="w-[35%] h-[18vh] lg:w-[30%] flex justify-evenly items-center mb-4">
        {userData && (
          <>
            <div
              className="h-[10vh] w-[45%] lg:h-[8vh] lg:w-[25%] bg-green-500 rounded-md text-white flex justify-center items-center text-[2.5rem] font-bold hover:cursor-pointer hover:bg-green-600"
              onClick={() => navigate("/create")}
            >
              <IoMdCreate />
            </div>
            <div
              className="h-[10vh] w-[45%] lg:h-[8vh] lg:w-[25%] bg-indigo-500 rounded-md text-white flex justify-center items-center text-[2.5rem] font-bold hover:cursor-pointer hover:bg-indigo-600"
              onClick={() => navigate("/logout")}
            >
              <IoMdLogOut />
            </div>
          </>
        )}
        {!userData && (
          <>
            <div
              className="h-[10vh] w-[45%] lg:h-[8vh] lg:w-[25%] bg-red-500 rounded-md text-white flex justify-center items-center text-[2.5rem] font-bold hover:cursor-pointer hover:bg-red-600"
              onClick={() => navigate("/login")}
            >
              <RiLoginCircleLine />
            </div>
            <div
              className="h-[10vh] w-[45%] lg:h-[8vh] lg:w-[25%] bg-blue-500 rounded-md text-white flex justify-center items-center text-[2.5rem] font-bold hover:cursor-pointer hover:bg-blue-600"
              onClick={() => navigate("/register")}
            >
              <CiBookmarkPlus />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
