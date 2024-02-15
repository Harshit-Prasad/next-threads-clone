import UserCard from "@/components/cards/UserCard";
import Searchbar from "@/components/forms/Searchbar";
import {
  getCurrentUser,
  getUserDetails,
  getUsers,
} from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import React from "react";

type Params = {
  searchParams: { [key: string]: string | undefined };
};

export default async function page({ searchParams: { q = "" } }: Params) {
  const user = await getCurrentUser();

  if (!user?.id) redirect("/login");

  const userDetails = await getUserDetails(user.id);

  if (!userDetails?.onboarded) redirect("/onboarding");

  const users = await getUsers({ userId: user.id, searchString: q });

  return (
    <>
      <section className="w-full">
        <Searchbar />

        <div className="mt-14 flex flex-col gap-9">
          {users.length === 0 ? (
            <p className="no-result">No Results</p>
          ) : (
            <>
              {users.map((person) => (
                <UserCard
                  key={person._id.toString()}
                  id={person._id.toString()}
                  username={person.username}
                  imgUrl={person.profile_photo}
                  personType="User"
                />
              ))}
            </>
          )}
        </div>
      </section>
    </>
  );
}
