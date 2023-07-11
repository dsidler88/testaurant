//needs to be in the same folder as the app.tsx file
//needs to be named loading.tsx and Next will recognize it

import React from "react";
import Header from "./components/Header";

//app directory, so it's default loading state.
//go to another directory for that section's lodaing state
export default function Loading() {
  return (
    <main>
      <Header />
      <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
        {[1, 2, 3, 4,5, 6, 7, 8, 9, 10, 11, 12 ].map((item) => (
          <div
            key={item}
            className="animate-pulse bg-purple-800 w-64 h-72 m-3 rounded-3xl overflow-hidden border cursor-pointer"
          ></div>
        ))}
      </div>
    </main>
  );
}
