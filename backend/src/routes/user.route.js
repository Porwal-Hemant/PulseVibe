import express from 'express'; 
import { getRecommendedUsers, getMyFriends , sendFriendRequest , acceptFriendRequest , getFriendRequests , getOutgoingFriendReqs} from '../controllers/user.controllers.js';
import { protectRoute } from '../middlewares/auth.middleware.js';
const router = express.Router(); 

// applying middleware to all routes 
router.use(protectRoute); // Apply protectRoute middleware to all routes in this router

router.get("/" , getRecommendedUsers);
router.get("/friends",  getMyFriends);

router.post("/friend-request/:id", sendFriendRequest) ;
router.put("/friend-request/:id/accept", acceptFriendRequest) ;

router.get("/friend-requests", getFriendRequests );
router.get("/outgoing-friend-requests", getOutgoingFriendReqs);

export default router;


