import ContactsClient from "./contactClient";
import { getClientInfoByDomain } from "@/app/api/util/actions";
import { redirect } from "next/navigation";

export default async function Contacts({ params }) {
  const { domain } = params;
  const { client } = await getClientInfoByDomain(domain);
  if (!client) {
    redirect("/blogui");
  }
  return <ContactsClient client={client} />;
}
