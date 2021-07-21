import React, { FC, InputHTMLAttributes } from "react";
import { RefreshCcw } from "react-feather";

export const Input: FC<InputHTMLAttributes<HTMLInputElement> & { onReset?: () => void }> = ({
  spellCheck,
  ...rest
}) => {
  return (
    <div className="relative mb-2 overflow-hidden rounded">
      <input
        className="w-full p-2 font-mono text-pink-200 placeholder-pink-200 transition duration-100 bg-pink-700 outline-none focus:bg-pink-600 focus:text-white hover:bg-pink-600 hover:text-white"
        spellCheck={false}
        placeholder="Enter a title to parse"
        type="text"
        {...rest}
      />
      <span
        className="absolute top-0 bottom-0 right-0 z-10 flex items-center px-2 text-pink-400 transition cursor-pointer hover:text-white"
        onClick={rest.onReset}
      >
        <RefreshCcw />
      </span>
    </div>
  );
};
