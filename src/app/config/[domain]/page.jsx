import ConfigClient from "./configClient";
import { getClientInfoByDomain } from "@/app/api/util/actions";
import ThemeClientServer from "./themeClientServer";

export default async function ConfigServerSide({ params }) {
  const { domain } = params;
  const { client } = await getClientInfoByDomain(domain);

  return (
    <div className="flex flex-col gap-6 w-full mx-auto p-4  transition">
      <div>
        <h2 className="text-3xl font-bold mb-4">Theme</h2>
        <ThemeClientServer domain={domain} client={client} />
      </div>
      <div>
        <h2 className="text-3xl font-bold mb-4">Timeline Jobs</h2>
        <ConfigClient client={client} />
      </div>
    </div>
  );
}
