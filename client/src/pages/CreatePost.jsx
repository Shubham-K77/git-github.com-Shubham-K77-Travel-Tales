import axios from "axios";
import Navbar from "../components/Navbar";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useSnackbar } from "notistack";

const CreatePost = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.userData);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState(null);
  const [loading, setLoading] = useState(false);

  // Quill Editor configurations
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
      navigate("/");
    }
  }, [userData, navigate, enqueueSnackbar]);

  // Function to strip HTML tags
  const stripHtmlTags = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  const submitHandle = async () => {
    setLoading(true);
    // Validation for required fields
    if (!title || !summary || !content || !files) {
      setLoading(false);
      return enqueueSnackbar("Required Information Missing!", {
        variant: "error",
      });
    }
    if (title.length < 10) {
      setLoading(false);
      return enqueueSnackbar("Not Enough Words For The Title!", {
        variant: "error",
      });
    }
    if (summary.length < 40) {
      setLoading(false);
      return enqueueSnackbar("Not Enough Words For The Summary!", {
        variant: "error",
      });
    }
    if (content.length < 300) {
      setLoading(false);
      return enqueueSnackbar("Not Enough Words For The Content!", {
        variant: "error",
      });
    }
    if (files && files.length > 0 && files[0].size >= 5000000) {
      setLoading(false);
      return enqueueSnackbar("File Size Must Be Less Than 5MB", {
        variant: "error",
      });
    }

    try {
      const data = new FormData();
      data.set("title", title);
      data.set("summary", summary);
      data.set("content", content); // Saving plain text content
      if (files && files.length > 0) {
        data.set("file", files[0]); // Assuming only one file upload
      }
      // API call to create the post
      const response = await axios.post(
        "https://travel-tales-api.vercel.app/api/v1/posts/create",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true, // Include credentials for CORS
        }
      );
      if (response.status === 201) {
        setLoading(false);
        enqueueSnackbar("Successfully Created The Post!", {
          variant: "success",
        });
        // Reset the form
        setTitle("");
        setSummary("");
        setContent("");
        setFiles(null);
        setTimeout(() => {
          navigate("/"); // Redirect to homepage after successful creation
        }, 2000);
      } else {
        setLoading(false);
        return enqueueSnackbar("Unable To Create Post!", { variant: "error" });
      }
    } catch (error) {
      setLoading(false);
      enqueueSnackbar("Error In The Server!", { variant: "error" });
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center">
      <Navbar />
      <div className="w-[98%] h-[220vh] flex flex-col justify-evenly items-center lg:flex-row lg:justify-around lg:items-center lg:h-[140vh] mt-[1rem] mb-[1rem]">
        <div
          className="w-[98%] mb-[2rem] h-[90vh] lg:h-[140vh] lg:w-[38%] lg:mt-[0.85rem] shadow-md lg:shadow-xl lg:mb-0"
          style={{
            backgroundImage: `url('/Images/create.avif')`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        ></div>
        <div className="w-[98%] mt-[1rem] flex flex-col justify-around items-center p-[1rem] h-[120vh] lg:h-[140vh] mb-[1rem] lg:w-[60%] shadow-md lg:p-[1.25rem]">
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
            <div className="w-[52%] h-[22vh] lg:h-[30.5vh] lg:w-[70%] text-[2rem] font-bold flex justify-center items-center lg:text-[3.5rem] text-amber-500 mr-4 lg:mr-0 ml-4 lg:ml-0">
              Create Post
            </div>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submitHandle();
            }}
          >
            <div className="mb-[1rem]">
              <input
                type="text"
                placeholder="Title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="h-[8.5vh] w-[88vw] p-2 text-[1.25rem] text-black border-2 hover:ring-2 rounded-md hover:ring-green-500 lg:h-[10vh] lg:text-[1.5rem] lg:w-[52vw]"
                required
              />
            </div>
            <div className="mb-[1rem]">
              <input
                type="text"
                placeholder="Summary"
                name="summary"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="h-[8.5vh] w-[88vw] p-2 text-[1.25rem] text-black border-2 hover:ring-2 rounded-md hover:ring-green-500 lg:h-[10vh] lg:text-[1.5rem] lg:w-[52vw]"
                required
              />
            </div>
            <div className="mb-[1rem]">
              <input
                type="file"
                name="file"
                onChange={(e) => setFiles(e.target.files)} // Handle file selection
                className="h-[9vh] w-[88vw] p-2 text-[1.25rem] border-2 hover:ring-2 rounded-md hover:ring-green-500 lg:h-[10vh] lg:text-[1.5rem] lg:w-[52vw]"
                required
              />
            </div>
            <div className="mb-[2rem] lg:mb-[2rem]">
              <ReactQuill
                theme="snow"
                className="h-[16vh] mb-[1rem]"
                modules={modules}
                formats={formats}
                value={content}
                name="content"
                onChange={(newValue) => setContent(stripHtmlTags(newValue))} // Strip HTML tags here
                required
              />
            </div>
            <div className="mb-[1rem]">
              <button
                type="submit"
                className={`"h-[8.5vh] w-[88vw] p-2 text-[1.25rem] text-white border-2 hover:ring-2 hover:ring-green-500 hover:bg-amber-600 rounded-md bg-amber-500 lg:h-[10vh] lg:text-[1.5rem] lg:w-[52vw] shadow-md mt-[3rem]" ${
                  loading === true ? "animate-pulse" : "animate-none"
                }`}
              >
                Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
