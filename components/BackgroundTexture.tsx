export default function Texture() {
  return (
    <svg className="h-full-z-10 absolute inset-0">
      <filter id="grainy">
        <feTurbulence
          type="turbulence"
          seed={20 * Math.random()}
          baseFrequency="1"
        />
        <feComponentTransfer in="coloredNoise">
          <feFuncA type="linear" slope="0.3" />
        </feComponentTransfer>
      </filter>
    </svg>
  );
}
