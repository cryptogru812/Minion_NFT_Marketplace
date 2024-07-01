"use client";
import React, { useEffect, useState } from "react";
import ImageComponent from "@/components/shared/ImageComponent/demo";
import { useRouter } from "next/navigation";
import Image from "next/image";
const _renderLinkItem = (props: any) => {
  const router = useRouter();
  const handleNavigate = (_url: string) => {
    router.push(_url);
  };
  // const [loading, setLoading] = useState<boolean>(true);
  return (
    <li
      onClick={() => handleNavigate(props._url)}
      className={`relative flex items-center py-3 justify-center font-extrabold
         hover:text-black cursor-pointer text-sm rounded-full font-ttfirs ${
           props._url === "/home" && props._url === props.pathname
             ? "bg-gradient-to-t from-[#fa5c13] to-[#faf225] text-black border-none px-5"
             : props._url !== "/home" && props.pathname.includes(props._url)
             ? "bg-gradient-to-t from-[#fa5c13] to-[#faf225] text-black border-none px-5"
             : "text-white px-5"
         }`}
    >
      <div className="text-lg">{props._name}</div>
    </li>
  );
};
export default _renderLinkItem;
