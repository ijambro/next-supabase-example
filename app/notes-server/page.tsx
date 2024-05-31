/**
 * Server component
 *
 * This means it gets executed / hydrated on the server,
 * where it can perform async calls without needing useState/useEffect to load data.
 */
import AddNote from "@/components/AddNote";
import HomeButton from "@/components/HomeButton";
import Note from "@/components/Note";
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
    <>
      <HomeButton />

      <div className="bg-purple-400 w-full h-full p-4 flex justify-around ">
        {notes
          ? notes.map((n) => (
              <Note
                key={n.id}
                id={n.id}
                created={new Date(n.created_at)}
                title={n.title}
                body={n.body}
              />
            ))
          : null}
      </div>

      <div className="bg-yellow-200 w-full p-4">
        <h2 className="text-3xl text-center text-gray-400">Write a Note:</h2>

        <AddNote />
      </div>

      <div className="bg-gray-100 w-full py-4">
        <h2 className="text-3xl text-center text-gray-400">Response data:</h2>
        <pre>
          {notes
            ? JSON.stringify(notes, null, 2)
            : "No response data available"}
        </pre>
        ;
      </div>
    </>
  );
}
