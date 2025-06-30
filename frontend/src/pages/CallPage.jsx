import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";

import { 
  StreamVideo,          // You wrap your app or component tree in <StreamVideo client={client}> so it knows which client is active.
  StreamVideoClient,    // The main class to create a video client instance (like new StreamVideoClient({ apiKey, user, token }))
  StreamCall,           // This is the top-level component for rendering a single call session.     Wrap your layout inside this.
  CallControls,         // Pre-built UI buttons: Mic Toggle, Cam Toggle, Screen Share, Leave Call
  SpeakerLayout,        // A layout UI that puts active speaker in focus and shows other participants in a smaller grid.
  StreamTheme,          // StreamTheme wraps your video UI and provides custom styling, similar to ThemeProvider.
  CallingState,         // required in  ( callingState === CallingState.LEFT )
  useCallStateHooks,    // CallingState is an enum representing call connection states — Connecting, Connected, Disconnected, and Reconnecting — useful for conditionally rendering UI based on call status.
} from "@stream-io/video-react-sdk";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import toast from "react-hot-toast";
import PageLoader from "../components/PageLoader";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const CallPage = () => {

  const { id: callId } = useParams();      // 68599d9674af8c815e2b89f0-685e18d765c6727a48262a83    like this  
  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);
  const [isConnecting, setIsConnecting] = useState(true);

  const { authUser, isLoading } = useAuthUser();

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
  });

 useEffect(() => {
    const initCall = async () => {
      if (!tokenData.token || !authUser || !callId) return;

      try {
        console.log("Initializing Stream video client...");
 
        // these are the three user information sending to the stream
        const user = {
          id: authUser._id,
          name: authUser.fullName,
          image: authUser.profilePic,
        };

        /* 
          StreamVideoClient is a class provided by Stream’s Video SDK, which helps you:
          Initialize a connection to Stream’s video infrastructure

          Authenticate your user

          Join, create, or manage video calls 
        */
      // creating instance of the client  
        const videoClient = new StreamVideoClient({
          apiKey: STREAM_API_KEY,
          user,
          token: tokenData.token,
        });

        // creating instance of the video call
        const callInstance = videoClient.call("default", callId);
        //     You’re setting up a specific video call room.

        // "default": type of the call (like public/private/1-on-1)

        // callId: a unique ID for this call (e.g., could be "user1-user2")

        // This doesn’t start the call — it just references it.

        await callInstance.join({ create: true });

        // If the call already exists, you just join it.

        // If it doesn't, then { create: true } makes Stream create a new one.
// important how i am getting this dialogue box ?  
        // Stream tries to:

        // Access your microphone

        // (Optionally) access camera

        // Start the WebRTC connection

        // And Chrome detects that, so it asks:

        // “Do you want to allow this site to use your microphone?”

        console.log("Joined call successfully");

        setClient(videoClient);
        setCall(callInstance);

      } 
      catch (error)
      {

        console.error("Error joining call:", error);
        toast.error("Could not join the call. Please try again.");

      } 
      finally 
      {

        setIsConnecting(false);

      }

    };

    initCall();
  }, [tokenData, authUser, callId]);

  if (isLoading || isConnecting) return <PageLoader />;

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="relative">
        {client && call ? (
          <StreamVideo client={client}>
            <StreamCall call={call}>
              <CallContent />
            </StreamCall>
          </StreamVideo>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p>Could not initialize call. Please refresh or try again later.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const CallContent = () => {
  const { useCallCallingState } = useCallStateHooks();    //  ready made hook from "@stream-io/video-react-sdk"
  const callingState = useCallCallingState();

  const navigate = useNavigate();

  if (callingState === CallingState.LEFT) return navigate("/")  ;

  return (
    <StreamTheme>
      <SpeakerLayout />
      <CallControls />
    </StreamTheme>
  );
};

export default CallPage;
