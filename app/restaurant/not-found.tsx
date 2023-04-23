"use client";

import Image from "next/image";
import errorMascot from "@/public/error.png";

//nextJS automatically injects a prop called error
export default function Error({ error }: { error: Error }) {
  return (
    <div className="h-screen bg-gray-200 flex flex-col justify-center items-center animate-pulse">
      <Image
        src={errorMascot}
        alt="error"
        className="w-56 mb-8 animate-pulse"
      />
      <div className="bg-white px-9 py-14 shadow rounded">
        <h3 className="text-3xl font-bold">Well this is embarassing</h3>
        <p className="text-reg font-bold">We couldn't find that restaurant</p>
        <p className="mt-6 text-sm font-light">Error Code: 404</p>
      </div>
    </div>
  );
}
