"use client";

import Link from "next/link";
import TimelineItem from "@/app/[domain]/jobs/timeLineItem";
import { useClientStorage } from "@/hooks/useClientStore";

export default function TimelineJobs({ client }) {
  useClientStorage(client);
  const { timeline } = client;
  const parsedData =
    typeof timeline === "string" ? JSON.parse(timeline) : timeline;

  return (
    <div className="w-full mx-auto p-4 bg-cream-50 transition">
      <div className="text-center mb-12">
        <h2 className="text-xl md:text-3xl font-semibold  mb-3">
          Professional Timeline
        </h2>
        <div className="flex justify-center gap-1.5">
          <span className="w-12 h-0.5 bg-blue-200"></span>
          <span className="w-12 h-0.5 bg-purple-200"></span>
          <span className="w-12 h-0.5 bg-blue-200"></span>
        </div>
      </div>
      <div className="relative">
        {parsedData?.map((item, idx) => (
          <TimelineItem key={idx} {...item} index={idx} />
        ))}
      </div>
      <div className="flex flex-col w-auto items-end font-semibold">
        <Link href="#body-item" className="w-fit m-4">
          Go Up!
        </Link>
      </div>
    </div>
  );
}
