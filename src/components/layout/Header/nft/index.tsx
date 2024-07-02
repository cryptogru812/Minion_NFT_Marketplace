import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

import SiderList from "../../Sider/sider";

import { useWallet } from "@/providers/WalletProvider";
import formatAddress from "@/lib/formatAddress";

const NFTHeader = () => {
  const { connStatus, solanaConnect, walletID } = useWallet();

  const pathname = usePathname();
  const [loading, setLoading] = useState<boolean>(true);
  const [siderWidth, setSiderWidth] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      setSiderWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full flex items-center justify-between">
      <div className="flex items-center">
        {loading && (
          <div className="w-full aspect-square rounded-[10px]"></div>
        )}
        <Image
          src="/home/logo.png"
          width={60}
          height={60}
          alt=""
          className="rounded-full border-[#e0d6d2] border-2"
          priority={true}
          onLoad={() => setLoading(false)}
        />
        {siderWidth > 500 && (
          <Image
            src="/home/title.png"
            width={200}
            height={0}
            className="ml-3 my-4"
            alt="title"
          />
        )}
      </div>
    </div>
  );
};
export default NFTHeader;
