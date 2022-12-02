import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import clsx from "clsx";

const Home: NextPage = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <Head>
        <title>AI Pickup Lines</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="item-center mx-auto flex max-w-7xl justify-between px-12 py-4">
        <Link href="/">
          <h1 className="text-2xl font-medium">
            😘
            <span className="font-bold text-brand">AI</span>
            PickupLines
          </h1>
        </Link>
        <a
          href="https://twitter.com/Vatsal_Sanghvi"
          target="_blank"
          className="px-8 py-2 font-bold text-black/50"
        >
          say hi on twitter
        </a>
      </nav>

      <main className="mx-auto flex min-h-[calc(100vh-64px)] max-w-7xl flex-col items-center justify-center gap-8 px-12 py-4 text-center">
        <p className={clsx(show ? "block text-xl" : "hidden")}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam
          libero voluptas quaerat dignissimos. Nesciunt reprehenderit
          consequatur sed odio inventore obcaecati corporis, blanditiis fuga.
          Dignissimos sunt reprehenderit adipisci impedit, dolores non!
        </p>

        <button
          className="inline-flex items-center rounded-[20px] border border-transparent bg-brand px-8 py-4 text-2xl font-bold text-white shadow-lg shadow-brand/50 hover:shadow-none focus:outline-none"
          onClick={() => setShow(true)}
        >
          Surprise me!
        </button>
      </main>
    </>
  );
};

export default Home;
