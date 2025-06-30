import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, LogOutIcon, ShipWheelIcon , UsersIcon } from "lucide-react";
// import ThemeSelector from "./ThemeSelector";
import { logout } from "../lib/api";
import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import useLogout from "../hooks/useLogout";

const Navbar = () => {

  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");

    
//   const queryClient = useQueryClient();
//   const { mutate: logoutMutation } = useMutation({
//     mutationFn: logout,
//     onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
//   });

  const { logoutMutation } = useLogout();

  return (
  <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-end w-full">
          {/* LOGO - ONLY IN THE CHAT PAGE */}
          {isChatPage && (
            <div className="pl-5">
              <Link to="/" className="flex items-center gap-2.5">
                    <UsersIcon className="size-9 text-green-400 fill-green-400" />
                    <span className="text-3xl font-bold font-mono text-green-400 tracking-wider">
                        PulseVibe
                    </span>
              </Link>
            </div>
          )}

          <div className="flex items-center gap-3 sm:gap-4 ml-auto">
            <Link to={"/notifications"}>
              <button className="btn btn-ghost btn-circle">
                <BellIcon className="h-6 w-6 text-base-content opacity-70" />
              </button>
            </Link>
          </div>

          {/* TODO */}
          {/* <ThemeSelector /> */}

          <div className="avatar">
            <div className="w-9 rounded-full">
              <img src={authUser?.profilePic} alt="User Avatar" rel="noreferrer" />
            </div>
          </div>

          {/* Logout button */}
          <button className="btn btn-ghost btn-circle" onClick={logoutMutation}>
            <LogOutIcon className="h-6 w-6 text-base-content opacity-70" />
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar


