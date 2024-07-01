"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
const _renderLinkItem = (props: any) => {
  const router = useRouter();
  const handleNavigate = (_url: string) => {
    router.push(_url);
  };
  // const [loading, setLoading] = useState<boolean>(true);
  return (
    // <li
    //   onClick={() => handleNavigate(props._url)}
    //   className={`relative flex items-center py-3 justify-center font-extrabold
    //      hover:text-black cursor-pointer text-sm rounded-full font-ttfirs ${
    //        props._url === "/home" && props._url === props.pathname
    //          ? "bg-gradient-to-t from-[#fa5c13] to-[#faf225] text-black border-none px-5"
    //          : props._url !== "/home" && props.pathname.includes(props._url)
    //          ? "bg-gradient-to-t from-[#fa5c13] to-[#faf225] text-black border-none px-5"
    //          : "text-white px-5"
    //      }`}
    // >
    //   <div className="text-lg">{props._name}</div>
    // </li>
    <div className="w-full items-center flex">
      <li
        onClick={() => handleNavigate(props._url)}
        className={`relative w-full flex items-center py-3 font-extrabold
         hover:text-black cursor-pointer text-sm rounded-full font-ttfirs ${
           props._url === "/home" && props._url === props.pathname
             ? "bg-gradient-to-t from-[#fa5c13] to-[#faf225] text-black border-none px-5"
             : props._url !== "/home" && props.pathname.includes(props._url)
             ? "bg-gradient-to-t from-[#fa5c13] to-[#faf225] text-black border-none px-5"
             : "text-white px-5"
         }`}
      >
        {props._url === "/home" && props._url === props.pathname ? (
          <div
            className={`${props.siderWidth > 190 ? `mr-[15px]` : ""} w-[20px]`}
          >
            <Image
              src={props._clickedIcon}
              height={0}
              width={0}
              alt=""
              className="w-[20px] h-auto"
            />
          </div>
        ) : props._url !== "/home" && props.pathname.includes(props._url) ? (
          <div
            className={`${props.siderWidth > 190 ? `mr-[15px]` : ""} w-[20px]`}
          >
            <Image
              src={props._clickedIcon}
              width={0}
              height={0}
              alt=""
              className="w-[20px] h-auto"
              priority={true}
            />
          </div>
        ) : (
          <div
            className={`${props.siderWidth > 190 ? `mr-[15px]` : ""} w-[18px]`}
          >
            <Image
              src={props._icon}
              height={0}
              width={0}
              alt=""
              className="w-[18px] h-auto"
            />
          </div>
        )}
        {props.siderWidth > 190 ? (
          <>
            {props._name}
          </>
        ) : null}
      </li>
    </div>
  );
};
export default _renderLinkItem;
