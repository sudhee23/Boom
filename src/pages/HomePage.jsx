// Updated HomePage.js
import { useFetchFeed, purchaseVideo, checkPurchaseStatus } from "../api/authApi";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { getThumbnailForExternalVideo } from "../utils/videoUtils";
import PaymentModal from "../components/PaymentModal";
import VideoCard from "../components/VideoCard";

const HomePage = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useFetchFeed();
  const { ref, inView } = useInView();
  const navigate = useNavigate();
  const videoRefs = useRef({});

  const [selectedVideo, setSelectedVideo] = useState(null);
  const [purchasedStatus, setPurchasedStatus] = useState({});

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView]);

  useEffect(() => {
    Object.entries(videoRefs.current).forEach(([id, video]) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) video.play().catch(() => {});
          else video.pause();
        },
        { threshold: 0.7 }
      );
      if (video) observer.observe(video);
      return () => observer.disconnect();
    });
  }, [data]);

  const handleWatch = (video) => {
    if (video.price > 0 && !purchasedStatus[video._id]) {
      setSelectedVideo(video);
    } else {
      navigate(`/video/${video._id}`);
    }
  };

  const handleConfirmPurchase = async () => {
    try {
      const res = await purchaseVideo(selectedVideo._id);
      toast.success(`Successfully purchased ${selectedVideo.title}`);
      setPurchasedStatus((prev) => ({ ...prev, [selectedVideo._id]: true }));
      setSelectedVideo(null);
    } catch (err) {
      toast.error("Purchase failed", {
        description: err.message || "Check your balance or try again",
      });
    }
  };

  useEffect(() => {
    const ids = data?.pages.flatMap((page) => page.map((video) => video._id)) || [];
    if (ids.length > 0) {
      checkPurchaseStatus(ids).then(setPurchasedStatus);
    }
  }, [data]);

  return (
    <div className="max-w-2xl mx-auto py-6 space-y-6">
      {data?.pages.map((page) =>
        page.map((video) => (
          <VideoCard
            key={video._id}
            video={video}
            handleWatch={handleWatch}
            purchased={!!purchasedStatus[video._id]}
            setSelectedVideo={setSelectedVideo}
            videoRefs={videoRefs}
            getThumbnailForExternalVideo={getThumbnailForExternalVideo}
          />
        ))
      )}
      <div ref={ref} className="h-20" />
      {isFetchingNextPage && <p className="text-center text-sm text-gray-500">Loading more...</p>}

      {selectedVideo && (
        <PaymentModal
          isOpen={!!selectedVideo}
          onClose={() => setSelectedVideo(null)}
          onConfirm={handleConfirmPurchase}
          price={selectedVideo.price}
        />
      )}
    </div>
  );
};

export default HomePage;
