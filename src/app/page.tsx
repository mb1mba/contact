"use client";

import Image from 'next/image';
import { useState, ReactNode, useCallback, memo } from 'react';

export default function Home() {
  const [hovered, setHovered] = useState<HoveredItem>(HoveredItem.None);

  const handleHover = useCallback((item: HoveredItem) => {
    setHovered(item);
  }, []);
  
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="relative shadow-custom px-10 lg:px-16 py-24 rounded-xl">
        <p className="relative flex text-3xl font-bold" id="email">
          <span className="relative flex">
            <HoverableSpan hoverType={HoveredItem.Email} hovered={hovered}>
              <HoverableSpan hoverType={HoveredItem.Name} hovered={hovered}>
                theo
              </HoverableSpan>
              @
              <HoverableSpan hoverType={HoveredItem.Github} hovered={hovered}>
                mb1mba
              </HoverableSpan>
              .com
            </HoverableSpan>
          </span>
        </p>
        <ul className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          <HoverableIcon src="/user.png" alt="User icon" hoverType={HoveredItem.Name} handleHover={handleHover} />
          <HoverableIcon src="/email.png" alt="Email icon" hoverType={HoveredItem.Email} handleHover={handleHover} />
          <HoverableIcon src="/github.png" alt="Github icon" hoverType={HoveredItem.Github} handleHover={handleHover} />
        </ul>
      </div>
    </div>
  );
}

enum HoveredItem {
  Name = "name",
  Email = "email",
  Github = "github",
  None = ""
}

interface HoverableSpanProps {
  hoverType: HoveredItem;
  hovered: HoveredItem;
  children: ReactNode;
}

const HoverableSpan: React.FC<HoverableSpanProps> = memo(({ hoverType, hovered, children }) => {
  const isHovered = hovered === hoverType;
  const shouldFade = hovered === HoveredItem.Github || hovered === HoveredItem.Name;

  return (
    <span 
    content-value={hoverType}
    className={`relative ${isHovered ? 'before:opacity-100 before:-bottom-1 text-black' : 'before:opacity-0 before:bottom-2'} before:content-[attr(content-value)] before:pt-2 before:font-normal before:text-xs before:text-center before:absolute before:h-2 before:w-full before:border-b-2 before:border-l-2 before:border-r-2 before:border-dashed before:transition-all before:duration-200 before:ease-out`}>
      <span className={`${isHovered ? "text-violet-600 transition-colors ease-out duration-300" : shouldFade ? "text-gray-300 transition-colors ease-out duration-300" : "transition-colors ease-out duration-200"}`}>
        {children}
      </span>
    </span>
  );
});

HoverableSpan.displayName = 'HoverableSpan';

interface HoverableIconProps {
  src: string;
  alt: string;
  hoverType: HoveredItem;
  handleHover: (hover: HoveredItem) => void;
}


const HoverableIcon: React.FC<HoverableIconProps> = memo(({ src, alt, hoverType, handleHover }) => {
  return (
    <li
      onMouseEnter={() => handleHover(hoverType)}
      onMouseLeave={() => handleHover(HoveredItem.None)}
      className="cursor-pointer hover:-translate-y-2 transition-transform duration-150 ease-linear"
    >
      <Image
        src={src}
        width={25}
        height={25}
        alt={alt}
      />
    </li>
  );
});

HoverableIcon.displayName = 'HoverableIcon';
