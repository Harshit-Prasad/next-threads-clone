import { Skeleton } from "@/components/ui/skeleton";

export default function loading() {
  return (
    <div className="my-4">
      <div className="bg-dark-2 p-4 rounded-lg">
        <Skeleton className="bg-[rgba(255,255,255,0.25)] h-14 w-1/3 mb-4 p-4 rounded-lg" />
        <div className="flex justify-between gap-3">
          <Skeleton className="bg-[rgba(255,255,255,0.25)] h-10 w-1/2" />
          <Skeleton className="bg-[rgba(255,255,255,0.25)] h-10 w-1/2" />
        </div>
      </div>
      <div className="flex flex-col gap-1 my-5">
        {Array.from({ length: 3 }).map((_, idx) => {
          return (
            <div
              key={idx}
              className="bg-dark-2 flex items-center justify-between gap-2 my-1 p-5 rounded-lg"
            >
              <Skeleton className="bg-[rgba(255,255,255,0.25)] h-12 w-12 rounded-full" />
              <div className="w-full flex flex-col gap-2">
                <Skeleton className="bg-[rgba(255,255,255,0.25)] h-8 w-1/3" />
                <Skeleton className="bg-[rgba(255,255,255,0.25)] h-8 w-1/2" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
