import isObject from "isobject";

function cleanObject(object: Record<string, any>) {
  const clean: Record<string, any> = {};
  for (const key in object) {
    if (Array.isArray(object[key]) && object[key][0] === undefined) continue;
    if (object[key] === null || object[key] === undefined) continue;
    if (isObject(object[key])) clean[key] = cleanObject(object[key]);
    else clean[key] = object[key];
  }

  return clean;
}

// a function that sorts the object keys, with the "title" property first and array values last in the object
function sortObject(object: Record<string, any>) {
  const keys = Object.keys(object).sort((a, b) => {
    if (a === "title") return -1;
    if (a === "type") return -1;
    if (!isObject(object[a]) && isObject(object[b])) return -1;
    if (!Array.isArray(object[a]) && Array.isArray(object[b])) return -1;
    return 0;
  });

  const sortedObject: Record<string, any> = {};
  for (const key of keys) sortedObject[key] = object[key];
  return sortedObject;
}

export function stringifyOutput(output: Record<string, any>) {
  const clean = cleanObject(output);
  const sorted = sortObject(clean);
  return JSON.stringify(sorted, null, 2);
}
