"use client";

import { Button } from "@/components/ui/button";
import { Card, CardDescription } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckSquareIcon, PlusIcon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import React, { useRef, useState } from "react";

type CheckList = { text: string; checked: false };
type Notes = { text: string; checklist?: CheckList[] };
function generateRandomColor() {
  let red, green, blue;
  do {
    // Generate random RGB values
    red = Math.floor(Math.random() * 256);
    green = Math.floor(Math.random() * 256);
    blue = Math.floor(Math.random() * 256);
  } while (red === 0 && green === 0 && blue === 0); // Repeat if the color is black

  return `rgb(${red}, ${green}, ${blue})`;
}
export default function Home() {
  const { data: session } = useSession();

  const [checkList, setCheckList] = useState<CheckList[]>([]);

  const [notes, setNotes] = useState<Notes[]>([]);
  const [text, setText] = useState("");

  const handleClick = () => {
    setCheckList((prev) => [...prev, { text: "", checked: false }]);
  };

  const handleChange = (index: number, value: string) => {
    const newChecklist = [...checkList];
    newChecklist[index].text = value;
    setCheckList(newChecklist);
  };

  const handleSubmit = () => {
    setNotes((prev) => [...prev, { text, checklist: checkList }]);
    setText("");
    setCheckList([]);
  };
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter" && index === checkList.length - 1) {
      handleClick();
    } else {
      inputRefs.current[index + 1]?.focus();
    }
  };
  return (
    <div className="w-full min-h-screen flex py-4 flex-col  container space-y-4">
      <Label className="text-4xl">Hello,{session?.user?.name}</Label>
      <Card className="p-2 space-y-2">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="add notes..."
        />
        {checkList.map((_, idx) => {
          return (
            <div className="flex space-x-1 space-y-2 items-center">
              <PlusIcon className="text-gray-400" width={16} />
              <Input
                ref={(el) => {
                  inputRefs.current[idx] = el;
                }}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                className="border-none"
                onChange={(e) => handleChange(idx, e.target.value)}
                placeholder={String(idx)}
              />
            </div>
          );
        })}
        <div className="flex items-center justify-end space-x-2">
          <Button onClick={handleClick} variant="outline">
            <CheckSquareIcon />
          </Button>
          <Button disabled={!text && !checkList.length} onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </Card>

      <div className="w-full flex flex-wrap   min-h-full">
        {notes.map((note) => {
          return (
            <Card className="h-full p-2 m-2">
              <p className="text-wrap">{note.text}</p>
              {note.checklist?.map((list) => {
                return (
                  <div className="w-full flex space-x-2 m-1">
                    <Checkbox />
                    <Label>{list.text}</Label>
                  </div>
                );
              })}
            </Card>
          );
        })}
      </div>
      <Button
        variant="destructive"
        onClick={() => signOut()}
        className=" text-white font-bold px-6 py-2 mt-3"
      >
        Log Out
      </Button>
    </div>
  );
}
