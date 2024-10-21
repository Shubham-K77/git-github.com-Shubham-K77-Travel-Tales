import Navbar from "../components/Navbar";
import Blogs from "../components/Blogs";
import { useSnackbar } from "notistack";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import About from "../components/About";
import Welcome from "../components/Welcome";
const HomePage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [posts, setPosts] = useState([]);
  const userData = useSelector((state) => state.user.userData);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "https://travel-tales-api.vercel.app/api/v1/posts/"
        );
        if (!response || response.data.data.length === 0) {
          return enqueueSnackbar("No Posts Found!", { variant: "info" });
        }
        setPosts(response.data.data);
      } catch (error) {
        enqueueSnackbar("Internal Error! Failed To Retrieve", {
          variant: "error",
        });
        console.error(error);
      }
    };
    fetchPosts();
  }, [enqueueSnackbar]);
  return (
    <div className="min-h-screen">
      <div className="w-full flex justify-center items-center">
        <Navbar />
      </div>
      {userData === "" || userData === null ? (
        <div className="w-full flex justify-center items-center mt-[1rem] mb-[1rem]">
          <About />
        </div>
      ) : (
        <div className="w-full flex justify-center items-center mt-[1rem] mb-[1rem]">
          <Welcome />
        </div>
      )}
      <div className="w-full">
        {posts.length > 0 &&
          posts.map((post) => (
            <Blogs
              key={post._id}
              id={post._id}
              title={post.title}
              summary={post.summary}
              createdAt={post.createdAt}
              author={post.author.name}
              file={post.file}
            />
          ))}
      </div>
    </div>
  );
};

export default HomePage;
