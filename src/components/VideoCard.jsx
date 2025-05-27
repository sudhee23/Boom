// components/VideoCard.jsx
import { Button } from "./ui/button";
import { MessageCircle, Heart, Share2 } from "lucide-react";
import Avatar from "./ui/Avatar"; // Assume you have a basic Avatar component

const VideoCard = ({
  video,
  handleWatch,
  purchased,
  setSelectedVideo,
  videoRefs,
  getThumbnailForExternalVideo,
}) => {
  const handleClick = () => {
    if (video.price > 0 && !purchased) {
      setSelectedVideo(video);
    } else {
      handleWatch(video);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-pink-100 p-4 space-y-3">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Avatar src={video.creatorProfilePic || "/avatar.jpg"} />
        <div>
          <p className="text-sm font-semibold">{video.creator}</p>
          <p className="text-xs text-gray-500">Uploaded recently</p>
        </div>
      </div>

      {/* Video/Thumbnail */}
      <div className="rounded-xl overflow-hidden w-full h-64 bg-black">
        {video.videoType === "short" ? (
          <video
            ref={(node) => (videoRefs.current[video._id] = node)}
            src={`http://localhost:5000/uploads/videos/${video.videoFile}`}
            className="w-full h-full object-cover cursor-pointer"
            muted
            loop
            playsInline
            autoPlay
            onClick={handleClick}
          />
        ) : (
          <img
            src={video.thumbnail || getThumbnailForExternalVideo(video.videoURL)}
            alt="Thumbnail"
            className="w-full h-full object-cover cursor-pointer"
            onClick={handleClick}
          />
        )}
      </div>

      {/* Description */}
      <p className="text-sm text-gray-700">{video.title || "No description provided."}</p>
      <p className="text-sm text-gray-700">{video.description || "No description provided."}</p>

      {/* Actions */}
      <div className="flex justify-between items-center text-gray-600 text-sm">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1 cursor-pointer hover:text-pink-500">
            <Heart size={16} /> <span>12</span>
          </div>
          <div className="flex items-center gap-1 cursor-pointer hover:text-pink-500">
            <MessageCircle size={16} /> <span>4</span>
          </div>
          <div className="flex items-center gap-1 cursor-pointer hover:text-pink-500">
            <Share2 size={16} />
          </div>
        </div>

        {/* Purchase/Watch */}
        {video.price > 0 && !purchased ? (
          <Button className="bg-pink-500 hover:bg-pink-600 text-white" onClick={() => setSelectedVideo(video)}>
            Buy ₹{video.price}
          </Button>
        ) : (
          <Button className="bg-pink-100 hover:bg-pink-200 text-pink-700" onClick={handleClick}>
            Watch
          </Button>
        )}
      </div>
    </div>
  );
};

export default VideoCard;
