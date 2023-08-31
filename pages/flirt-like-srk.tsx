import type { NextPage } from "next";
import { FormEventHandler, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Seo from "../components/Seo";
import axios from "axios";
import { supabase } from "../lib/supabase";
import Modal from "../components/Modal";
import Toolbar from "../components/Toolbar";
import Image from "next/image";

const FlirtLikeSRK: NextPage = () => {
  const [message, setMessage] = useState("");
  const [pickupLine, setPickupLine] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    getRandomPickupLine();
  }, []);

  const getRandomPickupLine = async () => {
    const { data } = await axios.get("/api/surprise-me-like-srk");
    const pickupLine = data.result as string;
    setPickupLine(pickupLine);
  };

  const generatePickupLine = async (message: string) => {
    setPickupLine("");
    setIsLoading(true);

    try {
      const { data } = await toast.promise(
        axios.post("/api/generate-like-srk", { message }),
        {
          loading: "SRK is typing...",
          success: "SRK's reply is ready for you!",
          error:
            "Uh oh! Experiencing heavy traffic... please try again in a minute. You can use 'Surprise Me' in the interim.",
        }
      );

      const result = data.result as string;

      if (!result) toast.error("");

      setPickupLine(result);

      // const { error } = await supabase
      //   .from("pickup_lines_srk")
      //   .insert({ message, result });

      // if (error) throw error;
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setCount(count + 1);
    }
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    await generatePickupLine(message);
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Seo title="Flirt like SRK | AI Pickup Lines" />

      <Nav />

      <main className="wrapper grid h-full w-full flex-1 gap-16 py-8 lg:grid-cols-2">
        <Image
          src="/images/srk.png"
          alt="Shah Rukh Khan"
          height={240}
          width={240}
          className="mx-auto -mb-4 block lg:hidden"
        />

        <section className="flex h-full w-full items-center justify-center rounded-[20px] bg-brand px-8 py-6 text-white shadow-lg shadow-brand/50">
          <div className="flex h-full w-full flex-col justify-between">
            <p className="my-auto text-2xl font-bold">{pickupLine}</p>

            <div className="mt-8 flex items-center justify-between">
              <Toolbar pickupLine={pickupLine} />
            </div>
          </div>
        </section>

        <section className="flex flex-col justify-center gap-4">
          <Image
            src="/images/srk.png"
            alt="Shah Rukh Khan"
            height={360}
            width={360}
            className="mx-auto hidden lg:block"
          />

          <form className="space-y-2" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="message" className="sr-only">
                Message
              </label>
              <input
                type="text"
                name="message"
                id="message"
                className="block w-full rounded-2xl border-2 border-black/5 bg-black/5 p-4 focus:border-brand focus:ring-brand"
                placeholder="Enter a message (e.g. I love you, Let's go on a date?, etc.)"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
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
              onClick={async () => {
                setMessage("");
                setIsLoading(true);
                try {
                  await getRandomPickupLine();
                } catch (error) {
                  console.error(error);
                } finally {
                  setIsLoading(false);
                  setCount(count + 1);
                }
              }}
              className="btn btn-primary mt-4 w-full"
              disabled={isLoading}
            >
              Surprise me!
            </button>
          </fieldset>
        </section>
      </main>
      <Modal count={count} />

      <Footer />
    </div>
  );
};

export default FlirtLikeSRK;
