export default function Texture() {
  return (
    <div>
      <div
        className="absolute inset-0 -z-50"
        style={{
          backdropFilter: "url(#grainy)",
        }}
      ></div>
      <svg width={0} height={0} className="absolute inset-0">
        <filter id="grainy">
          <feTurbulence
            type="turbulence"
            seed={20 * Math.random()}
            baseFrequency="1"
          />
          <feComponentTransfer in="coloredNoise">
            <feFuncA type="linear" slope="0.4" />
          </feComponentTransfer>
        </filter>
      </svg>
    </div>
  );
}
