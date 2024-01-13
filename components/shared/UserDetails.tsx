"use client";

import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { profileSchema } from "@/lib/validations/user.validation";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { usePathname, useRouter } from "next/navigation";
import { Textarea } from "../ui/textarea";
import Image from "next/image";
import React, { useState } from "react";
import { isBase64Image } from "@/lib/utils";
import { useUploadThing } from "@/lib/uploadthing";

type Props = {
  btnTitle: string;
  heading: string;
  userDetails: {
    id: string;
    bio?: string;
    username: string;
    profile_photo: string;
  };
};

type UpdateResponse = {
  ok: boolean;
  message: string;
};

export default function UserDetails({ btnTitle, userDetails }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();

  const [files, setFiles] = useState<File[]>([]);
  const { startUpload } = useUploadThing("media");

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      bio: userDetails?.bio || "",
      username: userDetails?.username || "",
      profile_photo: userDetails?.profile_photo || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof profileSchema>) => {
    const blob = values.profile_photo;

    const hasImageChanged = isBase64Image(blob);
    if (hasImageChanged) {
      const imgRes = await startUpload(files);

      if (imgRes && imgRes[0].url) {
        values.profile_photo = imgRes[0].url;
      }
    }

    const body = {
      id: userDetails.id,
      bio: values.bio,
      username: values.username,
      image: values.profile_photo,
      path: pathname,
    };

    const response: UpdateResponse = await axios.put(
      "/api/users/profile",
      body
    );

    toast({
      title: response.ok ? "Successful" : "Unsuccessful",
      description: response.message,
    });

    if (pathname === "/profile/edit") {
      router.back();
    } else {
      router.push("/");
    }
  };

  const handleImage = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();

    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFiles(Array.from(e.target.files));

      if (!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        fieldChange(imageDataUrl);
      };

      fileReader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full sm:w-[450px] rounded-[1em] flex flex-col justify-start gap-10 bg-dark-3 p-5 sm:p-10 mb-3 sm:mb-5"
        >
          <FormField
            control={form.control}
            name="profile_photo"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormLabel className="flex justify-between items-center">
                  <span className="text-base-semibold text-light-2">
                    Profile Photo
                  </span>
                  {field.value ? (
                    <Image
                      src={field.value}
                      alt="Profile photo"
                      width={48}
                      height={48}
                    />
                  ) : (
                    <Image
                      src="/assets/def_profile_photo.svg"
                      alt="Profile photo"
                      width={48}
                      height={48}
                    />
                  )}
                </FormLabel>
                <FormControl className="text-light-2">
                  <Input
                    placeholder="Ideal radio 1:1"
                    type="file"
                    onChange={(e) => {
                      handleImage(e, field.onChange);
                    }}
                  />
                </FormControl>

                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormLabel className="text-base-semibold text-light-2">
                  Username
                </FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>

                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormLabel className="text-base-semibold text-light-2">
                  Bio
                </FormLabel>
                <FormControl>
                  <Textarea
                    rows={5}
                    className="account-form_input no-focus"
                    {...field}
                  />
                </FormControl>

                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <Button className="bg-primary-500" type="submit">
            {btnTitle}
          </Button>
        </form>
      </Form>
    </>
  );
}
