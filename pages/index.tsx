import type { NextPage } from "next";
import { FormEventHandler, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Seo from "../components/Seo";
import { TbThumbDown, TbThumbUp } from "react-icons/tb";
import axios from "axios";
import { supabase } from "../lib/supabase";
import Modal from "../components/Modal";
import ProductHuntBadges from "../components/ProductHuntBadges";
import Banner from "../components/Banner";
import Toolbar from "../components/Toolbar";

const Home: NextPage = () => {
  const [recordId, setRecordId] = useState<number>();
  const [keyword, setKeyword] = useState("");
  const [pickupLine, setPickupLine] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    getRandomPickupLine();
  }, []);

  const getRandomPickupLine = async () => {
    const { data } = await axios.get("/api/surprise-me");
    const pickupLine = data.result as string;
    setPickupLine(pickupLine);
  };

  const generatePickupLine = async (keyword: string) => {
    setIsLoading(true);

    try {
      const { data } = await toast.promise(
        axios.post("/api/generate", { keyword }),
        {
          loading: "Generating a pickup line for you...",
          success: "Your pickup line is ready. It's easy to be cheesy now!",
          error:
            "We're witnessing heavy traffic, please try again in a minute. You can try 'Surprise Me!' in the interim.",
        }
      );

      const result = data.result as string;

      if (!result)
        toast.error(
          "We're witnessing heavy traffic, please try again in a minute. You can try 'Surprise Me!' in the interim."
        );

      // const { data: record, error } = await supabase
      //   .from("pickup_lines")
      //   .insert({ keyword, result })
      //   .select()
      //   .single();

      // if (error) throw error;

      // setRecordId(record?.id);
      setPickupLine(result);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setCount(count + 1);
    }
  };

  const submitFeedback = async (feedback: "liked" | "disliked") => {
    setIsLoading(true);

    try {
      const { data, error } = await supabase
        .from("pickup_lines")
        .upsert({ id: recordId, result: pickupLine, feedback })
        .select()
        .single();

      setRecordId(data?.id);

      if (error) throw error;
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
    <div className="flex min-h-screen w-full flex-col">
      <Seo />

      <Banner />

      <Nav />

      <main className="wrapper grid h-full w-full flex-1 gap-16 py-8 lg:grid-cols-2">
        <section className="flex h-full w-full items-center justify-center rounded-[20px] bg-brand px-8 py-6 text-white shadow-lg shadow-brand/50">
          <div className="flex h-full w-full flex-col justify-between">
            <p className="my-auto text-2xl font-bold">{pickupLine}</p>

            <div className="mt-8 flex items-center justify-between">
              <div className="space-x-2">
                <button
                  data-tip="Like"
                  onClick={async () =>
                    await toast.promise(submitFeedback("liked"), {
                      loading: `Submitting feedback...`,
                      success: `Thanks for the feedback... we're glad you liked the pickup line!`,
                      error: `Oops... something went wrong!`,
                    })
                  }
                >
                  <TbThumbUp className="h-6 w-6" />
                </button>
                <button
                  data-tip="Dislike"
                  onClick={async () =>
                    await toast.promise(submitFeedback("disliked"), {
                      loading: `Submitting feedback...`,
                      success: `Thanks for the feedback... we're sorry you didn't like the pickup line!`,
                      error: `Oops... something went wrong!`,
                    })
                  }
                >
                  <TbThumbDown className="h-6 w-6" />
                </button>
              </div>

              <Toolbar pickupLine={pickupLine} />
            </div>
          </div>
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
              onClick={async () => {
                setKeyword("");
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
          <ProductHuntBadges />
        </section>
      </main>
      <Modal count={count} />

      <Footer />
    </div>
  );
};

export default Home;
