"use client";

export default function Nudge() {
  const audio = new Audio("/msn/nudge.mp3");
  const image = new Image();
  image.src = "/msn/nudge.png";
  const msnSound = () => {
    audio.play();
    const nudgeElement = document.getElementById("nudge");
    nudgeElement.innerHTML =
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
      <button
        className="inline cursor-pointer italic underline"
        id="nudge"
        onClick={msnSound}
        type="button"
      >
        nudge
      </button>
    </span>
  );
}
