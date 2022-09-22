import useOnClickOutside from "@utils/use-click-outside";
import { add } from "lodash";
import React, { useEffect, useRef, useState } from "react";
function useOutsideAlerter(ref: any, run: any) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        run();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}
export default function CurrencyInput({
  value,
  onSave,
}: {
  value: number;
  onSave: (e: number) => any;
}) {
  const [state, setState] = useState(
    value.toFixed(2).toString().replace(".", ",")
  );
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const newValue = event.currentTarget.value
      .replace(/[^0-9.,]/g, "")
      .replace(".", ",");
    let v = "";
    let dot = false;
    for (let index = 0; index < newValue.length; index++) {
      const e = newValue[index];
      if (e === ",") {
        if (!dot) {
          v += e;
          dot = true;
        }
      } else {
        v += e;
      }
    }
    setState(v);
  };
  const ref = useRef(null);
  const save = () => {
    if (value.toFixed(2).toString().replace(".", ",") !== state) {
      onSave(parseFloat(state.replace(",", ".")));
      setState(
        parseFloat(state.replace(",", "."))
          .toFixed(2)
          .toString()
          .replace(".", ",")
      );
    }
  };
  useOnClickOutside(ref, () => {
    save();
  });
  return (
    <div className=" mr-2 relative w-full ">
      <input
        ref={ref}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.currentTarget.blur();
            save();
          }
        }}
        onChange={onChange}
        type="text"
        value={state}
        id="price"
        className="order px-2 h-10  focus:boder-red-600  w-16"
        placeholder="0,00"
        aria-describedby="price-currency"
      />
      <div className="absolute inset-y-0 right-0  flex items-center pointer-events-none">
        <span className="text-gray-500 sm:text-sm" id="price-currency">
          €
        </span>
      </div>
    </div>
  );
}
