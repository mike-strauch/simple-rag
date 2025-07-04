import React from "react";

const ActionButton = ({label = "Submit", type ="button", ...rest}: {label: string} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return <button
    type={type}
    className="px-2 py-1 rounded-md border border-purple-200 hover:border-purple-300 hover:bg-gray-100/10 active:scale-x-[95%] active:scale-y-[95%] font-semibold"
    {...rest}
  >
    {label}
  </button>
}

export default ActionButton;