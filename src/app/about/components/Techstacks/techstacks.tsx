"use client";
import { Image, Link } from "@nextui-org/react";
import React from "react";
import { motion } from "framer-motion";

const TechStacks = () => {
  return (
    <div className="flex flex-col gap-6 my-6 items-center">
      <div className="flex gap-4">
        <motion.div
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col p-2 rounded-md border-1 w-fit"
        >
          <Image
            alt="Next.JS"
            className="object-cover rounded-xl p-2"
            src="/nextjs-logo.png"
            width={150}
          />
          <Link isExternal href="https://nextjs.org/" showAnchorIcon>
            Next.js
          </Link>
          <p>Framework used.</p>
        </motion.div>

        <motion.div
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col p-2 rounded-md border-1 w-fit"
        >
          <Image
            alt="Typescript"
            className="object-cover rounded-xl p-2"
            src="/Typescript.png"
            width={150}
          />
          <Link isExternal href="https://nextjs.org/" showAnchorIcon>
            Typescript
          </Link>
          <p>For type safety.</p>
        </motion.div>
      </div>

      <h2 className="font-semibold">Libraries:</h2>
      <div className="flex gap-4">
        <motion.div
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col p-2 rounded-md border-1 w-fit"
        >
          <Image
            alt="NextUI"
            className="object-cover rounded-xl p-2"
            src="/nextui-logo.png"
            width={150}
          />
          <Link isExternal href="https://nextui.org/" showAnchorIcon>
            NextUI
          </Link>
          <p>As an UI library.</p>
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col p-2 rounded-md border-1 w-fit"
        >
          <Image
            alt="Framer Motion"
            className="object-cover rounded-xl p-4"
            src="/framer-motion.svg"
            width={150}
          />
          <Link isExternal href="https://www.framer.com/motion/" showAnchorIcon>
            Framer Motion
          </Link>
          <p>For Animations.</p>
        </motion.div>

        <motion.div
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col p-2 rounded-md border-1 w-fit"
        >
          <Image
            alt="Reack Hook Form"
            className="object-cover p-2 rounded-3xl"
            src="/reacthookform.png"
            width={150}
          />
          <Link isExternal href="https://react-hook-form.com/" showAnchorIcon>
            React Hook Form
          </Link>
          <p>For Forms.</p>
        </motion.div>
      </div>

      <h2 className="font-semibold text-center">Additionaly:</h2>
      <p>
        <a
          href="https://github.com/ankeetmaini/react-infinite-scroll-component"
          target="_blank"
          className="text-blue-600"
        >
          react infinite scroll component{" "}
        </a>
        and
        <a
          href="https://react-icons.github.io/react-icons/"
          target="_blank"
          className="text-blue-600"
        >
          {" "}
          react icons.
        </a>
      </p>
    </div>
  );
};

export default TechStacks;
