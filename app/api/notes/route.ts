import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

const ERROR_SUPABASE_QUERY = "Internal error: no result from Supabase";

export async function GET(request: NextRequest, response: NextResponse) {
  console.log("GET /api/notes", request.url);

  const supabase = createClient();

  // Verify the user is logged in
  const userResponse = await supabase.auth.getUser();
  if (!userResponse || userResponse.error) {
    return NextResponse.json(
      { error: userResponse?.error ?? "Unauthorized: Please log in." },
      { status: 401, statusText: "Unauthorized" }
    );
  }

  const result = await supabase
    .from("notes")
    .select()
    .order("created_at", { ascending: true });

  console.log("[server] Rendering app/notes with data", result);

  return NextResponse.json(result.data, {
    status: result?.status ?? 500,
    statusText: result?.statusText ?? ERROR_SUPABASE_QUERY,
  });
}

export async function POST(request: NextRequest, response: NextResponse) {
  console.log("POST /api/notes");
  const { title, body } = await request.json();

  const supabase = createClient();

  // Verify the user is logged in
  const userResponse = await supabase.auth.getUser();
  if (!userResponse || userResponse.error) {
    return NextResponse.json(
      { error: userResponse?.error ?? "Unauthorized: Please log in." },
      { status: 401, statusText: "Unauthorized" }
    );
  }

  const result = await supabase.from("notes").insert({
    title,
    body,
    user_id: userResponse.data.user?.id,
  });

  console.log("POST /api/notes with supabase result", result);

  return NextResponse.json(result.data, {
    status: result?.status ?? 500,
    statusText: result?.statusText ?? ERROR_SUPABASE_QUERY,
  });
}
