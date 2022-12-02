import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import clsx from "clsx";

const Home: NextPage = () => {
  const [show, setShow] = useState(false);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Head>
        <title>AI Pickup Lines</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="wrapper flex items-center justify-between">
        <Link href="/">
          <h1 className="text-base font-medium sm:text-2xl">
            <span className="text-brand">😘AI</span>
            PickupLines
          </h1>
        </Link>
        <a
          href="https://gumroad.com/"
          target="_blank"
          className="btn bg-black/5 px-4 py-2 text-xs font-medium hover:bg-black/10 sm:text-base"
        >
          buy on gumroad
        </a>
      </nav>

      <main className="wrapper grid flex-1 gap-16 sm:grid-cols-2">
        <section className="flex h-full w-full items-center justify-center rounded-[20px] bg-brand px-8 py-6 text-3xl font-bold text-white shadow-lg shadow-brand">
          <p>
            Are you a _____?
            <br /> Because...
          </p>
        </section>

        <section className="flex flex-col justify-center space-y-4">
          <form className="space-y-2">
            <div>
              <label htmlFor="keyword" className="sr-only">
                Keyword
              </label>
              <input
                type="text"
                name="keyword"
                id="keyword"
                className="block w-full rounded-2xl border-2 border-black/5 bg-black/5 p-4 focus:border-brand focus:ring-brand"
                placeholder="Enter a keyword (e.g. dictionary, fruit, magician, etc.)"
              />
            </div>
            <button
              className="btn w-full bg-brand px-8 py-4 text-2xl font-bold text-white shadow-lg shadow-brand/50 hover:shadow-none"
              onClick={() => setShow(true)}
            >
              Generate
            </button>
          </form>
          <fieldset className="border-t border-black">
            <legend className="mx-auto px-4 text-2xl">OR</legend>
            <button
              className="btn mt-4 w-full bg-brand px-8 py-4 text-2xl font-bold text-white shadow-lg shadow-brand/50 hover:shadow-none"
              onClick={() => setShow(true)}
            >
              Surprise me!
            </button>
          </fieldset>
        </section>
      </main>

      <footer className="wrapper text-center">
        Made with ❤️ by{" "}
        <a
          href="https://twitter.com/Vatsal_Sanghvi"
          target="_blank"
          rel="noreferrer"
          className="mb-1 border-b border-black"
        >
          Vatsal Sanghvi
        </a>{" "}
        &{" "}
        <a
          href="https://twitter.com/iwahabshaikh"
          target="_blank"
          rel="noreferrer"
          className="mb-1 border-b border-black"
        >
          Wahab Shaikh
        </a>
      </footer>
    </div>
  );
};

export default Home;
