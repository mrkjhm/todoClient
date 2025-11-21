"use client";

import React, { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

const Container = ({ children, className = "" }: ContainerProps) => {
  return (
    <div className={`mx-auto max-w-[1400px] px-4 ${className}`}>{children}</div>
  );
};

export default Container;
