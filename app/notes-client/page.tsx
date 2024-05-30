"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import BackButton from "@/components/BackButton";

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
    <div>
      <BackButton />
      <pre>{JSON.stringify(notes, null, 2)}</pre>;
    </div>
  );
}
