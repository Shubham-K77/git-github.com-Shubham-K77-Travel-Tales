import { useNavigate } from "react-router-dom";
const About = () => {
  const navigate = useNavigate();
  const SignUp = () => {
    navigate("/register");
  };
  return (
    <>
      <div className="w-[98%] h-[200vh] lg:h-[100vh] bg-[#f7f5ec] rounded-md shadow-md flex flex-col justify-around items-center lg:flex-row lg:justify-evenly lg:items-center">
        <div className="w-[95%] h-[105vh] lg:w-[55%] lg:h-[80vh] flex flex-col justify-evenly items-center">
          <div className="lg:w-[50%] lg:h-[10vh] font-cursive text-center text-[3rem] font-bold mb-4">
            Travel Tales
          </div>
          <div className="w-[95%] lg:w-[80%] h-[65vh] lg:h-[55vh]  text-justify font-sansSerif p-2 text-[1rem] lg:text-[1.1rem] lg:mt-6">
            Travel Tales is your gateway to a world of adventures and
            experiences shared by fellow travelers. This platform invites you to
            explore captivating stories, travel tips, and unforgettable moments
            from around the globe. Each narrative is a testament to the beauty
            of exploration and the connections we make along the way. With a
            commitment to safeguarding your data and privacy, we ensure that
            your contributions and interactions remain secure. Join us in
            celebrating the spirit of travel and inspire others with your unique
            tales!
            <div className="text-[1rem] lg:text-[1.1rem] font-bold font-sansSerif mt-2">
              If you use any content from this platform, please credit the
              creator, Shubham Kadariya.
            </div>
          </div>
          <div
            className="bg-[#34aa44] w-[50%] lg:w-[25%] h-[10vh] rounded-md mb-4 font-sansSerif text-center text-[1rem] text-white flex justify-center items-center hover:cursor-pointer hover:bg-green-500 shadow-md"
            onClick={SignUp}
          >
            Share Your Story
          </div>
        </div>
        <div className="w-[90%] h-[80vh] lg:w-[30%] lg:h-[70vh] bg-white flex flex-col justify-evenly items-center shadow-md">
          <div
            className="w-[80%] h-[60vh] lg:w-[90%] lg:h-[55vh] shadow-md rounded-md"
            style={{
              backgroundImage: `url('/Images/homePage.avif')`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          <div className="w-[80%] h-[6vh] lg:w-[90%] lg:h-[5vh] text-[2rem] font-cursive text-center">
            Starry Night
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
