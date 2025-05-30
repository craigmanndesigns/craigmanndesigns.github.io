import React, { useState, MouseEvent, TouchEvent, useCallback, useEffect } from "react";
import { storyblokEditable, StoryblokComponent } from "gatsby-source-storyblok";
import clsx from "clsx";
import { RandomReveal } from "react-random-reveal";

interface HeroProps extends StoryblokComponent {
  blok: {
    _uid: string;
    alternate?: boolean;
    prefix?: string;
    suffix?: string;
    [key: string]: any; // Allows for other properties in the blok
  };
  sectionTheme?: "light" | "dark";
}

function throttle<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  return (...args: Parameters<T>) => {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return func(...args);
  };
}

const Hero: React.FC<HeroProps> = ({ blok, sectionTheme }) => {

  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [perspective, setPerspective] = useState({ x: 0, y: 0 });
  const [isHover, setIsHover] = useState(false);
  const [shadowStyle, setShadowStyle] = useState({ textShadow: 'calc(-0.02em*(1 + 0}))) calc(.02em*(1 + 0)) 0 var(--accent-color)' });


  const onMouseMove = useCallback(
    throttle((e: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>) => {

      const card = e.currentTarget;
      const box = card.getBoundingClientRect();
      const x = e.clientX - box.left;
      const y = e.clientY - box.top;
      const centerX = box.width / 4;
      const centerY = box.height / 4;
      const rotateX = (y - centerY) / 100;
      const rotateY = (centerX - x) / 100;
      const perspectiveX = (y - centerY) / 200;
      const perspectiveY = (centerX - x) / 200;

      setRotate({ x: rotateX, y: rotateY });
      setPerspective({ x: perspectiveX, y: perspectiveY });
      setIsHover(true);
    }, 100),
    []
  );

  const onMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setPerspective({ x: 0, y: 0 });
    setIsHover(false);
  };

  useEffect(() => {
    setShadowStyle({
      '--perspective-x': `${perspective.x}`,
      '--perspective-y': `${perspective.y}`,
      textShadow: `calc(-0.02em*(1 + var(--perspective-y))) calc(.02em*(1 + var(--perspective-x))) 0 var(--accent-color)`
    });
  }, [perspective]);

  return (
    <div
      {...storyblokEditable(blok)}
      key={blok._uid}
      className={
        clsx(
          "max-sm:h-[75vh] h-hero uppercase border w-full max-w-default",
          "max-sm:max-w-full",
          "p-10 max-sm:p-4 overflow-hidden",
          sectionTheme === "light" ? "border-black" : "border-white"
        )}
    >
      <div className={clsx('flex flex-col text-center justify-center items-center w-full h-full')}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1, 1, 1)`,
          transition: "all 400ms cubic-bezier(0.03, 0.98, 0.52, 0.99) 0s",
        }}
      >
        <div>
          <h3>Craig Mann</h3>
          <h1 style={shadowStyle}>{blok.h1}</h1>
          <h1 style={shadowStyle}>
            <RandomReveal
              isPlaying={true}
              duration={Infinity}
              revealDuration={2}
              updateInterval={2.5}
              characters={" "}
              characterSet={
                [
                  "Developer",
                  "Designer",
                  "Manager",
                  "Systems",
                ]}
            />
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Hero;