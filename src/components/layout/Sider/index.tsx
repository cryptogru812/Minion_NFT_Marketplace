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
  const [transition, setTransition] = useState<boolean>(true);

  const { connStatus, solanaConnect, walletID } = useWallet();

  const handleCloseSiderBar = () => {
    setSiderWidth(80);
    const sidebar = document.querySelector(".resize-current") as HTMLElement;
    sidebar.style.width = `${80}px`;
  };

  const handleOpenSiderBar = () => {
    if (window.innerWidth < 768) {
      setSiderWidth(250);
      const sidebar = document.querySelector(".resize-current") as HTMLElement;
      sidebar.style.width = `${100}vw`;
    } else {
      setSiderWidth(250);
      const sidebar = document.querySelector(".resize-current") as HTMLElement;
      sidebar.style.width = `${250}px`;
    }
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
    const handleResize = () => {
      const sidebar = document.querySelector(".resize-current") as HTMLElement;

      if (window.innerWidth < 768) {
        setSiderWidth(80);
        sidebar.style.width = `${80}px`;
        sidebar.style.position = "fixed";
        sidebar.style.zIndex = "999";
      } else {
        setSiderWidth(250);
        sidebar.style.width = `${250}px`;
        sidebar.style.position = "relative";
        sidebar.style.zIndex = "0";
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  useEffect(() => {
    const sidebar = document.querySelector(".resize-current") as HTMLElement;
    if (!sidebar) {
      return;
    }
    if (window.innerWidth < 768) {
      if (siderWidth <= 80) {
        sidebar.style.backgroundColor = "transparent";
      } else {
        sidebar.style.backgroundColor = "#1717177f";
      }
    } else {
      sidebar.style.backgroundColor = "#1717177f";
    }
  }, [siderWidth]);

  return (
    <>
      <div
        className={`prevent-select bg-opacity-60 justify-start bg-[#171717] h-full relative resize-current w-[250px] min-w-[80px] overflow-auto ${
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
        <div className="w-full flex flex-col justify-start mt-[10vh] items-center h-full">
          <div className="items-center">
            <ul className="text-white text-md">
              <div className="w-full inline-flex items-center justify-center">
                <button
                  className={`px-5 h-[40px] rounded-full border border-[#535353] inline-flex items-center justify-center font-triviaGothic text-[12px] hover:opacity-70 transition-all duration-100`}
                  onClick={() => handleClick()}
                >
                  <Image
                    src="/icon/phantom.svg"
                    width={0}
                    height={0}
                    alt={"logo"}
                    priority={true}
                    className="w-[25px] h-auto"
                  />
                  {siderWidth > 200 ? (
                    <>
                      <div className="ml-[7px] mr-[7px] text-white">
                        {connStatus
                          ? formatAddress(walletID)
                          : "Connect Wallet"}
                      </div>
                      {connStatus && (
                        <Image
                          src="/icon/copy.svg"
                          width={0}
                          height={0}
                          alt={"logo"}
                          priority={true}
                          className="w-[15px] h-auto"
                        />
                      )}
                    </>
                  ) : null}
                </button>
              </div>
            </ul>
          </div>
          <hr className="w-[90%] mt-3 border-[#535353]" />
          <SiderList pathname={pathname} siderWidth={siderWidth} />
        </div>
      </div>
    </>
  );
};
export default Sider;
