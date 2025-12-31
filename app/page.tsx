import { currentUser } from "@/module/authentication/actions";
import UserButton from "@/module/authentication/components/user-button";
import Image from "next/image";

export default async function Home() {

  const user = await currentUser();

  return (
    <div className="flex flex-col h-screen items-center justify-center" >
      <UserButton user={user} />
    </div>
  );
}
