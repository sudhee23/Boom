import axios from "axios";
import { useMutation, useInfiniteQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  // withCredentials: true,
});

// Set token in headers for every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ---------- AUTH ---------- //

export const signupUser = async (data) => {
  const response = await API.post("/auth/signup", data);
  return response.data;
};

export const useSignupUser = () => {
  const navigate = useNavigate();
  const { mutateAsync: signup, isPending, isError, isSuccess } = useMutation({
    mutationFn: signupUser,
    onSuccess: (data) => {
      localStorage.setItem("token", data.data.token);
      toast.success("Successfully registered", {
        description: "Welcome to Boom!",
      });
      navigate("/");
    },
    onError: (error) => {
      const errMsg = error?.response?.data?.message || "Please try again.";
      toast.error("Error signing up", { description: errMsg });
    },
  });
  return { signup, isPending, isError, isSuccess };
};

export const loginUser = async (data) => {
  const response = await API.post("/auth/login", data);
  return response.data;
};

export const useLoginUser = () => {
  const navigate = useNavigate();
  const { mutateAsync: login, isPending, isError, isSuccess } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("userId", data.data.userId);
      toast.success("Successfully logged in", {
        description: "Enjoy exploring Boom!",
      });
      navigate("/");
    },
    onError: (error) => {
      const errMsg = error?.response?.data?.message || "Invalid credentials.";
      console.log(error)
      toast.error("Error logging in", { description: errMsg });
    },
  });
  return { login, isPending, isError, isSuccess };
};

export const useLogoutUser = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    toast.success("Logged out", {
      description: "You have been logged out successfully.",
    });
    navigate("/auth/login");
  };
  return { logout };
};

// ---------- VIDEO ---------- //

export const uploadVid = async (data) => {
  const response = await API.post("/video/upload", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const useUploadVideo = () => {
  const navigate = useNavigate();
  const { mutateAsync: uploadVideo, isPending, isError, isSuccess } = useMutation({
    mutationFn: uploadVid,
    onSuccess: () => {
      toast.success("Video successfully Uploaded", {
        description: "You can see it in feed!",
      });
      navigate("/");
    },
    onError: (error) => {
      const errMsg = error?.response?.data?.message || "Please try again.";
      toast.error("Upload failed", { description: errMsg });
    },
  });
  return { uploadVideo, isPending, isError, isSuccess };
};

export const useFetchFeed = () => {
  return useInfiniteQuery({
    queryKey: ["feed"],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await API.get(`/video/feed?page=${pageParam}&limit=10`);
      return res.data.videos;
    },
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length === 0) return undefined;
      return pages.length + 1;
    },
  });
};

// ---------- COMMENTS ---------- //

export const postComment = async ({ videoId, text }) => {
  const response = await API.post(`/comment/${videoId}`, { text });
  return response.data;
};

export const getComments = async (videoId) => {
  const response = await API.get(`/comment/${videoId}`);
  return response.data;
};

// ---------- GIFTS ---------- //

export const sendGift = async ({ videoId, amount }) => {
  const response = await API.post(`/gift`, { videoId, amount });
  return response.data;
};

// ---------- PURCHASE ---------- //

export const purchaseVideo = async (videoId) => {
  const response = await API.post("/purchase/buy", { videoId });
  return response.data;
};

export const checkPurchaseStatus = async (ids) => {
  const response = await API.post("/purchase/check", { ids });
  return response.data;
};

// ---------- PROFILE APIs ---------- //

export const getUserProfile = async () => {
  const { data } = await API.get("/user/me");
  return data;
};

export const getUserPurchases = async () => {
  const { data } = await API.get("/user/purchases");
  return data;
};

export const getUserGifts = async () => {
  const { data } = await API.get("/user/gifts");
  return data;
};

// export const getMyVideos = async () => {
//   const {res} = await API.get("/video/my-videos");
//   return res
// };


