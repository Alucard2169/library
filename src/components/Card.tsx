import { lazy, Suspense } from "react";
const LazyImage = lazy(() => import("./LazyImage"));

const Card = () => {
  return (
    <div className="flex flex-col gap-4 w-48 bg-COMPONENT_BG rounded-md  overflow-hidden cursor-pointer">
      <div className="w-48 object-cover">
        <Suspense fallback={<div className="w-full h-full">Loading...</div>}>
          <LazyImage
            data={{
              src: "https://upload.wikimedia.org/wikipedia/en/b/bb/I_Had_That_Same_Dream_Again_cover.jpg?20211229000126",
              alt:"book image",
              className: "w-full h-full",
            }}
          />
        </Suspense>
      </div>
      <div className="flex flex-col gap-1 p-2 ">
        <h1 className="text-white truncate font-semibold">
          I Had That Same Dream Again
        </h1>
        <p className="bg-MAIN_BG p-1 rounded-md text-NAV_BG text-sm font-semibold">
          Written by : <span className="text-white">Yoru Sumino</span>
        </p>
      </div>
    </div>
  );
};

export default Card;
