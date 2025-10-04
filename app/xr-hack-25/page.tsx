'use client';

export default function XRHack25Page() {
  return (
    <div className="w-screen min-h-screen flex flex-col relative bg-black">
      {/* Header */}
      <div className="pt-24 pb-12 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extralight text-white/100 tracking-tight mb-4">
            XR Hack &apos;25
          </h1>
          <p className="text-lg text-white/70 font-light max-w-2xl">
            Experience the future of extended reality through our premier hackathon event
          </p>
        </div>
      </div>

      {/* Content Section */}
      <section className="relative pb-24 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-16">
            <h2 className="text-2xl md:text-3xl font-light text-white mb-6">
              Coming Soon
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Get ready for an immersive XR hackathon experience. Registration details and event information will be available soon.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
