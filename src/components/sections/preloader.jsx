import React, { useState } from "react";
import clsx from "clsx";

const Preloader = ({ blok }) => {
  return (
    <div className={clsx("fixed w-screen h-screen bg-white z-[999]")}>
      <div className={clsx("flex w-full h-full items-center justify-center")}>
        <div
          className={clsx(
            "flex flex-col items-center justify-center text-center"
          )}
        >
          <div
            className={clsx(
              "w-8 h-8 relative",
              "border border-black",
              "overflow-hidden",
              "animate-spin"
            )}
          >
            <span className={clsx("block h-full bg-black animate-load")}></span>
          </div>
          <h4>It's definitely loading...</h4>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
