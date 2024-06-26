"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import HomeButton from "@/components/HomeButton";
import Note from "@/components/Note";

export default function Page() {
  console.log("[client] Rendering app/notes-client");

  const [notes, setNotes] = useState<any[] | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from("notes").select();
      console.log("[client] Rendering app/notes-client with data", data);

      setNotes(data);
    };
    getData();
  }, []);

  return (
    <>
      <HomeButton />

      <div className="bg-teal-400 w-full h-full p-4 flex justify-around ">
        {notes
          ? notes.map((n) => (
              <Note
                id={n.id}
                created={new Date(n.created_at)}
                title={n.title}
                body={n.body}
              />
            ))
          : null}
      </div>

      <div className="bg-gray-100 w-full py-4">
        <h2 className="text-3xl text-center text-gray-400">Response data:</h2>
        <pre>{JSON.stringify(notes, null, 2)}</pre>;
      </div>
    </>
  );
}
