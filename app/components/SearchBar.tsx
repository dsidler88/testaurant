"use client";

import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { AuthenticationContext } from "../context/AuthContext";

export default function SearchBar() {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const { error, loading, data, setAuthState } = useContext(
    AuthenticationContext
  );

  return (
    <div className="text-left text-lg py-3 m-auto flex justify-center">
      <input
        className="rounded  mr-3 p-2 w-[450px]"
        type="text"
        placeholder="State, city or town"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      {/* this onclick is the programmatic navigation, as opposed to next link */}
      <button
        className="rounded bg-slate-700 px-9 py-2 text-white"
        onClick={() => {
          if (location === "") return;
          router.push(`/search?city=${location}`);
          setLocation("BLAH");
        }}
      >
        Let's go {data?.city}
      </button>
    </div>
  );
}
