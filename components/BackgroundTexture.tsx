export default function Texture() {
  return (
    <div>
      <div
        className="absolute inset-0 -z-50"
        style={{
          backdropFilter: "url(#grainy)",
        }}
      />
      <svg className="absolute inset-0" height={0} width={0}>
        <filter id="grainy">
          <feTurbulence baseFrequency="1" seed={2} type="turbulence" />
          <feComponentTransfer in="coloredNoise">
            <feFuncA slope="0.1" type="linear" />
          </feComponentTransfer>
        </filter>
      </svg>
    </div>
  );
}
