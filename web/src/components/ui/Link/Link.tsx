import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { ChildrenProps } from "@pages/_app";

const Link: React.FC<NextLinkProps & ChildrenProps> = ({
  href,
  children,
  ...props
}) => {
  return (
    <NextLink href={href}>
      <a {...props}>{children}</a>
    </NextLink>
  );
};

export default Link;
