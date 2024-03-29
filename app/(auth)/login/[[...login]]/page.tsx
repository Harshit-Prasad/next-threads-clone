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
import { loginSchema } from "@/lib/validations/user.validation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { login } from "@/lib/actions/user.actions";

export default function page() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    const { email, password } = values;

    try {
      const body = {
        email,
        password,
      };

      const data = await login(body);

      toast({
        title: data.success ? "Success" : "Error",
        description: data.success ? data.message : data.error,
      });

      router.push("/onboarding");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.messgae,
      });
      throw new Error("Something went wrong");
    }

    form.reset();
  }

  return (
    <>
      <h1 className="head-text py-3 sm:pb-5">Login</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" w-full sm:w-[450px] rounded-[1em] flex flex-col justify-start gap-10 bg-dark-3 p-5 sm:p-10"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormLabel className="text-base-semibold text-light-2">
                  Email
                </FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>

                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormLabel className="text-base-semibold text-light-2">
                  Password
                </FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>

                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <Button className="bg-primary-500 text-light-2" type="submit">
            Login
          </Button>
          <p className="text-light-2">
            Don't have an account?{" "}
            <Link href="/signup" className="text-primary-500">
              Sign-up
            </Link>
          </p>
        </form>
      </Form>
    </>
  );
}
