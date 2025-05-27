import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getComments, postComment, sendGift } from "../api/authApi";
import { toast } from "sonner";
import { convertToEmbedURL } from "../utils/videoUtils";
import Avatar from "../components/ui/Avatar";

const PlayerPage = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [giftAmount, setGiftAmount] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/video/${id}`);
        const data = await res.json();
        setVideo(data);
        const commentList = await getComments(id);
        setComments(commentList);
      } catch {
        toast.error("Failed to fetch video details");
      }
    };
    fetchData();
  }, [id]);

  const handleComment = async (e) => {
    e.preventDefault();
    try {
      const newComment = await postComment({ videoId: id, text });
      setComments((prev) => [newComment, ...prev]);
      setText("");
    } catch {
      toast.error("Failed to comment");
    }
  };

  const handleGift = async (amount) => {
    try {
      await sendGift({ videoId: id, amount: Number(amount) });
      toast.success(`Gifted ₹${amount} to the creator!`);
      setGiftAmount("");
    } catch {
      toast.error("Not enough balance or failed to gift");
    }
  };

  if (!video) return <p className="text-center mt-20 text-gray-500">Loading video...</p>;

  return (
    <div className="max-w-5xl mx-auto p-4 pt-6 space-y-6">
      {/* Video Display */}
      <div className="aspect-video w-full rounded-xl overflow-hidden shadow-md">
        {video.videoType === "short" ? (
          <video
            src={`http://localhost:5000/uploads/videos/${video.videoFile}`}
            controls
            className="w-full h-full object-cover"
          />
        ) : (
          <iframe
            src={convertToEmbedURL(video.videoURL)}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        )}
      </div>

      {/* Video Title */}
      <h2 className="text-2xl font-bold text-gray-900">{video.title}</h2>

      {/* Gift UI */}
      <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">Support the Creator</h3>
        <div className="flex gap-2 flex-wrap">
          {[10, 20, 100].map((amt) => (
            <button
              key={amt}
              onClick={() => handleGift(amt)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md shadow"
            >
              Gift ₹{amt}
            </button>
          ))}
          <input
            type="number"
            value={giftAmount}
            onChange={(e) => setGiftAmount(e.target.value)}
            placeholder="Custom ₹"
            className="border rounded-md px-3 py-2 w-28 text-sm"
          />
          <button
            onClick={() => handleGift(giftAmount)}
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-md"
          >
            Send
          </button>
        </div>
      </div>

      {/* Comment Form */}
      <form onSubmit={handleComment} className="space-y-2">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a public comment..."
          className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
          >
            Comment
          </button>
        </div>
      </form>

      {/* Comment List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">{comments.length} Comments</h3>
        {comments.map((comment) => (
          <div
            key={comment._id}
            className="flex gap-3 border-b pb-4 items-start"
          >
            <Avatar size={40} className="mt-1" />
            <div>
              <p className="font-semibold text-sm text-gray-800">{comment.userId.username}</p>
              <p className="text-sm text-gray-700">{comment.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerPage;
