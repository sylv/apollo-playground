import React, { useEffect, useState } from "react";
import { ApolloParser } from "@ryanke/apollo/src/classes/apollo-parser";
import { Prism } from "./components/prism";
import { stringifyOutput } from "./helpers/stringify-output.helper";
import { useQueryState } from "./hooks/useQueryState";
import { ApolloOutput } from "@ryanke/apollo/src/types";
import { Input } from "./components/input";
import { GitHub } from "react-feather";

const DEFAULT_VALUE = "BigBuckBunny 2008-2009 SE 1 - 4 Complete webdl 1920x1080/SE1/09 The Ninth Episode.mp4"; // prettier-ignore

export const Home = () => {
  const [value, setValue] = useQueryState<string>("input", DEFAULT_VALUE);
  const [loading, setLoading] = useState(true);
  const [parsed, setParsed] = useState<ApolloOutput | undefined>();
  const [duration, setDuration] = useState(0);

  const parse = async (input: string) => {
    try {
      if (!input) return;
      setValue(input);
      setLoading(true);
      const parser = new ApolloParser({ disableLookup: true, logger: console });
      const start = performance.now();
      const output = await parser.parse(input);
      const end = performance.now() - start;
      setDuration(end);
      setLoading(false);
      setParsed(output);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setValue(DEFAULT_VALUE);
  };

  useEffect(() => {
    if (value) parse(value);
  }, [value]);

  return (
    <div className="container px-4 mx-auto mt-24">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-4xl font-bold">Apollo Playground</h1>
          <p className="text-gray-500">Test how Apollo parses titles</p>
        </div>
        <a
          href="https://github.com/sylv/apollo"
          className="flex items-center text-gray-500 hover:text-white hover:underline"
          target="_blank"
        >
          Source
          <GitHub className="h-6 ml-2" />
        </a>
      </div>
      <section id="playground" className="mb-2">
        <Input value={value} onChange={(event) => setValue(event.target.value)} onReset={reset} />
        <Prism content={stringifyOutput(parsed ?? { message: "No output" })} language="json" />
      </section>
      <footer className="flex justify-between">
        <span className="text-sm text-gray-600">
          Parsed in {duration.toFixed(1)}ms
          <span title="This number may be inaccurate as some browsers prevent accurate performance checks to prevent fingerprinting.">
            {" "}
            (?)
          </span>
        </span>
        <span className="hidden text-sm text-gray-600 md:block">
          Lookups are disabled, preventing resolving an IMDb ID and a more accurate title.
        </span>
      </footer>
    </div>
  );
};
