// utils/videoUtils.js
import axios from 'axios';

export const getVideoPlatform = (url) => {
  if (url.includes("youtube.com") || url.includes("youtu.be")) return "youtube";
  if (url.includes("vimeo.com")) return "vimeo";
  if (url.includes("dailymotion.com")) return "dailymotion";
  return "unknown";
};

export const getThumbnailForExternalVideo = (url) => {
  const platform = getVideoPlatform(url);
  let videoId;

  switch (platform) {
    case "youtube":
      videoId = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([^?&]+)/)?.[1];
      return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : "/placeholder.jpg";
    case "vimeo":
      videoId = url.match(/vimeo\.com\/(\d+)/)?.[1];
      return videoId ? `https://vumbnail.com/${videoId}.jpg` : "/placeholder.jpg";
    case "dailymotion":
      videoId = url.match(/dailymotion.com\/video\/([^_]+)/)?.[1];
      return videoId ? `https://www.dailymotion.com/thumbnail/video/${videoId}` : "/placeholder.jpg";
    default:
      return "/placeholder.jpg";
  }
};

export const convertToEmbedURL = (url) => {
  const platform = getVideoPlatform(url);
  let videoId;
  switch (platform) {
    case "youtube":
      videoId = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([^?&]+)/)?.[1];
      return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
    case "vimeo":
      videoId = url.match(/vimeo\.com\/(\d+)/)?.[1];
      return videoId ? `https://player.vimeo.com/video/${videoId}` : url;
    case "dailymotion":
      videoId = url.match(/dailymotion.com\/video\/([^_]+)/)?.[1];
      return videoId ? `https://www.dailymotion.com/embed/video/${videoId}` : url;
    default:
      return url;
  }
};


export const checkPurchaseStatus = async (videoIds) => {
  const res = await axios.post("http://localhost:5000/api/video/purchase-status", { videoIds }, { withCredentials: true });
  return res.data; // { [videoId]: true/false }
};

export const purchaseVideo = async (videoId) => {
  const res = await axios.post(`http://localhost:5000/api/video/purchase`, { videoId }, { withCredentials: true });
  return res.data;
};
