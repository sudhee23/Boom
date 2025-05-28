import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getUserProfile,
  getUserPurchases,
  getUserGifts,
} from "../api/authApi";
import { FaUserCircle, FaVideo, FaGift } from "react-icons/fa";
import Card from "../components/ui/card";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [purchases, setPurchases] = useState([]);
  const [gifts, setGifts] = useState([]);
  const navigate = useNavigate();
  // const [myVideos, setMyVideos] = useState([]);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const [userInfo, purchasesList, giftsList] = await Promise.all([
          getUserProfile(),
          getUserPurchases(),
          getUserGifts(),
        ]);

        setUser(userInfo);
        setPurchases(purchasesList);
        setGifts(giftsList);
      } catch (err) {
        console.error("Failed to fetch profile data", err);
      }
    };

    fetchProfileData();
  }, []);

  if (!user) return <p className="text-center mt-10">Loading profile...</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-10">
      {/* Profile Section */}
      <Card className="bg-pink-100/50 border-pink-200 shadow-md">
        <div className="flex items-center gap-4 mb-4">
          <FaUserCircle className="text-4xl text-pink-600" />
          <h2 className="text-2xl font-bold text-blue-900">Profile Details</h2>
        </div>
        <div className="text-gray-800 space-y-1">
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Wallet Balance:</strong> ₹{user.wallet}
          </p>
        </div>
      </Card>

      {/* Purchases Section */}
      <Card className="bg-white shadow border border-pink-200">
        <div className="flex items-center gap-3 mb-4">
          <FaVideo className="text-xl text-pink-600" />
          <h2 className="text-2xl font-semibold text-blue-900">
            Purchased Videos
          </h2>
        </div>
        {purchases.length === 0 ? (
          <p className="text-gray-500">No videos purchased yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {purchases.map((item) => (
              <div
                key={item._id._id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow cursor-pointer hover:bg-pink-50 transition"
                onClick={() => navigate(`/video/${item._id._id}`)}
              >
                <h3 className="text-lg font-medium text-blue-900">
                  {item._id.title}
                </h3>
                <p className="text-sm text-gray-600">By {item._id.creator}</p>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Gifts Section */}
      <Card className="bg-white shadow border border-pink-200">
        <div className="flex items-center gap-3 mb-4">
          <FaGift className="text-xl text-pink-600" />
          <h2 className="text-2xl font-semibold text-blue-900">Gifts Sent</h2>
        </div>
        {gifts.length === 0 ? (
          <p className="text-gray-500">No gifts sent yet.</p>
        ) : (
          <ul className="space-y-2">
            {gifts.map((gift) => (
              <li key={gift._id} className="border-b pb-2 text-gray-700">
                ₹{gift.amount} to{" "}
                <span className="font-semibold text-pink-700">
                  {gift.creatorName}
                </span>{" "}
                — for <span className="italic">{gift.videoTitle}</span>
              </li>
            ))}
          </ul>
        )}
      </Card>

      {/* <Card className="bg-white shadow border border-pink-200">
        <div className="flex items-center gap-3 mb-4">
          <FaVideo className="text-xl text-pink-600" />
          <h2 className="text-2xl font-semibold text-blue-900">
            My Uploaded Videos
          </h2>
        </div>
        {myVideos.length === 0 ? (
          <p className="text-gray-500">You haven't uploaded any videos yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {myVideos.map((video) => (
              <div
                key={video._id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow cursor-pointer hover:bg-pink-50 transition"
                onClick={() => navigate(`/video/${video._id}`)}
              >
                <h3 className="text-lg font-medium text-blue-900">
                  {video.title}
                </h3>
                <p className="text-sm text-gray-600">
                  Uploaded on {new Date(video.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </Card> */}
    </div>
  );
};

export default ProfilePage;
