"use client";
import React, { useState, MouseEvent } from "react";

export default function AddNote() {
  const [title, setTitle] = useState<string>();
  const [body, setBody] = useState<string>();

  const save = async (event: MouseEvent<HTMLButtonElement>) => {
    // "use server";
    console.log("[AddNote] save", event, title, body);
    event.preventDefault();

    // const title = formData.get("note-title") as string;
    // const body = formData.get("note-body") as string;

    const response = await fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        body,
      }),
    });
    console.log("[AddNote] save: response from API", response);

    if (response.ok) {
      const json = await response.json();
      console.log("[AddNote] save: response json from API", json);

      setTitle(undefined);
      setBody(undefined);
    }
  };

  return (
    <form
      //   onSubmit={save}
      className="flex-1 flex flex-col w-full justify-center gap-2"
    >
      <label htmlFor="note-title">Note Title</label>
      <input
        name="note-title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      ></input>
      <label htmlFor="note-body">Note Body</label>
      <input
        name="note-body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      ></input>
      <button
        // type="submit"
        onClick={save}
        className="bg-green-700 rounded-md w-36 px-4 py-2 text-foreground mb-2"
      >
        Save Note
      </button>
    </form>
  );
}
