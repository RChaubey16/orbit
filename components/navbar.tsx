import Link from "next/link";
import { DynaPuff } from "next/font/google";

const dynaPuff = DynaPuff({ subsets: ["latin"] });

export function Navbar() {
  return (
    <header className="w-full border-b border-zinc-100 bg-white">
      <div className="flex h-14 items-center justify-center">
        <Link href="/" className={`${dynaPuff.className} text-3xl text-zinc-900`}>
          ORBIT.
        </Link>
      </div>
    </header>
  );
}
