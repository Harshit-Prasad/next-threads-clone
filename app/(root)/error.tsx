"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

type Props = {
  error: Error;
  reset: () => void;
};

export default function error({ error, reset }: Props) {
  return (
    <div className="bg-dark-2  p-8 rounded-lg shadow-lg  max-w-md w-full mx-auto">
      <h1 className="head-text font-bold text-red-500 mb-8">{error.name}</h1>
      <p className="text-light-2 mb-6">{error.message}</p>
      <div className="flex justify-between">
        <Button
          className="py-3 px-6 bg-red-500  hover:bg-red-600   text-white rounded-lg font-semibold"
          onClick={reset}
        >
          Try again
        </Button>
        <Link
          href="/"
          className="p-2 hover:text-light-2 hover:outline-2 hover:outline-white hover:outline text-white rounded-lg font-semibold"
        >
          Go back to homepage
        </Link>
      </div>
    </div>
  );
}
