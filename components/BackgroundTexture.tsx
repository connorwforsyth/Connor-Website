export default function Texture() {
  return (
    <svg className="absolute -z-10">
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
