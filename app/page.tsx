import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import HomeContent from "@/components/HomeContent";

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  return <HomeContent session={session} />;
}
