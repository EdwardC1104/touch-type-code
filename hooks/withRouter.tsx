"use client";
import { useRouter } from "next/navigation";

export const withRouter = (Component: any) => {
  // eslint-disable-next-line react/display-name
  return (props: any) => {
    const router = useRouter();

    return <Component router={router} {...props} />;
  };
};
