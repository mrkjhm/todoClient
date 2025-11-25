import React from "react";

interface CircleCheckboxProps {
  checked: boolean;
  onToggle: () => void;
}

const CircleCheckbox: React.FC<CircleCheckboxProps> = ({
  checked,
  onToggle,
}) => {
  return (
    <div
      onClick={onToggle}
      className={`w-4 h-4 cursor-pointer rounded-full border-2 flex items-center justify-center transition
        ${checked ? "border-[#b9ffb3]" : "border-gray-400"}`}
    >
      {checked && (
        <div className="w-2.5 h-2.5 rounded-full bg-[#b9ffb3] transition"></div>
      )}
    </div>
  );
};

export default CircleCheckbox;
