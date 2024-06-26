'use client';

import gsap from 'gsap';
import { useEffect } from 'react';

export default function Navbar() {
  
  const handleLettersAnimation1 = () => {
    const headerRef = document.querySelector('#nav') as HTMLElement;
    const letters = document.querySelectorAll('#letterNav');
    const deadZone = 40;
    const orderPairs = [
      [4, 5],
      [3, 6],
      [2, 7],
      [1, 8],
      [0, 9],
    ];
    var scrollOffset;
    orderPairs.forEach((pair, index) => {
    scrollOffset = 130;

      const { scrollY } = window;
      const adjustedScrollY = scrollY - scrollOffset;
      const letterScrollPoint = deadZone * index;
      const moveFactor = (adjustedScrollY - letterScrollPoint) / deadZone;
      const translateY = moveFactor * headerRef.offsetHeight;
      if (adjustedScrollY > letterScrollPoint) {
        pair.forEach((i) => {
          const letter = letters[i];
          gsap.to(letter, {
            y: -20,
            opacity:1,
          });
        });
      } else {
        pair.forEach((i) => {
          const letter = letters[i];
          gsap.to(letter, {
            y: 30,
            opacity:0,
          });
        });
      }
    });
  };


  useEffect(() => {
    const handleScroll = () => {
      if ( window.scrollY > 200) {
        handleLettersAnimation1();
      }
      handleLettersAnimation1();
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      id="nav"
      className="fixed top-0 z-20 flex w-full origin-center items-center justify-center py-4 "
    >
      
      {'Inventorod'.split('').map((l, index) => (
        <span
          key={index}
          id="letterNav"
          style={{opacity:0}}
          className=" text-center font-head uppercase sm:text-[8rem] md:text-[10rem] lg:text-[3rem]"
        >
          {l}
        </span>
      ))}
    </nav>
  );
}
