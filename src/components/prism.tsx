import Highlight, { defaultProps, Language, PrismTheme } from "prism-react-renderer";
import React, { FC } from "react";
import classNames from "classnames";

const theme: PrismTheme = {
  plain: {
    backgroundColor: "black",
    color: "white",
  },
  styles: [
    {
      types: ["comment", "prolog", "doctype", "cdata", "punctuation"],
      style: {
        color: "#6c6783",
      },
    },
    {
      types: ["namespace"],
      style: {
        opacity: 0.7,
      },
    },
    {
      types: ["tag", "operator", "number"],
      style: {
        color: "#ff0080",
      },
    },
    {
      types: ["tag-id", "selector", "atrule-id"],
      style: {
        color: "#eeebff",
      },
    },
    {
      types: ["attr-name"],
      style: {
        color: "#c4b9fe",
      },
    },
    {
      types: [
        "boolean",
        "entity",
        "url",
        "attr-value",
        "keyword",
        "control",
        "directive",
        "unit",
        "statement",
        "regex",
        "at-rule",
        "placeholder",
        "variable",
        "property",
      ],
      style: {
        color: "rgb(236, 165, 231)",
      },
    },
    {
      types: ["deleted"],
      style: {
        textDecorationLine: "line-through",
      },
    },
    {
      types: ["inserted"],
      style: {
        textDecorationLine: "underline",
      },
    },
    {
      types: ["italic"],
      style: {
        fontStyle: "italic",
      },
    },
    {
      types: ["important", "bold"],
      style: {
        fontWeight: "bold",
      },
    },
    {
      types: ["important"],
      style: {
        color: "#c4b9fe",
      },
    },
  ],
};

export const Prism: FC<{
  content: string;
  language: Language;
  className?: string;
}> = (props) => (
  <Highlight {...defaultProps} theme={theme} code={props.content} language={props.language}>
    {({ className, style, tokens, getLineProps, getTokenProps }) => (
      <pre className={classNames(className, "text-left overflow-x-auto h-full rounded")} style={style}>
        {tokens.map((line, i) => {
          const props = getLineProps({ line, key: i });
          return (
            <div {...props} className={classNames(props.className, "table-row")} key={i}>
              <span className="table-cell px-2 text-sm text-gray-800 select-none">{i + 1}</span>
              <span className="table-cell">
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </span>
            </div>
          );
        })}
      </pre>
    )}
  </Highlight>
);
