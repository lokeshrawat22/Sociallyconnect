import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../api";
import UserCard from "../components/UserCard";

const Following = () => {
  const { id } = useParams();
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    if (!id) return;
    API.get(`/auth/users/${id}/following`)
      .then(res => setFollowing(res.data))
      .catch(err => console.error(err));
  }, [id]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 mt-18">
      <h3 className="text-2xl font-semibold mb-6 text-center">
        Following
      </h3>

      {following.length === 0 ? (
        <p className="text-center text-gray-500">
          Not following anyone yet
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {following.map(user => (
            <UserCard key={user._id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Following;
