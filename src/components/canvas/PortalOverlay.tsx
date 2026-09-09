"use client";

import { forwardRef } from "react";

interface PortalOverlayProps {
  text1: string;
  text2: string;
  text3: string;
}

export const PortalOverlay = forwardRef<SVGSVGElement, PortalOverlayProps>(({ text1, text2, text3 }, ref) => {
  return (
    <div className="pointer-events-none fixed inset-0 z-10 h-full w-full">
      <svg ref={ref} width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <mask id="textMask">
            <rect width="100%" height="100%" fill="white" />
            <g transform="translate(0, 0)" className="text-group">
              <text
                x="50%"
                y="35%"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="black"
                fontSize="12vw"
                fontWeight="800"
                letterSpacing="-0.02em"
                className="font-sans"
              >
                {text1}
              </text>
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="black"
                fontSize="12vw"
                fontWeight="800"
                letterSpacing="-0.02em"
                className="font-sans"
              >
                {text2}
              </text>
              <text
                x="50%"
                y="65%"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="black"
                fontSize="12vw"
                fontWeight="800"
                letterSpacing="-0.02em"
                className="font-sans"
              >
                {text3}
              </text>
            </g>
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="#020617" mask="url(#textMask)" />
      </svg>
    </div>
  );
});

PortalOverlay.displayName = "PortalOverlay";
