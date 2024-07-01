"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useWallet } from "@/providers/WalletProvider";

const NewNFTs = ({ item }) => {
  const router = useRouter();
  const { setSelectedNFT } = useWallet();

  return (
    <>
      <button
        className={`w-full flex-none relative hover:border-2 rounded-xl border-[#67ffff] transition-all duration-100`}
        onClick={() => {
          setSelectedNFT(item);
          router.push(`/marketplace/${item.nft_address}`);
        }}
      >
        <img
          src={item.nft.cached_image_uri}
          width={0}
          height={0}
          alt=""
          className="w-full aspect-[4/3] rounded-t-[18px]"
        />
        <div className="w-full h-20 bg-black rounded-b-[18px] bg-opacity-25 backdrop-blur-[10px] flex items-center justify-center px-[20px]">
          <div className="w-full inline-flex justify-between items-center">
            <p>{item.nft.name}</p>
            <div className="flex gap-1 text-right">
              <p className="text-[9px]">{item.price} SOL</p>
              <Image
                src="/icon/sol.svg"
                width={18}
                height={0}
                alt=""
                className="h-auto"
                priority={true}
              />
            </div>
          </div>
        </div>
      </button>
    </>
  );
};
export default NewNFTs;
