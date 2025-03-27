import React from "react";
import settingIcon from "../assets/setting.png";
import userIcon from "../assets/user.png";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toggleSettingPopup } from "../store/slices/popUp.slice";

const Header = () => {
    const dispact = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const [currentTime, setCurrentTime] = useState("");
    const [currentDate, setCurrentDate] = useState("");

    useEffect(() => {
      const updateDateTime = () => {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const ampm = now.getHours() <= 12 ? 'AM' : 'PM';
        setCurrentTime(`${hours}:${minutes}:${ampm}`);

        const options = { month: "short", day: "numeric", year: "numeric" };
        setCurrentDate(now.toLocaleDateString("en-US", options));
      };

      updateDateTime();
      const interval = setInterval(updateDateTime, 1000);
      return () => clearInterval(interval);
    }, []);

  return <>
    <header className="absolute top-0 bg-white w-full py-4 px-6 left-0 shadow-md flex justify-between items-center">
      {/* left side */}
      <div className="flex items-center gap-2">
        <img src={userIcon} alt="userIcon" className="w-8 h-8"/>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium sm:text-lg lg:text-xl sm:font-semibold">{user && user?.name}</span>
          <span className="text-xs sm:text-sm lg:text-base">{user && user?.email}</span>
          <span className="text-xs sm:text-sm lg:text-base">{user && user?.role}</span>
        </div>
      </div>
      {/* right side */}
      <div className="hidden md:flex items-center gap-2">
        <div className="flex flex-col text-sm lg:text-base items-end font-semibold">
          <span>{currentTime}</span>
          <span>{currentDate}</span>
        </div>
        <span className="bg-black h-14 w-[2px]" />
        <img src={settingIcon} alt="settingIcon" className="w-8 h-8" onClick={() => toggleSettingPopup()} />
      </div>
    </header>
  </>;
};

export default Header;
