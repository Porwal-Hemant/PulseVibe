import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, HomeIcon, ShipWheelIcon, UsersIcon , Mic , MessageCircle , Laptop} from "lucide-react";

const Sidebar = () => {
    const { authUser } = useAuthUser();
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <aside className="w-64 bg-base-200 border-r border-base-300 hidden lg:flex flex-col h-screen sticky top-0">
            <div className="p-5 border-b border-base-300">
                <Link to="/" className="flex items-center gap-2.5">
                    <UsersIcon className="size-9 text-green-400 fill-green-400" />
                    <span className="text-3xl font-bold font-mono text-green-400 tracking-wider">
                        PulseVibe
                    </span>
                </Link>
            </div>

            <nav className="flex-1 p-4 space-y-1">
                <Link
                    to="/"
                    className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath === "/" ? "btn-active" : ""
                        }`}
                >
                    <HomeIcon className="size-5 text-base-content opacity-70" />
                    <span>Home</span>
                </Link>

                <Link
                    to="/friends"
                    className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath === "/friends" ? "btn-active" : ""
                        }`}
                >
                    <UsersIcon className="size-5 text-base-content opacity-70" />
                    <span>Friends</span>
                </Link>

                <Link
                    to="/notifications"
                    className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath === "/notifications" ? "btn-active" : ""
                        }`}
                >
                    <BellIcon className="size-5 text-base-content opacity-70" />
                    <span>Notifications</span>
                </Link>

                <Link
                    to="/TextSpeech"
                    className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath === "/TextSpeech" ? "btn-active" : ""
                        }`}
                >
                    <Mic className="size-4 text-base-content opacity-70" />
                    <span>VoiceMate:Text to Speech</span>
                </Link>

                <Link
                    to="/SpeechText"
                    className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath === "/SpeechText" ? "btn-active" : ""
                        }`}
                >
                    <MessageCircle className="size-4 text-base-content opacity-70" />
                    <span>Transcripto:Speech to Text</span>
                </Link>

                <Link
                    to="/DeveloperCorner"
                    className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath === "/DeveloperCorner" ? "btn-active" : ""
                        }`}
                >
                    <Laptop className="size-4 text-base-content opacity-70" />
                    <span>Developer Corner</span>
                </Link>

            </nav>

            {/* USER PROFILE SECTION */}
            <div className="p-4 border-t border-base-300 mt-auto">
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="w-10 rounded-full">
                            <img src={authUser?.profilePic} alt="User Avatar" />
                        </div>
                    </div>
                    <div className="flex-1">
                        <p className="font-semibold text-sm">{authUser?.fullName}</p>
                        <p className="text-xs text-success flex items-center gap-1">
                            <span className="size-2 rounded-full bg-success inline-block" />
                            Online
                        </p>
                    </div>
                </div>
            </div>
        </aside>
    );
};
export default Sidebar;
