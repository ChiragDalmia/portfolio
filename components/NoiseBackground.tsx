import React from "react";

export default function NoiseBackground() {
  return (
    <div className="fixed inse z-50 opacity-70 w-full h-full pointer-events-none">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 700 700"
        aria-hidden="true"
      >
        <defs>
          <filter
            id="nnnoise-filter"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
            filterUnits="objectBoundingBox"
            primitiveUnits="userSpaceOnUse"
            colorInterpolationFilters="linearRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.102"
              numOctaves="4"
              seed="15"
              stitchTiles="stitch"
              x="0%"
              y="0%"
              width="100%"
              height="100%"
              result="turbulence"
            />
            <feSpecularLighting
              surfaceScale="15"
              specularConstant="0.75"
              specularExponent="20"
              lightingColor="#7957A8"
              x="0%"
              y="0%"
              width="100%"
              height="100%"
              in="turbulence"
              result="specularLighting"
            >
              <feDistantLight azimuth="3" elevation="100" />
            </feSpecularLighting>
          </filter>
        </defs>
        <rect width="700" height="700" fill="transparent" />
        <rect
          width="700"
          height="700"
          fill="#7957a8"
          filter="url(#nnnoise-filter)"
        />
      </svg>
    </div>
  );
}
