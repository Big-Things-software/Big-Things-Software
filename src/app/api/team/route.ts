import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    members: [
      {
        id: "1",
        name: "Core Team",
        role: "Development & Strategy",
        bio: "The founding team driving Big Things Software's mission forward.",
      },
    ],
  });
}
