import StickyCards from "./components/cards/StickyCards";
import gsap from 'gsap'
import { ReactLenis } from 'lenis/react'
import { useEffect, useRef } from 'react'


export default function App() {
  const lenisRef = useRef()

  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000)
    }

    gsap.ticker.add(update)

    return () => gsap.ticker.remove(update)
  }, [])


  return (
    <>
      <ReactLenis root options={{ autoRaf: false }} ref={lenisRef} />

      {/* 🧑‍💻 Intro Section */}
      <section className="intro flex flex-col items-center justify-center text-center py-16 space-y-3">
        {/* 👋 Header */}
        <h1 className="text-3xl font-semibold">
          Hey, I’m <span className="italic">Uzair Malik</span>
        </h1>

        {/* 💬 Intro Paragraph */}
        <p className="text-base opacity-80 max-w-lg">
          I’m a passionate developer crafting interactive web experiences with modern tech like <strong>GSAP</strong>, <strong>React</strong>, and <strong>Next.js</strong>.
          Check out my work and connect with me below 👇
        </p>

        {/* 🔗 Links */}
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 mt-4">
          <a
            href="https://uzairmalik.site"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            🌐 Website
          </a>
          <a
            href="https://linkedin.com/in/im-uzairmalik"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            💼 LinkedIn
          </a>
          <a
            href="https://github.com/uzairmalik24"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            💻 GitHub
          </a>
          <a
            href="https://github.com/uzairmalik24/GSAP-Sticky-Cards-n-Scroll"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            📂 Click Here For Code
          </a>
        </div>

        {/* 🎨 Project Subtitle */}
        <h2 className="text-2xl font-medium italic mt-10">
          GSAP Sticky Cards Scroll Animation
        </h2>
      </section>


      {/* 🪄 Sticky Cards Section */}
      <StickyCards />

      {/* 🚀 Outro Section */}
      <section className="outro py-20">

        <h2 className="text-2xl font-medium italic mt-10">
          Thanks for scrolling! Explore more of my projects on <a href="https://uzairmalik.site" target="_blank" rel="noopener noreferrer" className="underline">my website</a>.
        </h2>

      </section>
    </>

  );
}

