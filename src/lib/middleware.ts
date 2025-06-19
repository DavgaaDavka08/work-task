import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // authentication шаардлагатай route-ууд
  const protectedRoutes = ["/api/articles", "/api/comments", "/api/likes"];

  // зөвхөн хамгаалалттай замд л шалгана
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    const authHeader = req.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];

    try {
      verifyToken(token);
      return NextResponse.next(); // зөв бол цааш явуулна
    } catch (err) {
      console.log("err", err);
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
  }

  return NextResponse.next(); // хамгаалалтгүй route
}
