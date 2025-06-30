import User from "../models/User.js"  ;
import FriendRequest from "../models/FriendRequest.js"  ;

export async function getRecommendedUsers(req, res) {
    try {

        const currentUserId = req.user.id;
        const currentUser = req.user;

        const recommendedUsers = await User.find
            ({

                $and: [

                    { _id: { $ne: currentUserId } }, //exclude current user

                    { _id: { $nin: currentUser.friends } }, // exclude current user's friends

                    { isOnboarded: true },

                ],

            });

        res.status(200).json(recommendedUsers);

    }

    catch (error) {

        console.log("Error in getRecommendedUsers controller", error);
        res.status(500).json({ message: "Internal Server Error" });

    }

}

export async function getMyFriends(req, res) {

    try {

        const user = await User.findById(req.user.id)
            .select("friends")      // .selct("friends") is used to select only the friends id
            .populate("friends", "fullName profilePic nativeLanguage learningLanguage");  // populate friends with fullName, profilePic, nativeLanguage, learningLanguage

        res.status(200).json(user.friends);

    }
    catch (error) {

        console.error("Error in getMyFriends controller", error.message);

        res.status(500).json({ message: "Internal Server Error" });

    }

}

export async function sendFriendRequest(req, res) 
{

        const myId = req.user.id   ; 

        const { id: recipientId } = req.params   ;

        if ( myId === recipientId ) 
        {

            return res.status(400).json({ message: "You cannot send a friend request to yourself" });

        }

        const recipient = await User.findById( recipientId )   ;

        if ( !recipient ) 
        {

            return res.status(404).json({ message: "Recipient not found" })  ;

        }        

        // check if user is already friends
        if (recipient.friends.includes(myId)) 
        {

            return res.status(400).json({ message: "You are already friends with this user" })  ;

        }
        
        // check if a req already exists between sender and recipient  

        const existingRequest = await FriendRequest.findOne 
        ({

            $or: [

            { sender: myId, recipient: recipientId },

            { sender: recipientId, recipient: myId },

            ],

        });

        if (existingRequest) 
        {

            return res
            .status(400)
            .json({ message: "A friend request already exists between you and this user" });

        }

        const friendRequest = await FriendRequest.create(
        {

            sender: myId,
            recipient: recipientId,

        });

        res.status(201).json(friendRequest);

}

export async function acceptFriendRequest(req, res) 
{
    try 
    {
        const { id: requestId } = req.params;

        const friendRequest = await FriendRequest.findById(requestId);

        if (!friendRequest) 
        {

            return res.status(404).json({ message: "Friend request not found" });

        }

        if (friendRequest.recipient.toString() !== req.user.id) 
        {

            return res.status(403).json({ message: "You are not authorized to accept this request" });

        }

        friendRequest.status = "accepted";
        await friendRequest.save();

// $addToSet is a MongoDB update operator that adds a value to an array field only if that value is not already present.
        await User.findByIdAndUpdate(friendRequest.sender, 
        {

            $addToSet: { friends: friendRequest.recipient },

        });

        await User.findByIdAndUpdate(friendRequest.recipient, 
        {

            $addToSet: { friends: friendRequest.sender },

        });

        res.status(200).json({ message: "Friend request accepted" });
    } 
    
    catch (error) 
    {

        console.log("Error in acceptFriendRequest controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });

    }
}

export async function getFriendRequests(req, res) 
{

  try 
  {

    //  Get all pending friend requests received by the current user
    const incomingReqs = await FriendRequest.find(
    {
      recipient: req.user.id,
      status: "pending",
    })
    .populate(
      "sender",                                  // Replacing sender ID with actual sender details
      "fullName profilePic nativeLanguage learningLanguage"  // Select only required fields
    );

    // Get all friend requests sent by the current user that have been accepted
    const acceptedReqs = await FriendRequest.find(
    {
      sender: req.user.id,
      status: "accepted",
    })
    .populate(
      "recipient",            // Replace recipient ID with actual recipient details
      "fullName profilePic"   // Only show minimal profile info
    );

    // Send both lists to the client
    res.status(200).json({ incomingReqs, acceptedReqs });

  } 
  
  catch (error) 
  {

    console.log("Error in getPendingFriendRequests controller", error.message)  ;
    res.status(500).json({ message: "Internal Server Error" })  ;

  }

}

export async function getOutgoingFriendReqs(req, res) 
{

  try 
  {
    //  Find all friend requests sent by the current user that are still pending
    const outgoingRequests = await FriendRequest.find(
    {
      sender: req.user.id,      // will get it with the help of protectRoute middleware
      status: "pending",
    })
    .populate(
      "recipient",                                           // Replace recipient ID with actual user details
      "fullName profilePic nativeLanguage learningLanguage"  // Fetch only needed fields
    );


    // Respond with the list of outgoing requests
    res.status(200).json(outgoingRequests);

  } 
  
  catch (error) 
  {
    console.log("Error in getOutgoingFriendReqs controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }

}


