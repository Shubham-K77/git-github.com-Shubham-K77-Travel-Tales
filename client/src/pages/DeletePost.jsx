import axios from "axios";
import Navbar from "../components/Navbar";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useSnackbar } from "notistack";

const DeletePost = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.userData);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "backquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  useEffect(() => {
    if (userData === null) {
      enqueueSnackbar("Must Login To Access!", { variant: "error" });
      return navigate("/");
    }

    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5555/api/v1/posts/post/${id}`
        );
        const data = response.data.data;
        data.file = data.file.replace(/\\/g, "/");
        setPost(data);
      } catch {
        enqueueSnackbar("Can't Retrieve The Data!", { variant: "error" });
      }
    };

    fetchPost();
  }, [enqueueSnackbar, id, navigate, userData]);

  const submitDelete = async () => {
    try {
      setLoading(true);
      const query = await axios.delete(
        `http://localhost:5555/api/v1/posts/delete/${id}`
      );
      if (!query || query.status !== 200) {
        setLoading(false);
        return enqueueSnackbar("Unable To Delete Post!", { variant: "error" });
      }
      enqueueSnackbar("Successfully Deleted The Post!", { variant: "success" });
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch {
      setLoading(false);
      enqueueSnackbar("Error In The Server!", { variant: "error" });
    }
  };

  if (!post) {
    return <div>Loading post data...</div>; // Show loading indicator
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center">
      <Navbar />
      <div className="w-[98%] h-[220vh] flex flex-col justify-evenly items-center lg:flex-row lg:justify-around lg:items-center lg:h-[140vh] mt-[1rem] mb-[1rem]">
        <div
          className="w-[98%] mb-[2rem] h-[90vh] lg:h-[140vh] lg:w-[38%] lg:mt-[0.85rem] shadow-md lg:shadow-xl lg:mb-0"
          style={{
            backgroundImage: `url('http://localhost:5555/${post.file}')`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        ></div>
        <div className="w-[98%] mt-[1rem] flex flex-col justify-around items-center p-[1rem] h-[120vh] lg:h-[140vh] mb-[1rem] lg:w-[60%] shadow-md lg:p-0">
          <div className="h-[32vh] w-[95%] lg:h-[14vh] flex justify-around items-center lg:w-[50vw]">
            <div
              className="h-[33vh] w-[44%] lg:h-[36vh] lg:w-[26%] rounded-[50%]"
              style={{
                backgroundImage: `url('/Images/logo.png')`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            ></div>
            <div className="w-[52%] h-[22vh] lg:h-[30.5vh] lg:w-[70%] text-[2rem] font-bold flex justify-center items-center lg:text-[3.5rem] text-rose-500 mr-4 lg:mr-0 ml-4 lg:ml-0">
              DELETE POST
            </div>
          </div>
          <form>
            <div className="mb-[1rem]">
              <input
                type="text"
                placeholder="Title"
                name="title"
                value={post.title}
                className="h-[8.5vh] w-[88vw] p-2 text-[1.25rem] text-black border-2 hover:ring-2 rounded-md hover:ring-green-500 lg:h-[10vh] lg:text-[1.5rem] lg:w-[52vw]"
                disabled
              />
            </div>
            <div className="mb-[1rem]">
              <input
                type="text"
                placeholder="Summary"
                name="summary"
                value={post.summary}
                className="h-[8.5vh] w-[88vw] p-2 text-[1.25rem] text-black border-2 hover:ring-2 rounded-md hover:ring-green-500 lg:h-[10vh] lg:text-[1.5rem] lg:w-[52vw]"
                disabled
              />
            </div>
            <div className="mb-[2rem] lg:mb-[1rem]">
              <ReactQuill
                theme="snow"
                className="h-[16vh] mb-[1rem]"
                modules={modules}
                formats={formats}
                value={post.content}
                readOnly
              />
            </div>
            <div className="mb-[1rem]">
              <button
                type="button"
                className={`h-[8.5vh] w-[88vw] p-2 text-[1.25rem] text-white border-2 hover:ring-2 hover:ring-green-500 rounded-md bg-rose-500 lg:h-[10vh] lg:text-[1.5rem] lg:w-[52vw] shadow-md mt-[3rem] hover:bg-rose-600 ${
                  loading ? "animate-pulse" : ""
                }`}
                onClick={submitDelete}
              >
                Delete Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DeletePost;
