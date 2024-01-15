import Image from "next/image";
import Link from "next/link";

type Props = {
  currentUser: string;
  profileUser: string;
  bio: string;
  username: string;
  profile_photo: string;
};

export default function UserProfile({
  currentUser,
  profileUser,
  bio,
  username,
  profile_photo,
}: Props) {
  return (
    <div className="flex w-full flex-col justify-start mt-7">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative h-20 w-20 object-cover">
            <Image
              src={profile_photo}
              alt="logo"
              fill
              className="rounded-full object-cover shadow-2xl"
            />
          </div>

          <div className="flex-1">
            <h2 className="text-left text-heading3-bold text-light-1">
              {username}
            </h2>
          </div>
        </div>
        {profileUser === currentUser && (
          <Link href="/profile/edit">
            <div className="flex cursor-pointer gap-3 rounded-lg bg-dark-3 px-4 py-2">
              <Image
                src="/assets/edit.svg"
                alt="logout"
                width={16}
                height={16}
              />

              <p className="text-light-2 max-sm:hidden">Edit</p>
            </div>
          </Link>
        )}
      </div>
      <p className="mt-6 max-w-lg text-base-regular text-light-2">{bio}</p>

      <div className="mt-12 h-0.5 w-full bg-dark-3" />
    </div>
  );
}
