import usePath from "hooks/usePath";
import Link from "next/link";

const Breadcrumbs = () => {
  const path = usePath();
  // const segments = useSelectedLayoutSegments();
  // console.log(segments);

  return (
    <div>
      <h2 className="text-center">
        {path.map(({ name, link }, index) => {
          const isLast = index === path.length - 1;
          return (
            <span key={index}>
              <span className={isLast ? "font-bold" : ""}>
                <Link href={link} legacyBehavior>
                  {name}
                </Link>
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
