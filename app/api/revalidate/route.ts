import crypto from "crypto";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

interface PostObject {
  slug: string;
  status?: string;
}

interface GhostWebhookPayload {
  post?: { current: PostObject; previous?: Partial<PostObject> };
  page?: { current: PostObject; previous?: Partial<PostObject> };
  member?: { current: unknown; previous?: unknown };
}

function verifyGhostSignature(
  signatureHeader: string | null,
  body: string,
  secret: string,
): boolean {
  if (!signatureHeader) return false;

  const parts = Object.fromEntries(
    signatureHeader.split(",").map((p) => {
      const [k, v] = p.trim().split("=");
      return [k, v];
    }),
  );

  const providedHash = parts["sha256"];
  const timestamp = parts["t"];
  if (!providedHash || !timestamp) return false;

  const expected = crypto
    .createHmac("sha256", secret)
    .update(`${body}${timestamp}`)
    .digest("hex");

  const a = Buffer.from(providedHash, "hex");
  const b = Buffer.from(expected, "hex");
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "Server misconfigured" },
      { status: 500 },
    );
  }

  const rawBody = await request.text();
  const signature = request.headers.get("x-ghost-signature");

  if (!verifyGhostSignature(signature, rawBody, secret)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let payload: GhostWebhookPayload;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const revalidated: string[] = [];
  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/sitemap.xml");
  revalidated.push("/", "/blog", "/sitemap.xml");

  const currentSlug = payload.post?.current?.slug;
  const previousSlug = payload.post?.previous?.slug;

  if (currentSlug) {
    revalidatePath(`/blog/${currentSlug}`);
    revalidated.push(`/blog/${currentSlug}`);
  }
  if (previousSlug && previousSlug !== currentSlug) {
    revalidatePath(`/blog/${previousSlug}`);
    revalidated.push(`/blog/${previousSlug}`);
  }

  return NextResponse.json({ revalidated: true, paths: revalidated });
}
