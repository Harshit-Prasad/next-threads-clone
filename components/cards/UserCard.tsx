"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";

type Props = {
  id: string;
  username: string;
  imgUrl: string;
  personType: string;
};

export default function UserCard({ id, username, imgUrl, personType }: Props) {
  const router = useRouter();
  return (
    <article className="user-card">
      <div className="user-card_avatar">
        <div className="relative h-12 w-12">
          <Image
            src={imgUrl}
            alt="user_logo"
            fill
            className="rounded-full object-cover"
          />
        </div>

        <div className="flex-1 text-ellipsis">
          <h4 className="text-base-semibold text-light-1">{username}</h4>
        </div>
      </div>

      <Button
        className="user-card_btn"
        onClick={() => {
          router.push(`/profile/${id}`);
        }}
      >
        View
      </Button>
    </article>
  );
}
