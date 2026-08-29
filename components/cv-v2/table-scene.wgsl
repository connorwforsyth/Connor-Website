// Daylight table scene for /cv-v2: a procedural tabletop, slowly drifting
// window light, and soft contact shadows cast by up to two sheets of paper.
// All coordinates are CSS pixels with a top-left origin, matching DOM rects.

struct Params {
  viewport: vec2f,
  time: f32,
  sheet_count: f32,
  rect0: vec4f,   // center.xy, half_size.xy of sheet 0's landing footprint
  rect1: vec4f,
  lifts: vec2f,   // height above the table per sheet, in px; 0 = landed
  pad: vec2f,
}

@group(0) @binding(0) var<uniform> params: Params;

fn hash21(p: vec2f) -> f32 {
  var q = fract(p * vec2f(123.34, 456.21));
  q = q + dot(q, q + 45.32);
  return fract(q.x * q.y);
}

fn vnoise(p: vec2f) -> f32 {
  let i = floor(p);
  let f = fract(p);
  let u = f * f * (3.0 - 2.0 * f);
  let a = hash21(i);
  let b = hash21(i + vec2f(1.0, 0.0));
  let c = hash21(i + vec2f(0.0, 1.0));
  let d = hash21(i + vec2f(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

fn sd_round_box(p: vec2f, half_size: vec2f, radius: f32) -> f32 {
  let q = abs(p) - half_size + vec2f(radius);
  return length(max(q, vec2f(0.0))) + min(max(q.x, q.y), 0.0) - radius;
}

// Soft-edged band, used for the stripes of light from an unseen window.
fn band(x: f32, center: f32, half_width: f32, feather: f32) -> f32 {
  let rising = smoothstep(center - half_width - feather, center - half_width + feather, x);
  let falling = 1.0 - smoothstep(center + half_width - feather, center + half_width + feather, x);
  return rising * falling;
}

// Shadow cast by one sheet. Higher sheets throw wider, softer, weaker
// shadows that slide away from the light; landed sheets keep a tight
// contact shadow hugging the paper's edge.
fn sheet_shadow(px: vec2f, rect: vec4f, lift: f32) -> f32 {
  let light_dir = normalize(vec2f(0.45, 0.68));
  let offset = light_dir * (9.0 + lift * 0.55);
  let spread = 1.0 + lift * 0.0012;
  let d = sd_round_box(px - rect.xy - offset, rect.zw * spread, 8.0);
  let penumbra = 14.0 + lift * 0.9;
  let core = 1.0 - smoothstep(-penumbra * 0.6, penumbra, d);
  let haze = 1.0 - smoothstep(-penumbra, penumbra * 3.4, d);
  let strength = 1.0 / (1.0 + lift * 0.011);
  return clamp(core * 0.62 + haze * 0.38, 0.0, 1.0) * strength;
}

@fragment fn fs_main(@location(0) uv: vec2f) -> @location(0) vec4f {
  let vp = params.viewport;
  let px = uv * vp;

  // Surface: just off pure white, barely dimming away from the light.
  let lit = vec3f(0.972, 0.968, 0.958);
  let shaded = vec3f(0.930, 0.926, 0.916);
  let falloff = clamp(dot(uv, vec2f(0.60, 0.74)) * 0.70, 0.0, 1.0);
  var col = mix(lit, shaded, falloff);

  // The faintest paper-like grain so the white doesn't read as flat pixels.
  let grain = (hash21(px) - 0.5) * 0.008;
  let sheen = (vnoise(vec2f(px.x * 0.003, px.y * 0.004)) - 0.5) * 0.010;
  col = col + vec3f(grain + sheen);

  // Window shadows: soft mullion bars angled with the daylight, swaying
  // very slowly as if a curtain or branch moves outside.
  let ang = -0.42;
  let rot = mat2x2f(cos(ang), -sin(ang), sin(ang), cos(ang));
  let q = rot * (px - vp * vec2f(0.15, 0.0));
  let sway = sin(params.time * 0.09) * 22.0 + sin(params.time * 0.031) * 48.0;
  let span = max(vp.x, vp.y);
  let bar0 = band(q.x + sway, span * 0.24, 16.0, 70.0);
  let bar1 = band(q.x + sway, span * 0.58, 16.0, 70.0);
  let bar2 = band(q.y + sway * 0.4, span * 0.52, 20.0, 110.0);
  let mullion = clamp(bar0 + bar1 + bar2 * 0.6, 0.0, 1.0) * 0.05;
  col = col * (1.0 - mullion);

  // A broad, warm wash where the light lands between the bars.
  let glow = band(q.x + sway, span * 0.41, span * 0.30, 200.0) * 0.024;
  col = col + vec3f(1.00, 0.985, 0.94) * glow;

  // Sheet shadows, slightly cool like open-sky shadow.
  var shadow = 0.0;
  if (params.sheet_count > 0.5) {
    shadow = sheet_shadow(px, params.rect0, params.lifts.x);
  }
  if (params.sheet_count > 1.5) {
    let s1 = sheet_shadow(px, params.rect1, params.lifts.y);
    shadow = 1.0 - (1.0 - shadow) * (1.0 - s1);
  }
  let shadow_tint = vec3f(0.72, 0.73, 0.77);
  col = col * mix(vec3f(1.0), shadow_tint, shadow * 0.42);

  // Gentle vignette keeps the eye on the sheets.
  let vig = 1.0 - 0.05 * smoothstep(0.38, 0.80, distance(uv, vec2f(0.5, 0.44)));
  col = col * vig;

  return vec4f(col, 1.0);
}
