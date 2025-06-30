import { Link } from "react-router";
import { LANGUAGE_TO_FLAG } from "../constants";

const FriendCard = ({ friend }) => {
  return (
    <div
      className="
        w-64
        h-64
        border-2
        border-[#66FF99]
        rounded-xl
        bg-gradient-to-br from-[#1e293b] via-[#0f172a] to-[#1e293b]
        p-4
        flex flex-col
        justify-between
        text-[#66FF99]
        hover:shadow-[0_0_20px_#66FF99]
        hover:scale-105
        transition-all
        duration-300
      "
    >
      {/* USER INFO */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div
            className="
              w-12 h-12 rounded-full overflow-hidden border-2 border-[#66FF99]
              hover:border-white
              transition-colors
              duration-300
            "
          >
            <img
              src={friend.profilePic}
              alt={friend.fullName}
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="text-lg font-semibold text-white hover:text-[#66FF99] transition-colors duration-300 truncate">
            {friend.fullName}
          </h3>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-sm">
            <span className="text-[#66FF99] font-semibold">Native:</span>{" "}
            <span className="text-white hover:text-[#66FF99] transition-colors duration-300">
              {friend.nativeLanguage}
            </span>
          </span>
          <span className="text-sm">
            <span className="text-[#66FF99] font-semibold">Learning:</span>{" "}
            <span className="text-white hover:text-[#66FF99] transition-colors duration-300">
              {friend.learningLanguage}
            </span>
          </span>
        </div>
      </div>

      <Link
        to={`/chat/${friend._id}`}
        className="
          mt-4
          bg-transparent
          border
          border-[#66FF99]
          text-[#66FF99]
          rounded-lg
          py-2
          text-center
          hover:bg-[#66FF99]
          hover:text-black
          transition-colors
          duration-300
          text-sm
          font-semibold
        "
      >
        Message
      </Link>
    </div>
  );
};

export default FriendCard;
