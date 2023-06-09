"use client";
import React from "react";
import Link from "next/link";
import LoginModal from "./AuthModal";
import { useContext } from "react";
import { AuthenticationContext } from "../context/AuthContext";
import useAuth from "@/hooks/useAuth";
//server components can render client components, not vice versa
export default function NavBar() {
  const { data, loading } = useContext(AuthenticationContext);
  const { signout } = useAuth();
  return (
    <nav className="bg-white p-2 flex justify-between">
      <Link href="" className="font-bold text-gray-700 text-2xl">
        {" "}
        TestLoginHere{" "}
      </Link>
      <div>
        {loading ? null : (
          <div className="flex">
            {data ? (
              <button
                className="bg-blue-400 text-white border px-4 rounded mr-3"
                onClick={signout}
              >
                Sign out
              </button>
            ) : (
              <>
                <LoginModal isSignIn={true} />
                <LoginModal isSignIn={false} />
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
