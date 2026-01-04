import { Link } from "react-router-dom";
import FollowButton from "./FollowButton";

const UserCard = ({ user, currentUserId }) => {
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition">

      {/* PROFILE IMAGE */}
      <img
        src={
          user.profilePic
            ? `http://localhost:3000/uploads/posts/${user.profilePic}`
            : "/default-avatar.png"
        }
        onError={(e) => (e.target.src = "/default-avatar.png")}
        alt="avatar"
        className="w-12 h-12 rounded-full object-cover border"
      />

      {/* USER INFO */}
      <div className="flex-1">
        <Link
          to={`/userprofile/${user._id}`}
          className="font-semibold text-gray-800 hover:text-indigo-600"
        >
          @{user.username}
        </Link>

        {user.name && (
          <p className="text-sm text-gray-500">{user.name}</p>
        )}
      </div>

      {/* FOLLOW BUTTON */}
     
      {/* VIEW PROFILE */}
      <Link
        to={`/userprofile/${user._id}`}
        className="text-sm px-4 py-1 rounded-full border border-indigo-600
                   text-indigo-600 hover:bg-indigo-600 hover:text-white transition"
      >
        View
      </Link>
    </div>
  );
};

export default UserCard;
