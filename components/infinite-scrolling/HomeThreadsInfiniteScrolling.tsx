"use client";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Spinner from "../shared/Spinner";
import { getThreads } from "@/lib/actions/thread.actions";
import ThreadCard from "../cards/ThreadCard";
import { ThreadType } from "@/lib/models/thread.model";

type Props = {
  initialThreads: JSX.Element[];
};

export default function HomeThreadsInfiniteScrolling({
  initialThreads,
}: Props) {
  const { ref, inView } = useInView();
  const [data, setData] = useState<JSX.Element[]>(initialThreads);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (inView) {
      const next = page + 1;
      getThreads(next, 4).then((res: ThreadType[]) => {
        if (res?.length) {
          setPage(next);
          const threads = res.map((thread: ThreadType, index: number) => {
            return (
              <ThreadCard
                id={thread._id.toString()}
                content={thread.content}
                author={thread.author}
                comments={thread.children}
                index={index}
              />
            );
          });
          setData((prev: JSX.Element[]) => [
            ...(prev?.length ? prev : []),
            ...threads,
          ]);
        }
      });
    }
  }, [inView]);

  return (
    <>
      <section className="flex flex-col gap-10">{data}</section>
      <div ref={ref}>
        <Spinner />
      </div>
    </>
  );
}
