import React from "react";
import clsx from "clsx";

const InstaGrid = ({ items }) => {
  if (items.length === 0) {
    return <div>Meta is being mean</div>;
  }

  return (
    <div
      className={clsx("w-full grid lg:grid-cols-12 gap-x-4 gap-y-8 items-end")}
    >
      {items.map((item) => (
        <div
          className={clsx(
            "flex flex-col justify-end",
            "lg:col-default md:col-default"
          )}
        >
          <img src={item.mediaUrl} />
        </div>
      ))}
    </div>
  );
};

export default InstaGrid;
