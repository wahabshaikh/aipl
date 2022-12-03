import type { NextPage } from "next";
import Head from "next/head";
import { FormEventHandler, useState } from "react";
import toast from "react-hot-toast";
import {
  TwitterShareButton,
  TwitterIcon,
  FacebookShareButton,
  FacebookIcon,
  TelegramShareButton,
  TelegramIcon,
  WhatsappShareButton,
  WhatsappIcon,
  RedditShareButton,
  RedditIcon,
} from "react-share";
import randomWords from "random-words";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

const Home: NextPage = () => {
  const [keyword, setKeyword] = useState("");
  const [pickupLine, setPickupLine] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const shareUrl = "https://aipickuplines.com";

  const generatePickupLine = async (keyword: string) => {
    setPickupLine("");
    setIsLoading(true);

    try {
      const response = await toast.promise(
        fetch("/api/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ keyword }),
        }),
        {
          loading: `Generating a pickup line...`,
          success: `Your pickup line is generated!`,
          error: `Oops... something went wrong!`,
        }
      );

      const data = await response.json();

      setPickupLine(data.result);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    await generatePickupLine(keyword);
  };

  return (
    <div className="flex min-h-screen w-full flex-col justify-between">
      <Head>
        <title>AI Pickup Lines</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />

      <main className="wrapper grid flex-1 gap-16 py-8 sm:grid-cols-2">
        <section className="flex h-full w-full items-center rounded-[20px] bg-brand px-8 py-6 text-3xl font-bold text-white shadow-lg shadow-brand">
          {!!pickupLine ? (
            <div className="relative h-full">
              <p>{pickupLine}</p>
              <div className="absolute bottom-0 right-0 space-x-2">
                <FacebookShareButton url={shareUrl} quote={pickupLine}>
                  <FacebookIcon size={32} round />
                </FacebookShareButton>

                <TwitterShareButton url={shareUrl} title={pickupLine}>
                  <TwitterIcon size={32} round />
                </TwitterShareButton>

                <TelegramShareButton url={shareUrl} title={pickupLine}>
                  <TelegramIcon size={32} round />
                </TelegramShareButton>

                <WhatsappShareButton
                  url={shareUrl}
                  title={pickupLine}
                  separator=":: "
                >
                  <WhatsappIcon size={32} round />
                </WhatsappShareButton>

                <RedditShareButton url={shareUrl} title={pickupLine}>
                  <RedditIcon size={32} round />
                </RedditShareButton>
              </div>
            </div>
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
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isLoading}
            >
              Generate
            </button>
          </form>
          <fieldset className="border-t border-black">
            <legend className="mx-auto px-4 text-2xl">OR</legend>
            <button
              onClick={() => generatePickupLine(randomWords(1)[0])}
              className="btn btn-primary mt-4 w-full"
              disabled={isLoading}
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
