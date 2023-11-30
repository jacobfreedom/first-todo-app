import Nav from "@/components/NavigationBar";
import React from "react";
import TechStacks from "./components/Techstacks/techstacks";

const AboutPage: React.FC = () => {
  return (
    <main className="flex flex-col my-0 w-full">
      <Nav />

      <div className="flex flex-col w-full md:w-[90%] lg:w-[80%] xl:w-[70%] 2xl:w-[60%] mx-auto px-1 md:px-4 items-center">
        <h1 className="mt-6 font-semibold text-center">
          This project was built by
          <a
            href="https://www.linkedin.com/in/jsvob/"
            target="_blank"
            className="text-blue-600"
          >
            {" "}
            Jakub{" "}
          </a>
          and is driven by 👇
        </h1>

        <TechStacks />
      </div>
    </main>
  );
};

export default AboutPage;
