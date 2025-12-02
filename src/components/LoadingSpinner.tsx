import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center py-5">
      <div className="animate-spin w-5 h-5 rounded-full border-2 border-blue border-t-transparent"></div>
    </div>
  );
};

export default LoadingSpinner;
