"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useStore } from "@/zustand/config";
import { formatHeroText } from "@/lib/utils";
import ProfileDefault from "@/public/profile.jpg";
import PaymentComponent from "@/components/stripe/payment";
import { Instagram, Linkedin, Facebook } from "lucide-react";
import { useClientStorage } from "@/hooks/useClientStore";

export function HomeClient({ client, isAdmin }) {
  const { client: clientStore } = useStore((state) => state);

  useClientStorage(client);

  return (
    <div className="flex flex-col-reverse md:flex-row justify-between items-center">
      <div className="flex flex-col h-full justify-between md:w-2/3 mb-8 md:mb-0">
        <h1 className=" hover:text-secondary text-2xl md:text-4xl font-bold mb-2">
          {`Hi! I'm ${clientStore?.firstName || "{ Your first name }"} 👋🏼`}
        </h1>
        <div className="min-h-[500px] m-6 text-base">
          {clientStore?.hero
            ? formatHeroText(clientStore?.hero).map((sentence, index) => (
                <p key={index} className="mb-3 max-w-xl">
                  {sentence}
                </p>
              ))
            : ""}
        </div>
        {clientStore?.resumeLink && (
          <Button className="btn btn-primary w-fit hover:cursor-pointer">
            <a href={clientStore?.resumeLink} target="_blank">
              See Resume
            </a>
          </Button>
        )}
        {isAdmin && !client?.isSubscribed && (
          <div className="my-4 md:hidden">
            <PaymentComponent domain={clientStore?.domain} />
          </div>
        )}
      </div>
      <div className="flex flex-col h-full md:w-1/3 justify-center  items-center">
        <Image
          src={clientStore?.imageUrl || ProfileDefault}
          alt={`Profile of ${clientStore?.firstName}`}
          width={300}
          height={300}
          className="self-center h-[300px] md:h-fit rounded-full object-cover"
        />
        <div className="flex justify-center gap-10 p-8">
          {client?.instagram && (
            <a
              href={client?.instagram}
              target="_blank"
              className=" hover:text-primary"
            >
              <Instagram size={24} />
            </a>
          )}
          {client?.linkedin && (
            <a
              href={client?.linkedin}
              target="_blank"
              className=" hover:text-primary"
            >
              <Linkedin size={24} />
            </a>
          )}
          {client?.facebook && (
            <a
              href={client?.facebook}
              target="_blank"
              className=" hover:text-primary"
            >
              <Facebook size={24} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
