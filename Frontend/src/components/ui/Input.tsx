interface input {
  ref?: any;
  placeholder?: string;
}
export function Input({ ref, placeholder }: input) {
  return (
    <div>
      <input
        type={"text"}
        className="px-4 py-2 bg-slate-100 rounded m-2 w-sm"
        placeholder={placeholder}
        ref={ref}
      ></input>
    </div>
  );
}
