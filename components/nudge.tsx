"use client";
import React from "react";

export default function Nudge() {
  const audio = new Audio("/msn/nudge.mp3");
  const image = new Image();
  image.src = "/msn/nudge.png";
  const msnSound = () => {
    audio.play();
    const nudgeElement = document.getElementById("nudge");
    nudgeElement.innerHTML = nudgeElement.innerHTML =
      '<img style="display: inline; margin-right: 0.6rem; margin-left: 0.6rem;" src="/msn/nudge.png" />';
    setTimeout(() => {
      const imgElement = nudgeElement.querySelector("img");
      imgElement.classList.add("shake-animation");
      imgElement.classList.remove("shake-animation");
      // Reset the element after the animation
      nudgeElement.innerHTML = "nudge";
    }, 500);
  };
  return (
    <span>
      <em
        onClick={msnSound}
        id="nudge"
        className="inline cursor-pointer underline"
      >
        nudge
      </em>
    </span>
  );
}
