/**
 * Server component
 *
 * This means it gets executed / hydrated on the server,
 * where it can perform async calls without needing useState/useEffect to load data.
 */
import BackButton from "@/components/BackButton";
import { createClient } from "@/utils/supabase/server";

export default async function Page() {
  console.log("[server] Rendering app/notes");

  const supabase = createClient();
  const result = await supabase.from("notes").select();
  console.log("[server] Rendering app/notes with data", result);

  let notes;
  if (!result.error && result.data) {
    notes = result.data;
  }

  return (
    <div>
      <BackButton />
      <pre>{JSON.stringify(notes, null, 2)}</pre>;
    </div>
  );
}
