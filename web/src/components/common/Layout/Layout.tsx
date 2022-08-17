import { ChildrenProps } from "@pages/_app";
import { FC } from "react";

export const Layout: FC<ChildrenProps> = ({ children }) => {
  return <main>{children}</main>;
};
