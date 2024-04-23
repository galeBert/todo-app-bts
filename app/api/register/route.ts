import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();

    const { name, email, password } = await req.json();

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.findOne({ email }).select("_id");
    if (user) {
      return NextResponse.json({ message: "user alr exist" }, { status: 500 });
    }

    await User.create({ name, email, password: hashedPassword });
    return NextResponse.json({ message: "user registered" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: `something went wrong ${error}` },
      { status: 500 }
    );
  }
}
