import { useQueryClient } from "@tanstack/react-query"

import { useState } from "react";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserFriends } from "../lib/api";
import { getRecommendedUsers } from "../lib/api";
import { sendFriendRequest } from "../lib/api";
import { getOutgoingFriendReqs } from "../lib/api";

import { useMutation } from "@tanstack/react-query";

import { Link } from "react-router";
import { CheckCircleIcon, MapPinIcon, UserPlusIcon, UsersIcon } from "lucide-react";

import FriendCard from "../components/FriendCard";
import NoFriendsFound from "../components/NoFriendsFound";

const capitialize = (str) => str.charAt(0).toUpperCase() + str.slice(1)


const HomePage = () => {

  const queryClient = useQueryClient();

  // after sending request to anyone you still want to have request send button to be shown when you reload the webpage  
  const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set());  // in order to set unique values only  

  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  const { data: recommendedUsers = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: getRecommendedUsers,
  });

  const { data: outgoingFriendReqs } = useQuery({
    queryKey: ["outgoingFriendReqs"],
    queryFn: getOutgoingFriendReqs,
    refetchInterval: 3000,
  });

  const { mutate: sendRequestMutation, isPending } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] }),
    // we use to do useMutation when we have to execute some other query query 
    // will send like this ->  onClick={() => sendRequestMutation(user._id)}     from some button 
  });

  useEffect(() => {
    // outgoingFriendReqs is storing all the data we get from the getOutgoingFriendReqs query  
    const outgoingIds = new Set();
    if (outgoingFriendReqs && outgoingFriendReqs.length > 0) {
      outgoingFriendReqs.forEach((req) => {
        outgoingIds.add(req.recipient._id);
      });
      setOutgoingRequestsIds(outgoingIds);
    }
  }, [outgoingFriendReqs]);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto space-y-10">


        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#66FF99]">
            Your Friends
          </h2>
          <Link to="/notifications" className="btn btn-outline btn-sm">
            <UsersIcon className="mr-2 size-4" />
            Friend Requests
          </Link>
        </div>

        {loadingFriends ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg" />
          </div>
        ) : friends.length === 0 ? (
          <NoFriendsFound />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {friends.map((friend) => (
              <FriendCard key={friend._id} friend={friend} />
            ))}
          </div>
        )}

        <section className="text-[#66FF99] px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#66FF99]">
                  Meet New Learners
                </h2>
                <p className="opacity-70 text-[#66FF99]">
                  Discover some new language exchange partners based on your current status
                </p>
              </div>
            </div>
          </div>

          {loadingUsers ? (
            <div className="flex justify-center py-12">
              <span className="loading loading-spinner loading-lg text-[#66FF99]" />
            </div>
          ) : recommendedUsers.length === 0 ? (
            <div className="card bg-[#1e293b] border border-[#66FF99] p-6 text-center text-[#66FF99]">
              <h3 className="font-semibold text-lg mb-2">No recommendations available</h3>
              <p className="opacity-70">
                Check back later for new language partners!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedUsers.map((user) => {
                const hasRequestBeenSent = outgoingRequestsIds.has(user._id);

                return (
                  <div
                    key={user._id}
                    className="
              card
              bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]
              border border-[#66FF99]
              hover:border-[#66FF99]
              hover:shadow-[0_0_20px_#66FF99]
              transition-all duration-300
              text-[#66FF99]
            "
                  >
                    <div className="card-body p-5 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="avatar size-16 rounded-full border-2 border-[#66FF99]">
                          <img src={user.profilePic} alt={user.fullName} className="object-cover w-full h-full rounded-full" />
                        </div>

                        <div>
                          <h3 className="font-semibold text-lg text-white">{user.fullName}</h3>
                          {user.location && (
                            <div className="flex items-center text-xs opacity-70 mt-1 text-[#66FF99]">
                              <MapPinIcon className="size-3 mr-1 text-[#66FF99]" />
                              {user.location}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        <span className="badge border border-[#66FF99] text-[#66FF99]">
                          Native: {capitialize(user.nativeLanguage)}
                        </span>

                        <span className="badge border border-[#66FF99] text-[#66FF99]">
                          Learning: {capitialize(user.learningLanguage)}
                        </span>
                      </div>

                      {user.bio && (
                        <p className="text-sm opacity-70 text-[#66FF99]">{user.bio}</p>
                      )}

                      <button
                        className={`
                  w-full mt-2
                  border border-[#66FF99]
                  ${hasRequestBeenSent
                            ? 'cursor-not-allowed opacity-50'
                            : 'hover:bg-[#66FF99] hover:text-black'}
                  rounded-lg py-2
                  text-sm font-semibold
                  transition-colors duration-300
                `}
                        onClick={() => sendRequestMutation(user._id)}
                        disabled={hasRequestBeenSent || isPending}
                      >
                        {hasRequestBeenSent ? (
                          <>
                            <CheckCircleIcon className="size-4 mr-2 inline" />
                            Request Sent
                          </>
                        ) : (
                          <>
                            <UserPlusIcon className="size-4 mr-2 inline" />
                            Send Friend Request
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

      </div>
    </div>
  )
}

export default HomePage





