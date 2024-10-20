import { useNavigate } from "react-router-dom";
const ErrorPage = () => {
  const navigate = useNavigate();
  const redirectToHome = () => {
    navigate("/");
  };
  return (
    <div className="w-full h-[200vh] lg:h-[100vh] flex lg:flex-row lg:justify-center lg:items-center flex-col justify-around items-center bg-[#f7f5ec]">
      <div
        className="w-[95%] lg:w-[30%] h-[120vh] lg:h-[80vh] rounded-tl-md rounded-bl-md shadow-md hover:cursor-pointer transition-transform duration-100 hover:animate-bounce"
        style={{
          backgroundImage: `url('/Images/404.webp')`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        onClick={redirectToHome}
      ></div>
      <div className="w-[95%] lg:w-[50%] h-[70vh] lg:h-[80vh] rounded-tr-md rounded-br-md shadow-md flex flex-col justify-center items-center font-montserrat font-bold text-[3.75rem] text-center bg-purple-200 text-[#c63c2e]">
        <div className="text-[3.25rem] flex justify-center items-center font-sansSerif mb-2">
          <div>4</div>
          <div className="transition-transform duration-500 hover:cursor-pointer hover:rotate-[360deg]">
            0
          </div>
          <div>4</div>
        </div>
        <div className="mb-4">PAGE NOT FOUND</div>
        <div
          className="text-[1.25rem] hover:cursor-pointer"
          onClick={redirectToHome}
        >
          Go Back To Home
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
