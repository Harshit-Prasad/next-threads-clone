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

const THREADS_COUNT = 8;

export default function HomeThreadsInfiniteScrolling({
  initialThreads,
}: Props) {
  const { ref, inView } = useInView();
  const [data, setData] = useState<JSX.Element[]>(initialThreads);
  const [page, setPage] = useState(1);
  const [stopFetch, setStopFetch] = useState<boolean>(false);

  useEffect(() => {
    if (inView) {
      const next = page + 1;
      getThreads(next, THREADS_COUNT).then((res: ThreadType[]) => {
        console.log(res);
        if (res?.length && !stopFetch) {
          setPage(next);
          const threads = res.map((thread: ThreadType, index: number) => {
            return (
              <ThreadCard
                key={thread._id.toString()}
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
        } else {
          setStopFetch(true);
        }
      });
    }
  }, [inView, page, stopFetch]);

  return (
    <>
      <section className="flex flex-col gap-10">{data}</section>
      {!stopFetch && (
        <div ref={ref}>
          <Spinner />
        </div>
      )}
    </>
  );
}
