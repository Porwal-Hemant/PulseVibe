import { axiosInstance } from "./axios";
// Here I am writing all the api's which are doing some operation with the backend with the help of creating axiosInstance 
export const signup = async (signupData) => {
  const response = await axiosInstance.post("/auth/signup", signupData);
  return response.data;
};

export const login = async (loginData) => {
  const response = await axiosInstance.post("/auth/login", loginData);
  return response.data;
};

export const logout = async () => {
  const response = await axiosInstance.post("/auth/logout");
  return response.data;
};

export const getAuthUser = async () => {
  try {
    const res = await axiosInstance.get("/auth/me");
    return res.data;
  } catch (error) {
    console.log("Error in getAuthUser:", error);
    return null;   // when user is NUll it should be redirected to the login page 
  }
};

export const completeOnboarding = async (userData) => {
  const response = await axiosInstance.post("/auth/onboarding", userData);
  return response.data;
};

export async function getUserFriends() {
  const response = await axiosInstance.get("/users/friends");
  return response.data;
};

export async function getRecommendedUsers() {
  const response = await axiosInstance.get("/users");
  return response.data;
};


export async function sendFriendRequest(userId) {
  const response = await axiosInstance.post(`/users/friend-request/${userId}`);
  return response.data;
}

export async function getOutgoingFriendReqs() {
  const response = await axiosInstance.get("/users/outgoing-friend-requests");
  return response.data;
}

export async function getFriendRequests() {
  //  incoming requests and accepted rquests both are send over here  
  const response = await axiosInstance.get("/users/friend-requests");
  return response.data;
}

export async function acceptFriendRequest(requestId) {
  const response = await axiosInstance.put(`/users/friend-request/${requestId}/accept`);
  return response.data;
}

// with this endPoint we are getting streamToken which we are creating with the help of userID  
// router.get("/token", protectRoute, getStreamToken);     -> this endpoint is mounted on the chat 

export async function getStreamToken() {
  const response = await axiosInstance.get("/chat/token");
  return response.data;
}

