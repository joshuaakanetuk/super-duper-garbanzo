import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  if (searchParams.get("secret") !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  const slug = searchParams.get("slug");

  revalidatePath("/");
  if (slug) {
    revalidatePath(`/blog/${slug}`);
  }

  return NextResponse.json({ revalidated: true });
}