import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router'
import { useQuery } from '@tanstack/react-query';
import useAuthUser from '../hooks/useAuthUser';

import toast from 'react-hot-toast';
import { getStreamToken } from '../lib/api';

import {
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";

import { StreamChat } from 'stream-chat';

import ChatLoader from '../components/ChatLoader';
import CallButton from '../components/CallButton';
// const STREAM_API_KEY = "4qs7hgwa4y7d"; // test if this works
const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const ChatPage = () => {

  const { id: targetUserId } = useParams();


  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);  //  as soon as I will reach this page i will try to connect  the chat  

  const { authUser } = useAuthUser();

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
    // this will run only when authUser is available or it has been fetched 
  });


  useEffect(() => {
    const initChat = async () => {
      console.log("authUser:", authUser);
      console.log("tokenData:", tokenData);

      if (!tokenData?.token || !authUser) {
        console.log("AuthUser or token not ready, exiting initChat...");
        return;
      }

      try {
        console.log("Initializing stream chat client...");

        const client = StreamChat.getInstance(STREAM_API_KEY) ;

        // Connects the current logged-in user to the Stream chat server with the help of client instance   

        //  initiating a WebSocket connection
        await client.connectUser(
          {
            id: authUser._id,
            name: authUser.fullName,
            image: authUser.profilePic,
          },
          tokenData.token
        );

        const channelId = [authUser._id, targetUserId].sort().join("-");

        // I just want to give a particular chat channel to 2 users irrespective of who start the chat first  

        // I want to create a channel of message type  
        const currChannel = client.channel("messaging", channelId, {
          members: [authUser._id, targetUserId],
        });

        await currChannel.watch();

        // Starts watching (i.e., listening for real-time updates/messages) for the current channel.
        //  Without watch(), the UI won’t get live updates or fetch existing messages.

        setChatClient(client);
        setChannel(currChannel);
 
      }
      catch (error) {

        console.error("Error initializing chat:", error);
        toast.error("Could not connect to chat. Please try again.");

      }
      finally {

        setLoading(false);

      }

    };

    initChat();

  }, [tokenData, authUser, targetUserId]);

  const handleVideoCall = () => {
    if (channel) {
      const callUrl = `${window.location.origin}/call/${channel.id}`;

      channel.sendMessage({
        text: `I've started a video call. Join me here: ${callUrl}`,
      });

      toast.success("Video call link sent successfully!");
    }
  };

  if (loading || !chatClient || !channel) return <ChatLoader />;

  return (

    <div className="h-[93vh]">
      <Chat client={chatClient}>
        <Channel channel={channel}>
          <div className="w-full relative">
            <CallButton handleVideoCall={handleVideoCall} />
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput focus />
            </Window>
          </div>
          <Thread />
        </Channel>
      </Chat>
    </div>
  );

}


export default ChatPage


