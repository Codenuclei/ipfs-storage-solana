import { NextRequest, NextResponse } from "next/server";
import pinataSDK from "@pinata/sdk";
import fs from "fs";
const connection = new pinataSDK(
  process.env.PINATA_API_KEY,
  process.env.PINATA_SECRET_API_KEY
);
export async function GET(req: NextRequest) {
  const pathf = req.nextUrl.searchParams.get("path");
  if (!pathf) {
    return NextResponse.json({ error: "Path parameter is required" }, { status: 400 });
  }
  const file = fs.createReadStream(pathf);
  const filename = req.nextUrl.searchParams.get("filename");
  if (!filename) {
    return NextResponse.json({ error: "Filename parameter is required" });
  }
  const options = {
    pinataMetadata: {
      name: filename,
    },
    pinataOptions: {
      cidVersion: 0 as 0 | 1,
    },
  };
  try {
    const pinataResponse = await connection.pinFileToIPFS(file, options);
    return NextResponse.json(pinataResponse);
  } catch (error) {
    console.error('IPFS upload error:', error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
