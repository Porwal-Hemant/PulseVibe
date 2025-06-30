
import { Route, Routes } from "react-router";

import { Toaster } from "react-hot-toast";

import HomePage from "./pages/HomePage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import NotificationsPage from "./pages/NotificationsPage.jsx";
import CallPage from "./pages/CallPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import OnboardingPage from "./pages/OnboardingPage.jsx";
import Layout from "./components/Layout.jsx";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./lib/axios.js";
import TextSpeech from "./pages/TextSpeech.jsx";
import SpeechText from "./pages/SpeechText.jsx";
import Friends from "./pages/Friends.jsx";
import { Navigate } from "react-router";
import PageLoader from "./components/PageLoader.jsx";
import useAuthUser from "./hooks/useAuthUser.js";
// import { useThemeStore } from "./source/useThemeStore.jsx";
import DeveloperCorner from "./pages/DeveloperCorner.jsx";

const App = () => {

  // Previously I did it with the help of this  
  // const { data: authData, isLoading, error } = useQuery({
  //   queryKey: ["authUser"],

  //   queryFn: async () => {
  //     const res = await axiosInstance.get("http://localhost:5001/api/auth/me");
  //     return res.data;
  //   },
  //   retry: false,
  // });

  // const authUser = authData?.user  // authUser will tell us whether the user is authenticated or not 

  // Now after I had divided code in useful segments it will look like this  
  const { isLoading, authUser } = useAuthUser();

  // const { theme } = useThemeStore();
  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;  // we have defined one attribute of the user ( isOnboarded ) which tells us whether the user is boarded or not 

  if (isLoading) return <PageLoader />

  return (
    <div className="min-h-screen bg-black text-white" data-theme="black">

      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated && isOnboarded ? (
              // this is showing the attached sidebar with the HomePage  
              <Layout showSidebar={true}>
                <HomePage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />

        <Route
          path="/signup"
          element={

            !isAuthenticated ? <SignUpPage /> : <Navigate to={isOnboarded ? "/" : "/onboarding"} />

          }
        />

        <Route
          path="/login"
          element={
            !isAuthenticated ? <LoginPage /> : <Navigate to={isOnboarded ? "/" : "/onboarding"} />
          }
        />

        <Route
          path="/notifications"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={true}>
                <NotificationsPage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />

        <Route
          path="/TextSpeech"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={true}>
                <TextSpeech />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />

        <Route
          path="/SpeechText"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={true}>
                <SpeechText />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />

        <Route
          path="/Friends"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={true}>
                <Friends />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />

        <Route
          path="/DeveloperCorner"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={true}>
                <DeveloperCorner />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />

        <Route
          path="/call/:id"
          element={
            isAuthenticated && isOnboarded ? (
              <CallPage />
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />

        <Route
          path="/chat/:id"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={false}>
                <ChatPage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />

        {/* when user want to message to some user by clicking on the message button ( this button message is linked to the `/chat/${friend._id}` )  */}

        {

          /* 

          <Link to={`/chat/${friend._id}`} className="btn btn-outline w-full">
            Message
          </Link>

          */

        }

        <Route
          path="/onboarding"
          element={
            isAuthenticated ? (
              !isOnboarded ? (
                <OnboardingPage />
              ) : (
                <Navigate to="/" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />

      </Routes>


      <Toaster />
    </div>
  );
};

export default App;




