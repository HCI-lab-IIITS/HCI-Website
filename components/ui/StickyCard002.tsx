'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

interface CardData {
  id: number | string;
  image: string;
  title: string;
  category: string;
  description: string;
  link?: string;
}

interface StickyCard002Props {
  cards: CardData[];
  className?: string;
  containerClassName?: string;
}

export default function StickyCard002({ cards, className }: StickyCard002Props) {
  const container = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const cardElements = cardRefs.current;
      const totalCards = cardElements.length;

      if (!cardElements[0]) return;

      gsap.set(cardElements[0], { y: '0%', scale: 1, rotation: 0 });

      for (let i = 1; i < totalCards; i++) {
        if (!cardElements[i]) continue;
        gsap.set(cardElements[i], { y: '100%', scale: 1, rotation: 0 });
      }

      const scrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: 'top top',
          end: `+=${window.innerHeight * (totalCards - 1)}`,
          pin: true,
          scrub: 0.5,
          pinSpacing: true,
        },
      });

      for (let i = 0; i < totalCards - 1; i++) {
        const currentCard = cardElements[i];
        const nextCard = cardElements[i + 1];
        const position = i;
        if (!currentCard || !nextCard) continue;

        scrollTimeline.to(
          currentCard,
          {
            scale: 0.85,
            rotation: 2,
            opacity: 0.6,
            duration: 1,
            ease: 'none',
          },
          position
        );

        scrollTimeline.to(
          nextCard,
          {
            y: '0%',
            duration: 1,
            ease: 'none',
          },
          position
        );
      }

      return () => {
        scrollTimeline.kill();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    { scope: container }
  );

  return (
    <div className={`relative w-full ${className || ''}`} ref={container}>
      <div className="sticky-cards relative flex h-screen w-full items-center justify-center overflow-hidden px-4 py-8 md:px-12">
        <div className="relative h-[85vh] w-full max-w-4xl overflow-hidden rounded-3xl">
          {cards.map((card, i) => (
            <div
              key={card.id}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="absolute inset-0 h-full w-full rounded-3xl overflow-hidden bg-slate-900/90 border border-white/15 backdrop-blur-2xl shadow-2xl flex flex-col md:flex-row"
            >
              {/* Image Block */}
              <div className="w-full md:w-1/2 h-64 md:h-full relative overflow-hidden bg-slate-950">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-md text-[10px] font-mono uppercase tracking-wider bg-black/80 backdrop-blur-md border border-white/20 text-[#c5a880]">
                  {card.category}
                </div>
              </div>

              {/* Text Block */}
              <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-between">
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#38bdf8] font-mono block mb-2">
                    FEATURED RESEARCH PROJECT {i + 1} OF {cards.length}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-light text-white mb-4 leading-tight">
                    {card.title}
                  </h3>
                  <p className="text-sm text-slate-300 font-light leading-relaxed mb-6">
                    {card.description}
                  </p>
                </div>

                <Link
                  href={card.link || '/projects'}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#c5a880] text-black font-semibold text-xs uppercase tracking-wider hover:bg-white transition-colors w-fit shadow-lg shadow-[#c5a880]/15"
                >
                  <span>Explore Project Specs</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
