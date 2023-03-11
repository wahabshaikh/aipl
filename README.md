# AI Pickup Lines

## Setup Instructions

- Clone the repository
- `cd` into it
- Install the dependencies using `pnpm i`
- Start the server using `pnpm run dev`

## How does it work?

- You are presented with a random pickup line from our AI-generated pickup lines collection (`/data/pickup-lines.ts`) on first visit. You can then generate a pickup line for a specific keyword or get another random pickup line from our collection.
  ![App](/public/README/app-state-1.png)
- A modal pops up after the 2nd usage, and every 5 subsequent usages thereafter. Note that **usage** means either generating the pickup line using the _Generate_ button or getting a random pickup line using the _Surprise me!_ button. The modal contains a form that asks for the user's name and email. Once you submit the form, the data is saved in our Airtable Base and an email is sent via Airtable Automation.
  ![App](/public/README/app-state-2.png)
- The modal screen is changed to the following on submission of the form. You can use this screen to place your internal advertisements.
  ![App](/public/README/app-state-3.png)

**NOTE:** In order to save OpenAI credits, the pickup line generation flow is a two-step process. On clicking _Generate_ button, first a lookup for the keyword is made on our collection. If a match is found, we send back that result. If a match is not found, only then a call is made to OpenAI's Text Completion API.

## Components you can update for personalization

- Banner (`/components/Banner.tsx`)

  ![Banner](/public/README/banner.png)

- CTA (`/components/Nav.tsx`)

  ![CTA](/public/README/cta.png)

- Modal (`/components/Modal.tsx`)

  ![Modal Form](/public/README/modal-state-1.png)

  ![Modal Ad](/public/README/modal-state-2.png)

- Footer (`/components/Footer.tsx`)

  ![Footer](/public/README/footer.png)

## Extras

I created a mini application [Flirt like SRK](https://www.aipickuplines.com/flirt-like-srk) that generates replies based out of Shah Rukh Khan's dialogues. You can check out the code for the API at `/pages/api/generate-like-srk.ts` and the UI at `/pages/flirt-like-srk.tsx`.

One thing to note is the API for this uses the **Edge Runtime** as compared to the default **Node.js Runtime**.

You can read more about it in this [blog post](https://wahabshaikh.hashnode.dev/moving-to-the-edge-using-nextjs-api-routes).
