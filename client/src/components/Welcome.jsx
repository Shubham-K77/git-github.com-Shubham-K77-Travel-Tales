import { useNavigate } from "react-router-dom";
const Welcome = () => {
  const navigate = useNavigate();
  const CreatePost = () => {
    navigate("/create");
  };
  return (
    <>
      <div className="w-[98%] h-[200vh] lg:h-[100vh] bg-purple-200 rounded-md shadow-md flex flex-col justify-around items-center lg:flex-row lg:justify-evenly lg:items-center mt-4">
        <div className="w-[95%] h-[105vh] lg:w-[55%] lg:h-[80vh] flex flex-col justify-evenly items-center">
          <div className="lg:w-[50%] lg:h-[10vh] font-cursive text-center text-[3rem] font-bold mb-4 text-gray-800">
            Travel Tales
          </div>
          <div className="w-[95%] lg:w-[80%] h-[65vh] lg:h-[55vh]  text-justify font-sansSerif p-2 text-[1rem] lg:text-[1.1rem] lg:mt-6 text-gray-800">
            Welcome to Travel Tales! We are thrilled to have you here. As a
            valued member, you can easily create your own travel stories to
            share with the community, view your past posts, or edit them to add
            new experiences. If you’re ready to inspire others with your
            adventures, simply click on the Post button. To explore your
            existing stories, navigate to your profile. Don’t forget, when
            you’re done, you can logout securely. Enjoy your journey with us!
          </div>
          <div
            className="bg-[#c63c2e] w-[50%] lg:w-[25%] h-[10vh] rounded-md mt-[-8rem] font-sansSerif text-center text-[1rem] text-white flex justify-center items-center hover:cursor-pointer hover:bg-red-800 lg:mb-4 shadow-md"
            onClick={CreatePost}
          >
            Write Wanderlust
          </div>
        </div>
        <div className="w-[90%] h-[80vh] lg:w-[30%] lg:h-[70vh] bg-white flex flex-col justify-evenly items-center shadow-md">
          <div
            className="w-[80%] h-[60vh] lg:w-[90%] lg:h-[55vh] shadow-md rounded-md"
            style={{
              backgroundImage: `url('/Images/tokyo.avif')`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          <div className="w-[80%] h-[6vh] lg:w-[90%] lg:h-[5vh] text-[2rem] font-cursive text-center">
            Tokyo Tales!
          </div>
        </div>
      </div>
    </>
  );
};

export default Welcome;
