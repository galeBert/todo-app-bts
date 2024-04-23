"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const handleSubmit = async () => {
    try {
      const res = await fetch("api/register", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (res.ok) {
        console.log(res);
        router.push("/login");
      } else {
        const { message } = await res.json();
        setError(message);
      }
    } catch (error) {
      console.log("register", error);
    }
  };
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>
            Please enter your data to register to the platform.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  placeholder="jhoondoe@mail.com"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  onChange={(e) => setName(e.target.value)}
                  id="name"
                  placeholder="jhon"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  onChange={(e) => setPassword(e.target.value)}
                  id="email"
                  placeholder="jhoondoe@mail.com"
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-1">
          {error && <Label className="text-red-600">{error}</Label>}
          <Button
            disabled={!name || !email || !password}
            onClick={handleSubmit}
            className="w-full"
          >
            Register
          </Button>
          <div className="space-x-1">
            <Label className="text-gray-400">Already have account?</Label>
            <Link href="/login">Login</Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
