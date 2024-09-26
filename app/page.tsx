import Link from 'next/link';
import React from 'react'

const page = () => {
  return (
    <div>
      <h1>Hey, I&apos;m Chirag.</h1>
      <ul>
        <li>
          I am a front end developer. I love making{" "}
          <a href="/projects">cool web stuff</a> and yapping about{" "}
          <a href="/yap-corner">the process</a>. Specializing in 3D, clean UI,
          and interactive designs. Share your thoughts{" "}
          <Link href="/guestlog">in my guestlog</Link>.
        </li>
      </ul>

      <p>
        I&apos;m open to new opportunities &ndash; let&apos;s chat on{" "}
        <a href="https://x.com/dotchirag">Twitter</a>.
      </p>

      <h1>Projects</h1>
      <ul>
        <li>
          <a href="https://hackcanada.org/">HackCanada</a> &ndash; My most
          Quirky project yet (front-end lead).
        </li>
        <li>
          <a href="/projects/scanTerra">ScanTerra</a>
        </li>
        <li>
          <a href="https://photosynthai.cloud/">Photosynth</a> &ndash; AI Image
          transformation app.(My Personal quick image editing choice)
        </li>
        <li>
          <a href="/projects/">Old Portfolio</a> &ndash; no one cares but here
          is my old portfolio
        </li>
      </ul>
    </div>
  );
}

export default page