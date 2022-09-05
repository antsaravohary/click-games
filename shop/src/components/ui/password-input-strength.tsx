import React, { InputHTMLAttributes, useEffect, useState } from "react";
import cn from "classnames";
import Link from "@components/ui/link";
import { Eye } from "@components/icons/eye-icon";
import { EyeOff } from "@components/icons/eye-off-icon";
import { useTranslation } from "next-i18next";
const strength=[
  {text:"",color:"",progress:"0%"},
  {text:"Très simple",color:"#ff7700",progress:"25%"},
  {text:"Simple",color:"#ffff00",progress:"50%"},
  {text:"C'est OK",color:"#aeff00",progress:"75%"},
  {text:"Excellent",color:"#00ff00",progress:"100%"},
]
export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  inputClassName?: string;
  label: string;
  name: string;
  forgotPageLink?: string;
  password?: string;
  shadow?: boolean;
  variant?: "normal" | "solid" | "outline";
  error: string | undefined;
  forgotPageRouteOnClick?: () => void;
}

const variantClasses = {
  normal:
    "bg-gray-100 border border-border-base focus:shadow focus:bg-light focus:border-accent",
  solid:
    "bg-gray-100 border border-border-100 focus:bg-light focus:border-accent",
  outline: "border border-border-base focus:border-accent",
};

const PasswordInputStrength = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      className,
      inputClassName,
      label,
      password,
      name,
      error,
      children,
      variant = "normal",
      shadow = false,
      type = "text",
      forgotPageLink = "",
      forgotPageRouteOnClick,
      ...rest
    },
    ref
  ) => {
    const { t } = useTranslation();
    const [show, setShow] = useState(false);
    function getScore() {
      let pswMinLength = 8
      let score = 0

      let regexLower = new RegExp('(?=.*[a-z])')
      let regexUpper = new RegExp('(?=.*[A-Z])')
      let regexDigits = new RegExp('(?=.*[0-9])')
      // For length score print user selection or default value
      let regexLength = new RegExp('(?=.{' + pswMinLength + ',})')

      if (password.match(regexLower)) { ++score }
      if (password.match(regexUpper)) { ++score }
      if (password.match(regexDigits)) { ++score }
      if (password.match(regexLength)) { ++score }

      if (score === 0 && password.length > 0) { ++score }

      return score

    }
    useEffect(() => {
      console.log("ref", getScore());
    }, [password])

    return (
      <div className={className}>
        <div className="flex items-center justify-between mb-2">
          <label htmlFor={name} className="font-semibold text-sm text-body">
            {label}
          </label>

          {forgotPageLink && (
            <Link
              href={forgotPageLink}
              className="text-xs text-accent transition-colors duration-200 focus:outline-none focus:text-accent-700 focus:font-semibold hover:text-accent-hover"
            >
              {t("common:text-forgot-password")}
            </Link>
          )}
          {forgotPageRouteOnClick && (
            <button
              onClick={forgotPageRouteOnClick}
              type="button"
              className="text-xs text-accent transition-colors duration-200 focus:outline-none focus:text-accent-700 focus:font-semibold hover:text-accent-hover"
            >
              {t("common:text-forgot-password")}
            </button>
          )}
        </div>
        <div className="relative">
          <input
            id={name}

            name={name}
            type={show ? "text" : "password"}
            ref={ref}
            className={cn(
              "py-3 ps-4 pe-11 w-full rounded appearance-none transition duration-300 ease-in-out text-heading text-sm focus:outline-none focus:ring-0",
              shadow && "focus:shadow",
              variantClasses[variant],
              inputClassName
            )}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            {...rest}
          />
          <label
            htmlFor={name}
            className="absolute end-4 top-5 -mt-2 text-body cursor-pointer"
            onClick={() => setShow((prev) => !prev)}
          >
            {show ? (
              <EyeOff className="w-6 h-6" />
            ) : (
              <Eye className="w-6 h-6" />
            )}
          </label>
        </div>
        <div className="w-full mt-1 bg-gray-200 rounded-full h-1.5 mb-4 dark:bg-gray-700">
          <div className="bg-blue-600 h-1.5 rounded-full dark:bg-blue-500" style={{ width: strength[getScore()].progress, backgroundColor:strength[getScore()].color}}></div>
          <p className="my-2 text-xs">{strength[getScore()].text}</p>
        </div>
        {error && <p className="my-2 text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

export default PasswordInputStrength;
