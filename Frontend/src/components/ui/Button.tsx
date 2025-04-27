import { ReactElement } from "react";

interface buttonProps {
  variant: "primary" | "secondray";
  size: "sm" | "lg" | "md";
  text: string;
  startIcon?: ReactElement;
  onClick?: () => void;
  loading?: boolean; // corrected spelling
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
      disabled={props.loading} // Actual disable
      className={`${variantstyle[props.variant]} 
        ${sizeStyle[props.size]} 
        ${defaultStyle} 
        cursor-pointer 
        ${props.loading ? "opacity-50" : ""} 
        ${!props.startIcon ? "flex justify-center items-center" : ""}
      `}
    >
      {props.loading ? (
        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
      ) : (
        <>
          {props.startIcon && <div>{props.startIcon}</div>}
          <div>{props.text}</div>
        </>
      )}
    </button>
  );
};
