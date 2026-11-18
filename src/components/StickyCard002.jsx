import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState, useEffect } from "react";

// Minimal cn utility (classnames merger) — no external dependency
function cn(...classes) {
  return classes.filter(Boolean).join(" ")
}

const CardData = ({ cards, className, containerClassName, imageClassName }) => {
  const container = useRef(null);
  const imageRefs = useRef([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const imageElements = imageRefs.current;
      const totalCards = imageElements.length;

      if (!imageElements[0]) return;

      gsap.set(imageElements[0], { y: "0%", scale: 1, rotation: 0, autoAlpha: 1 });

      for (let i = 1; i < totalCards; i++) {
        if (!imageElements[i]) continue;
        gsap.set(imageElements[i], { y: isMobile ? 0 : "100%", scale: 1, rotation: 0, autoAlpha: 1 });
      }

      if (!isMobile) {
        const scrollTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: container.current,
            start: "top top",
            end: `+=${window.innerHeight * (totalCards - 1)}`,
            pin: true,
            scrub: true,
            pinSpacing: true,
          },
        });

        for (let i = 0; i < totalCards - 1; i++) {
          const currentImage = imageElements[i];
          const nextImage = imageElements[i + 1];
          const position = i;
          if (!currentImage || !nextImage) continue;

          scrollTimeline.to(
            currentImage,
            {
              scale: 0.7,
              rotation: 5,
              duration: 1,
              ease: "none",
            },
            position,
          );

          scrollTimeline.to(
            nextImage,
            {
              y: "0%",
              duration: 1,
              ease: "none",
            },
            position,
          );
        }
      }

      const resizeObserver = new ResizeObserver(() => {
        ScrollTrigger.refresh();
      });

      if (container.current) {
        resizeObserver.observe(container.current);
      }

      return () => {
        resizeObserver.disconnect();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    { scope: container },
  );

  return (
    <div
      className={cn(isMobile ? "relative w-full" : "sticky-cards relative h-screen w-full", className)}
      ref={container}
    >
      <div className={cn(isMobile ? "relative w-full py-8" : "relative flex h-full w-full items-center justify-center overflow-hidden p-3 lg:p-8")}>
        <div
          className={cn(
            isMobile ? "relative w-full" : "relative h-[90%] w-full max-w-sm overflow-hidden rounded-lg sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl",
            containerClassName,
          )}
        >
          {cards.map((card, i) => (
            <img
              key={card.id}
              src={card.image}
              alt={card.alt || ""}
              className={cn(
                isMobile
                  ? "rounded-4xl w-full h-auto block mb-6 object-cover"
                  : "rounded-4xl absolute h-full w-full object-cover",
                imageClassName,
              )}
              ref={(el) => {
                imageRefs.current[i] = el;
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const StickyCard002 = CardData;

export { StickyCard002 };
export default StickyCard002;
