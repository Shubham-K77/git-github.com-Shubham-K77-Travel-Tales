import { useNavigate } from "react-router-dom";
// eslint-disable-next-line react/prop-types
const Blogs = ({ id, title, summary, createdAt, author, file }) => {
  createdAt = new Date(createdAt).toLocaleString();
  // eslint-disable-next-line react/prop-types
  file = file.replace(/\\/g, "/");
  const navigate = useNavigate();
  const singlePost = () => {
    navigate(`/post/${id}`);
  };
  return (
    <div className="w-[100%] flex flex-col justify-evenly items-center">
      <div className="w-[95%] h-[160vh] lg:w-[65%] lg:h-[65vh] bg-transparent rounded-md flex flex-col justify-evenly items-center lg:flex-row lg:justify-evenly lg:items-center mt-[1.25rem] mb-4 ">
        <div
          className="w-[95%] h-[80vh] lg:w-[32%] lg:h-[45vh] ring-2 ring-gray-200 hover:cursor-pointer"
          style={{
            backgroundImage: `url('http://localhost:5555/${file}')`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
          onClick={singlePost}
        ></div>
        <div className="w-[80%] h-[75vh] lg:w-[62%] lg:h-[45vh] flex flex-col justify-evenly items-center lg:flex-row lg:justify-center lg:items-center">
          <div className="w-[100%] h-[65vh] lg:w-[80%] lg:h-[35vh] flex flex-col justify-evenly items-center">
            <div
              className="lg:text-[2.5rem] font-[serif] font-bold hover:cursor-pointer hover:underline text-[2rem] flex justify-center items-center text-center"
              onClick={singlePost}
            >
              {title}
            </div>
            <div className="flex flex-col justify-around items-center  lg:flex-row lg:justify-around lg:items-center text-slate-600 font-semibold">
              <div className="text-justify text-[1rem] font-[sans-serif] p-2">
                {author}
              </div>
              <div className="text-justify text-[1rem] font-[sans-serif] p-2">
                {createdAt}
              </div>
            </div>
            <div className="text-justify text-[1rem] font-[sans-serif] p-2">
              {summary}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
