import { ReactElement } from "react";

interface buttonProps {
  variant: "primary" | "secondray";
  size: "sm" | "lg" | "md";
  text: string;
  startIcon?: ReactElement;
  onClick?: () => void;
  loding?: boolean;
}

const variantstyle = {
  primary: "bg-indigo-700 text-white",
  secondray: "bg-indigo-400 text-indigo-700",
};

const sizeStyle = {
  sm: "w-28 h-8 p-1",
  md: "w-35 h-9 p-1.5",
  lg: "w-full h-10 p-2",
};

const defaultStyle = "rounded-md flex justify-between items-center";

export const Button = (props: buttonProps) => {
  return (
    <button
      onClick={props.onClick}
      className={`${variantstyle[props.variant]} ${
        sizeStyle[props.size]
      } ${defaultStyle} cursor-pointer ${
        props.loding ? " opacity-40 disabled" : ""
      } ${!props.startIcon ? "flex justify-center items-center" : null} `}
    >
      <div>{props.startIcon}</div>
      <div>{props.text}</div>
    </button>
  );
};
