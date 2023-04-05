"use client";

import usePathSegments from "hooks/usePathSegments";
import Link from "next/link";

const Breadcrumbs = () => {
  const path = usePathSegments();

  return (
    <div>
      <h2 className="text-center">
        {path.map(({ name, link }, index) => {
          const isLast = index === path.length - 1;
          return (
            <span key={index}>
              <span className={isLast ? "font-bold" : ""}>
                <Link href={link}>{name}</Link>
              </span>
              {isLast ? "" : " / "}
            </span>
          );
        })}
      </h2>
    </div>
  );
};

export default Breadcrumbs;
