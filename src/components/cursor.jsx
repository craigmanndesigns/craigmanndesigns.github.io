import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import clsx from "clsx";

const Cursor = ({}) => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };
    window.addEventListener("mousemove", moveCursor);
    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  useEffect(() => {
    const updateProperties = (elem, state) => {
      elem.style.setProperty("--x", `${state.x}px`);
      elem.style.setProperty("--y", `${state.y}px`);
      elem.style.setProperty("--width", `${state.width}px`);
      elem.style.setProperty("--height", `${state.height}px`);
      elem.style.setProperty("--radius", state.radius);
      elem.style.setProperty("--scale", state.scale);
    };

    document.querySelectorAll(".cursor").forEach((cursor) => {
      let onElement;

      const createState = (e) => {
        const defaultState = {
          x: e.clientX,
          y: e.clientY,
          width: 40,
          height: 40,
          radius: "104px",
        };

        const computedState = {};

        if (onElement != null) {
          const { top, left, width, height } =
            onElement.getBoundingClientRect();
          const radius = window.getComputedStyle(onElement).borderTopLeftRadius;

          computedState.x = left + width / 2;
          computedState.y = top + height / 2;
          computedState.width = width;
          computedState.height = height;
          computedState.radius = radius;
        }

        return {
          ...defaultState,
          ...computedState,
        };
      };

      document.addEventListener("mousemove", (e) => {
        const state = createState(e);
        updateProperties(cursor, state);
      });

      document
        .querySelectorAll("a, button, .card, input, textarea")
        .forEach((elem) => {
          elem.addEventListener("mouseenter", () => (onElement = elem));
          elem.addEventListener("mouseleave", () => (onElement = undefined));
        });
    });
  }, []);

  return (
    <div className={clsx("cursor")}>
      <span />
    </div>
  );
};

export default Cursor;
