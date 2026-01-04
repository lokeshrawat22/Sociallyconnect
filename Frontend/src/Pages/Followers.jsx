import { useEffect, useState } from "react";
import API from "../api";
import { useParams } from "react-router-dom";
import UserCard from "../components/UserCard";

const Followers = () => {
  const { id } = useParams();
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    if (!id) return;
    API.get(`/auth/users/${id}/followers`)
      .then(res => setFollowers(res.data))
      .catch(err => console.error(err));
  }, [id]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h3 className="text-2xl font-semibold mb-6 text-center">
        Followers
      </h3>

      {followers.length === 0 ? (
        <p className="text-center text-gray-500">
          No followers yet
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {followers.map(user => (
            <UserCard key={user._id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Followers;
