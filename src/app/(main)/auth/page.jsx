"use client";
import React, { useEffect, useState } from "react";
import { Github } from "lucide-react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { Macondo } from "next/font/google";
import { useRouter } from "next/navigation";
import {
  USER_REGISTRATION,
  IS_AUTHENTICATED,
} from "../_routes/registration.routes";
import {ShowToast} from "../_shared/show-toast"

const qwitcher = Macondo({
  subsets: ["latin"],
  weight: ["400"],
});


export default function AuthForm() {
  const [dots, setDots] = useState([]);
  const router = useRouter();

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: "Bearer " + tokenResponse?.access_token } }
      );

      const user = userInfo.data;
      const hasEmpty = Object.values(user).some(
        (value) => value === "" || value === null || value === undefined
      );

      if(!hasEmpty){
        try {
          const res = await axios.post(USER_REGISTRATION, {
            name: user.name,
            email: user.email,
            profilePic: user.picture
          });
          if(res.data.success) {
            ShowToast(true, res.data.message)
            router.push("/dashboard")
          }
        } catch (error) {
      console.log(error);
      ShowToast(false, error.response?.data?.message || error.message);
        }
      }
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  const handleGithubLogin = () => {
    const redirectUri = `${process.env.NEXT_PUBLIC_API_URI}/auth`;
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&redirect_uri=${redirectUri}&scope=read:user user:email`;
    window.location.href = githubAuthUrl;
  };
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (code) {
      const exchangeCode = async () => {
        try {
          const response = await axios.get(`/api/login-with-github?code=${code}`);

          if (response.data) {
            
             try {
               const res = await axios.post(USER_REGISTRATION, {
                 name: response.data.name,
                 email: response.data.email,
                 profilePic: response.data.avatar,
               });
               if (res.data.success) {
                 ShowToast(true, res.data.message);
                 setTimeout(() => {
                   router.push("/dashboard");
                 }, 500);
               }
             } catch (error) {
               console.log(error);
               ShowToast(false, error.response?.data?.message || error.message);
             }
          } else {
            ShowToast(false,"GitHub login failed");
          }
        } catch (err) {
          console.error("GitHub login error:", err);
          ShowToast(
            false,
            err.response?.data?.message || "Something went wrong"
          );
        } finally {
          window.history.replaceState(
            {},
            document.title,
            window.location.pathname
          );
        }
      };
      exchangeCode();
    }
  }, []);

  useEffect(() => {
    const newDots = [...Array(20)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 3}s`,
      animationDuration: `${2 + Math.random() * 2}s`,
    }));
    setDots(newDots);
  }, []);

  useEffect(() => {
    async function IsAuthorized () {
      try{
        const res = await axios.get(IS_AUTHENTICATED);
        console.log(res.data)
      }catch (error){
        console.log(error)
      }
    }
    IsAuthorized();
  },[])

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-800 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-700 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-blue-600 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-pulse delay-500"></div>
      </div>

      <div className="absolute inset-0">
        {dots.map((style, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-300 opacity-10 rounded-full animate-pulse"
            style={style}
          />
        ))}
      </div>

      {/* Main card */}
      <div className="relative z-10 w-full max-w-md sm:max-w-lg">
        <div className="backdrop-blur-xl bg-black/20 border border-blue-900/40 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-blue-900/30 flex flex-col gap-10">
          <div className="text-center">
            <h1
              onClick={() => router.push("/")}
              className={`${qwitcher.className} text-7xl font-extrabold text-transparent mb-2 
        bg-gradient-to-r from-blue-400 via-blue-500 to-blue-700 bg-clip-text 
        cursor-pointer transition-all duration-500 
        hover:scale-105 hover:from-blue-300 hover:via-blue-500 hover:to-blue-800`}
            >
              Resumova
            </h1>
            <p className="text-gray-400 text-sm">
              To use Resumate you must log into an existing account or create
              one using one of the options below
            </p>
          </div>

          {/* Social login buttons only */}
          <div className="space-y-3 sm:space-y-4">
            <button
              onClick={googleLogin}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-blue-900/10 hover:bg-blue-900/40 border border-blue-800/50 rounded-xl text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-900/40 cursor-pointer text-sm sm:text-base"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </button>

            <button
              onClick={handleGithubLogin}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-blue-900/10 hover:bg-blue-900/40 border border-blue-800/50 rounded-xl text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-900/40 cursor-pointer text-sm sm:text-base"
            >
              <Github className="w-5 h-5" />
              Continue with GitHub
            </button>
          </div>

          <p className="text-center text-gray-400 text-sm">
            By signing in, you accept the{" "}
            <span onClick={() => router.push("/terms-of-service")} className="underline underline-offset-4 hover:text-blue-400 cursor-pointer">
              Terms of Service
            </span>{" "}
            and acknowledge our{" "}
            <span onClick={() => router.push("/privacy-policy")} className="underline underline-offset-4 hover:text-blue-400 cursor-pointer">
              Privacy Policy
            </span>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
