import { Button } from "~/components/ui/button";
import { auth } from "~/server/auth";
import { api } from "~/trpc/server";
import Dashboard from "./_components/dashboard";
import Link from "next/link";
// import { Input } from "~/components/ui/input";

export default async function Home() {

  const session = await auth();

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  return (
    <main className="flex h-[calc(100vh - 16px)] items-center flex-col mt-10">
      <div className="h-20 w-20 rounded-full bg-[#ffffa9] absolute left-72"></div>
      <div className="h-20 w-20 bg-[#fed9df] absolute left-[76rem] -rotate-45"></div>
      <div className="h-0 w-0 border-l-[30px] border-r-[30px] border-b-[60px] border-solid border-transparent border-b-[#f7b5f7] absolute left-[62rem] rotate-45"></div>
      <h1 className="font-bold text-6xl mb-3">📨Task<span className="border-b-8 border-b-[#f6a4f6]"><em>Hire</em></span></h1>
      <h3 className="text-xl">Smart Tracking for Your Career.</h3>
      <p className="text-sm max-w-[35rem]">Stay organized and efficient in your job search with an all-in-one tool to
        track applications,
        <span className="text-[#ffb7c3]"> Focus on landing your next opportunity</span>.</p>
      <div className="flex gap-3 mt-3">
        <Button>Get Started</Button>
        <Link href={""}><Button variant={"outline"}>Start on Github</Button></Link>
      </div>
      {/* comporbar si se inicio sesion */}
      {session ? <Dashboard></Dashboard> : "none"}
    </main>
  );
}
