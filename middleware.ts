//must be called middleware.ts for Next
//runs before every single request.
//note the different types than in pages/api
import * as jose from "jose";

import { NextRequest, NextResponse } from "next/server";
export async function middleware(req: NextRequest, res: NextResponse) {
  const bearerToken = req.headers.get("authorization") as string;
  //const bearerToken = req.headers["authorization"] as string;

  //the new response is a NextResponse object. Different but that's how it's done
  //in middleware
  if (!bearerToken) {
    //return res.status(401).json({ errorMessage: "not authorized: no bearer" });
    return new NextResponse(
      JSON.stringify({ errorMessage: "not authorized: no bearer" }),
      { status: 401 }
    );
  }

  const token = bearerToken.split(" ")[1];

  if (!token) {
    return new NextResponse(
      JSON.stringify({ errorMessage: "not authorized" }),
      { status: 401 }
    );
  }

  //verify token
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  try {
    await jose.jwtVerify(token, secret);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ errorMessage: "not authorized" }),
      { status: 401 }
    );
  }
}

//rather than running on every single call
//we can specify a matcher to only run on certain endpoints
export const config = {
  matcher: ["/api/auth/me"],
};
