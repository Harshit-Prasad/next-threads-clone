"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Input } from "../ui/input";

function Searchbar() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search) {
        router.push(`/search?q=${search}`);
      } else {
        router.push("/search");
      }
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  return (
    <div className="searchbar">
      <Image
        src="/assets/search-gray.svg"
        alt="search"
        width={24}
        height={24}
        className="object-contain"
      />
      <Input
        id="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search users"
        className="no-focus searchbar_input"
      />
    </div>
  );
}

export default Searchbar;
