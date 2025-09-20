"use client";

import Hero from "@/components/ui/neural-network-hero";
// Site navigation is rendered globally from layout via <SiteNav />

export default function DemoOne() {
  return (
    <div className="w-screen h-screen flex flex-col relative">
      <Hero 
        title="Human Computer Interaction Lab IIITS"
        description="HCI lab at IIITS is one of the lead labs in India pushing the boundries of Human Computr Interaction and crafting the future"
        badgeText="XR Hackathon"
        badgeLabel="New"
        ctaButtons={[
          { text: "Get started", href: "#get-started", primary: true },
          { text: "View showcase", href: "#showcase" }
        ]}
        microDetails={["Virtual Reality", "Artificial Intelligence", "Brain Computer Interaction"]}
      />
    </div>
  );
}


