"use client";

export function PrintButton() {
  return (
    <button
      aria-label="print"
      id="print"
      className="print-button"
      onClick={() => window.print()}
      onTouchStart={() => window.print()}
    >
      💾
    </button>
  );
}
