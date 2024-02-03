import React from "react";

const AboutBox = ({ about }: { about: string }) => {
  const aboutArr = about.split(".").slice(0, -1);

  return (
    <div className="mt-5">
      <h2 className="mb-2 text-lg font-semibold text-white">About this item</h2>
      <ul className="flex list-outside list-disc flex-col gap-1 pl-3 text-sm text-gray-300">
        {aboutArr.map((text, i) => (
          <li className="rounded-md px-2 py-2 even:bg-gray-900" key={i}>
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AboutBox;
