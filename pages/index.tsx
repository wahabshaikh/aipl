import type { NextPage } from "next";
import Head from "next/head";
import { FormEventHandler, useState } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

const Home: NextPage = () => {
  const [keyword, setKeyword] = useState("");
  const [pickupLine, setPickupLine] = useState("");

  const generatePickupLine = async (keyword: string) => {
    setPickupLine(
      `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit error, aperiam facere impedit quis libero ex vel nesciunt id, odio magnam nemo possimus ullam ab? Autem debitis alias accusantium est?`
    );
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    await generatePickupLine(keyword);
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Head>
        <title>AI Pickup Lines</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />

      <main className="wrapper grid flex-1 gap-16 py-8 sm:grid-cols-2">
        <section className="flex h-full w-full items-center rounded-[20px] bg-brand px-8 py-6 text-3xl font-bold text-white shadow-lg shadow-brand">
          {!!pickupLine ? (
            <p>{pickupLine}</p>
          ) : (
            <p>
              Are you a <span>{keyword || "____"}</span>?
              <br /> Because...
            </p>
          )}
        </section>

        <section className="flex flex-col justify-center gap-4">
          <form className="space-y-2" onSubmit={handleSubmit}>
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
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-full">
              Generate
            </button>
          </form>
          <fieldset className="border-t border-black">
            <legend className="mx-auto px-4 text-2xl">OR</legend>
            <button
              onClick={() => generatePickupLine("random")}
              className="btn btn-primary mt-4 w-full"
            >
              Surprise me!
            </button>
          </fieldset>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
