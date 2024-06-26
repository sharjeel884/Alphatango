'use client';

import { useEffect } from 'react';
import gsap from 'gsap';

export default function Header() {
  const handleLettersAnimation = () => {
    const headerRef = document.querySelector('#header') as HTMLElement;
    const letters = document.querySelectorAll('#letter');
    const deadZone = 50;
    const orderPairs = [
      [4, 5],
      [3, 6],
      [2, 7],
      [1, 8],
      [0, 9],
    ];

    orderPairs.forEach((pair, index) => {
      const { scrollY } = window;
      const letterScrollPoint = deadZone * index;
      const moveFactor = (scrollY - letterScrollPoint) / deadZone;
      const translateY = moveFactor * headerRef.offsetHeight;

      if (scrollY > letterScrollPoint) {
        pair.forEach((i) => {
          const letter = letters[i];
          gsap.to(letter, {
            y: -translateY,
          });
        });
      } else {
        pair.forEach((i) => {
          const letter = letters[i];
          gsap.to(letter, {
            y: 0,
          });
        });
      }
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleLettersAnimation);

    return () => {
      window.removeEventListener('scroll', handleLettersAnimation);
    };
  });

  return (
    <header
      id="header"
      className="pointer-events-none fixed top-0 z-10 mt-12 flex w-full p-4"
    >
      {'Inventorod'.split('').map((l, index) => (
        <span
          key={index}
          id="letter"
          className="flex-1 text-center font-head text-5xl uppercase sm:text-[8rem] md:text-[10rem] lg:text-[20rem]"
        >
          {l}
        </span>
      ))}
    </header>
  );
}
