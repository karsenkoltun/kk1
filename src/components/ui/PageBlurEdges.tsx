"use client";

import GradualBlur from "./GradualBlur";

/**
 * Renders the gradual blur glass effect on the top and bottom edges
 * of every page. Fixed-position, pointer-events: none.
 *
 * Top edge: sits below the navbar, blurs content as it scrolls under.
 * Bottom edge: blurs content as it meets the footer.
 */
export default function PageBlurEdges() {
  return (
    <>
      {/* Top edge — below navbar */}
      <GradualBlur
        target="page"
        position="top"
        height="7rem"
        strength={2}
        divCount={5}
        curve="bezier"
        exponential
        opacity={1}
        zIndex={30}
      />

      {/* Bottom edge — above footer */}
      <GradualBlur
        target="page"
        position="bottom"
        height="7rem"
        strength={2}
        divCount={5}
        curve="bezier"
        exponential
        opacity={1}
        zIndex={30}
      />
    </>
  );
}
