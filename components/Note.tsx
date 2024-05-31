import { StringLiteral } from "typescript";

interface Props {
  id: number;
  created: Date;
  title: string;
  body: string;
}

export default function Note({ id, created, title, body }: Props) {
  return (
    <div className="border-gray-400 w-1/4 m-2">
      <div className="bg-gray-200 font-semibold rounded-t-xl px-4 py-1">
        {title}
      </div>
      <div className="bg-white min-h-24 p-4">{body}</div>
      <div className="bg-gray-100 text-sm text-gray-400 rounded-b-xl px-4 py-1">
        {created.toDateString()} at {created.toLocaleTimeString()}
      </div>
    </div>
  );
}
