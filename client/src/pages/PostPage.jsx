import Navbar from "../components/Navbar";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import { FaSpinner } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { MdEdit, MdDelete } from "react-icons/md";

const PostPage = () => {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const userId = useSelector((state) => state.user.userData);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5555/api/v1/posts/post/${id}`
        );
        const postData = response.data.data;
        setPost(postData);
      } catch (error) {
        console.error(error);
        enqueueSnackbar("Unable To Retrieve!", { variant: "error" });
      }
    };
    fetchPost();
  }, [enqueueSnackbar, id]);
  const navigateToEdit = () => {
    navigate(`/edit/${post._id}`);
  };
  const navigateToDelete = () => {
    navigate(`/delete/${post._id}`);
  };
  if (!post) {
    return (
      <div className="w-full h-[100vh] flex justify-center items-center">
        <FaSpinner className="text-[3rem] animate-spin" />
      </div>
    );
  }
  const date = new Date(post.createdAt).toLocaleDateString();
  return (
    <div className="min-h-screen w-full flex flex-col items-center">
      <div className="w-full flex justify-center items-center">
        <Navbar />
      </div>
      <div className="mt-[3rem] w-[98%] mb-4 flex flex-col items-center">
        <div className="w-[90%] h-[80vh] lg:w-[40%] lg:h-[100vh] bg-[#f7f5ec] flex flex-col justify-center items-center rounded-md shadow-md mb-[2rem]">
          <div className="text-right font-cursive text-[1.25rem] mt-2 text-teal-500 font-bold">
            {date}
          </div>
          <div
            className="w-[90%] h-[65vh] lg:w-[80%] lg:h-[80vh] mt-6 mb-4 rounded-md shadow-md"
            style={{
              backgroundImage: `url('${post.file}')`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          <div className="flex justify-evenly items-center">
            <div className="text-center font-cursive lg:text-[2.15rem] text-[2rem] mr-6 font-bold flex justify-center items-center ">
              {post.title}
            </div>
            <div className="text-right font-cursive text-[1.5rem] pr-1">
              By:{post.author.name}
            </div>
          </div>
        </div>
        {userId?._id === post.author._id ? (
          <div className="w-full flex flex-row justify-evenly lg:justify-center items-center">
            <div
              className="bg-green-500 h-[9.5vh] w-[40%] lg:w-[15%] mt-4 mb-4 rounded-md shadow-md font-sansSerif text-[1.5rem] text-center flex justify-center items-center text-white hover:cursor-pointer hover:bg-green-600 lg:mr-[2rem]"
              onClick={navigateToEdit}
            >
              <MdEdit className="text-[2rem] mr-1" />
              Edit
            </div>
            <div
              className="bg-indigo-500 h-[9.5vh] w-[40%] lg:w-[15%] mt-4 mb-4 rounded-md shadow-md font-sansSerif text-[1.5rem] text-center flex justify-center items-center text-white hover:cursor-pointer hover:bg-indigo-600 mr-[1rem] lg:mr-0"
              onClick={navigateToDelete}
            >
              <MdDelete className="text-[2rem] mr-1" />
              Delete
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="text-center lg:text-justify text-[1.25rem] font-sansSerif p-6 mb-[1rem] font-bold">
          {post.summary}
        </div>
        <div className="w-full lg:w-full text-justify text-[18px] lg:p-[2rem] p-4 mb-4 font-notosans leading-relaxed">
          {post.content}
        </div>
      </div>
    </div>
  );
};

export default PostPage;
