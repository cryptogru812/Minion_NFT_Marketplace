"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
const _renderLinkItem = (props: any) => {
  const router = useRouter();
  const handleNavigate = (_url: string) => {
    router.push(_url);
  };

  const openLink = (url: string) => {
    window.open(url, "_blank");
  }
  // const [loading, setLoading] = useState<boolean>(true);
  return (
    // <li
    //   onClick={() => handleNavigate(props._url)}
    //   className={`relative flex items-center py-3 justify-center font-extrabold
    //      hover:text-black cursor-pointer text-sm rounded-full font-triviaGothic ${
    //        props._url === "/home" && props._url === props.pathname
    //          ? "bg-gradient-to-t from-[#fa5c13] to-[#faf225] text-black border-none"
    //          : props._url !== "/home" && props.pathname.includes(props._url)
    //          ? "bg-gradient-to-t from-[#fa5c13] to-[#faf225] text-black border-none"
    //          : "text-white px-5"
    //      }`}
    // >
    //   <div className="text-lg">{props._name}</div>
    // </li>
    <div className="w-full items-center flex">
      <li
        onClick={() => props._newURL ? openLink(props._newURL) : handleNavigate(props._url)}
        className={`relative w-full flex items-center px-10 py-3 font-extrabold
         hover:text-black cursor-pointer text-sm rounded-full font-triviaGothic ${
           props._url === "/home" && props._url === props.pathname
             ? "bg-gradient-to-t from-[#fa5c13] to-[#faf225] text-white border-none"
             : props._url !== "/home" && props.pathname.includes(props._url)
             ? "bg-gradient-to-t from-[#fa5c13] to-[#faf225] text-white border-none"
             : "text-white"
         } ${props.siderWidth <= 190 && "bg-none"}`}
      >
        {props.siderWidth > 190 ? <>{props._name}</> : null}
      </li>
    </div>
  );
};
export default _renderLinkItem;
