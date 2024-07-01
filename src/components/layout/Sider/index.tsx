"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useWallet } from "@/providers/WalletProvider";
import formatAddress from "@/lib/formatAddress";
import SiderList from "./sider";

const Sider = () => {
  const pathname = usePathname();
  const [siderWidth, setSiderWidth] = useState<number>(250);
  const [loading, setLoading] = useState<boolean>(true);
  const [transition, setTransition] = useState<boolean>(true);

  const { connStatus, solanaConnect, walletID } = useWallet();

  const handleCloseSiderBar = () => {
    setSiderWidth(80);
    const sidebar = document.querySelector(".resize-current") as HTMLElement;
    sidebar.style.width = `${80}px`;
  };

  const handleOpenSiderBar = () => {
    setSiderWidth(250);
    const sidebar = document.querySelector(".resize-current") as HTMLElement;
    sidebar.style.width = `${250}px`;
  };

  const handleClick = () => {
    
    if (!connStatus) {
      solanaConnect();
      console.log("connected", connStatus);
    } else {
      console.log("Not connected", connStatus);
    }
  };

  useEffect(() => {
    const handle = document.querySelector(".resize-handle") as HTMLElement;
    const sidebar = document.querySelector(".resize-current") as HTMLElement;

    if (!handle || !sidebar) {
      return;
    }

    let isResizing = false;
    let lastDownX = 0;

    handle.addEventListener("mousedown", (e: MouseEvent) => {
      isResizing = true;
      lastDownX = e.clientX || 0;
      setTransition(false);
    });

    document.addEventListener("mousemove", (e: Event) => {
      if (!isResizing) return;

      const width = (e as MouseEvent).clientX;
      if (width > 250) {
        setSiderWidth(250);
        sidebar.style.width = `${250}px`;
      } else if (width > 80) {
        setSiderWidth(width);
        sidebar.style.width = `${width}px`;
      } else {
        setSiderWidth(80);
        sidebar.style.width = `${80}px`;
      }
    });

    document.addEventListener("mouseup", () => {
      isResizing = false;
      setTransition(true);
    });

    return () => {
      document.removeEventListener("mousemove", () => {});
      document.removeEventListener("mouseup", () => {});
    };
  }, []);
  return (
    <>
      <div
        className={`desktop:flex-none prevent-select bg-opacity-60 desktop:flex hidden justify-start bg-[#171717] h-full relative resize-current w-[250px] overflow-auto ${
          transition ? "transition-[width] duration-250" : "transition-none"
        }`}
      >
        <div
          className="resize-handle"
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: "1px",
            cursor: "ew-resize",
          }}
        ></div>
        <button
          className={`absolute right-[40px] top-[60px] ${
            siderWidth >= 250 ? "block" : "hidden"
          }`}
          onClick={() => handleCloseSiderBar()}
        >
          <Image
            src="/icon/close.svg"
            width={0}
            height={0}
            alt=""
            className="w-[15px] h-auto"
          />
        </button>
        <button
          className={`absolute left-[30px] top-[50%] transform -translate-y-1/2 w-[50px] h-[50px] ${
            siderWidth <= 80 ? "block" : "hidden"
          } rounded-full`}
          onClick={() => handleOpenSiderBar()}
        >
          <Image
            src="/icon/back_bgwhite.svg"
            width={0}
            height={0}
            alt=""
            className="w-[40px] h-auto scale-x-[-1]"
          />
        </button>
        <div className="w-full flex flex-col justify-start items-center h-full">
          <div
            className={`mt-[65px]  ${
              siderWidth >= 250
                ? "inline-flex justify-center ml-[20px] mb-[30px]"
                : `flex justify-center mb-[40px]`
            }`}
          >
            <div
              className={`h-auto ${
                siderWidth >= 250 ? "w-[50px]" : "w-[40px]"
              } text-left`}
            >
              {loading && (
                <div className="w-full aspect-square  rounded-[10px]"></div>
              )}
              <Image
                src="/chicken/logo.png"
                width={150}
                height={0}
                alt=""
                className="rounded-full"
                priority={true}
                onLoad={() => setLoading(false)}
              />
            </div>
          </div>

          <SiderList pathname={pathname} siderWidth={siderWidth} />

        </div>
      </div>
    </>
  );
};
export default Sider;
