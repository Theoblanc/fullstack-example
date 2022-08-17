import React, { FC } from "react";

interface ContainerProps {
  className?: string;
  children?: any;
  el?: HTMLElement;
}

const Container: FC<ContainerProps> = ({ children, className, el = "div" }) => {
  let Component: React.ComponentType<React.HTMLAttributes<HTMLDivElement>> =
    el as any;

  return <Component className={className}>{children}</Component>;
};

export default Container;
