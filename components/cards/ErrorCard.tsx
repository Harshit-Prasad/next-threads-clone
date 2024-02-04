import Link from "next/link";
import React from "react";

type Props = {
  error: string;
};

export default function ErrorCard({ error }: Props) {
  return (
    <div className="bg-dark-2  p-8 rounded-lg shadow-lg  max-w-md w-full mx-auto">
      <h1 className="head-text font-bold text-red-500 mb-8">
        Server Error: 500
      </h1>
      <p className="text-light-2 mb-8">{error}</p>
      <Link
        href="/"
        className="p-3 hover:text-light-2 hover:outline-2 hover:outline-white hover:outline text-white rounded-lg font-semibold"
      >
        Go back to homepage
      </Link>
    </div>
  );
}
