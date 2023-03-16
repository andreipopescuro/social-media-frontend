import { useEffect, useState } from "react";

const useLocalStorage = (key) => {
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(key);
    return JSON.parse(jsonValue);
  });
  // console.log(key, "key");

  // console.log(value, "user value");

  useEffect(() => {
    if (value === undefined) {
      localStorage.removeItem(key);
      return;
    }
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
};

export default useLocalStorage;
