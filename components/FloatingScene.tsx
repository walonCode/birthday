"use client";

import { Float, RoundedBox } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { Group } from "three";

// Page palette (see app/globals.css) so the 3D objects belong to the scene.
const PALETTE = {
  gold: "#d4a24e",
  goldLight: "#f3d9a4",
  rose: "#e8788a",
  roseDeep: "#b83b5e",
  cream: "#fdf6ec",
  plumLight: "#2e1b38",
};

/** A wrapped present: rounded body, crossed ribbon, and a two-loop bow. */
function Gift({ color, ribbon }: { color: string; ribbon: string }) {
  return (
    <group>
      <RoundedBox args={[1, 1, 1]} radius={0.09} smoothness={4}>
        <meshStandardMaterial color={color} roughness={0.45} metalness={0.15} />
      </RoundedBox>
      {/* Ribbon crossing both faces */}
      <mesh>
        <boxGeometry args={[0.2, 1.04, 1.04]} />
        <meshStandardMaterial color={ribbon} roughness={0.3} metalness={0.35} />
      </mesh>
      <mesh>
        <boxGeometry args={[1.04, 1.04, 0.2]} />
        <meshStandardMaterial color={ribbon} roughness={0.3} metalness={0.35} />
      </mesh>
      {/* Bow: two little loops on top */}
      {[-0.13, 0.13].map((x) => (
        <mesh key={x} position={[x, 0.58, 0]}>
          <sphereGeometry args={[0.17, 16, 16]} />
          <meshStandardMaterial
            color={ribbon}
            roughness={0.3}
            metalness={0.35}
          />
        </mesh>
      ))}
    </group>
  );
}

/** A glossy balloon: stretched sphere, a knot, and a faint string. */
function Balloon({ color }: { color: string }) {
  return (
    <group>
      <mesh scale={[1, 1.25, 1]}>
        <sphereGeometry args={[0.55, 24, 24]} />
        <meshStandardMaterial color={color} roughness={0.2} metalness={0.1} />
      </mesh>
      <mesh position={[0, -0.72, 0]}>
        <coneGeometry args={[0.12, 0.2, 12]} />
        <meshStandardMaterial color={color} roughness={0.25} />
      </mesh>
      <mesh position={[0, -1.4, 0]}>
        <cylinderGeometry args={[0.008, 0.008, 1.15, 6]} />
        <meshStandardMaterial
          color={PALETTE.cream}
          transparent
          opacity={0.35}
        />
      </mesh>
    </group>
  );
}

/** Wraps children in a slow, continuous spin (skipped when paused/reduced). */
function Spin({
  speed,
  children,
}: {
  speed: number;
  children: React.ReactNode;
}) {
  const ref = useRef<Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * speed;
  });
  return <group ref={ref}>{children}</group>;
}

type Item = {
  kind: "gift" | "balloon";
  position: [number, number, number];
  scale: number;
  color: string;
  ribbon?: string;
  spin: number;
  float: number;
};

// Spread across the viewport at varied depths. Ordered roughly front-to-back so
// the slice for smaller screens keeps a balanced, not-lopsided, subset.
const ITEMS: Item[] = [
  {
    kind: "balloon",
    position: [-3.6, 1.6, -1],
    scale: 1.1,
    color: PALETTE.rose,
    spin: 0.12,
    float: 1.1,
  },
  {
    kind: "gift",
    position: [3.5, -1.4, -0.5],
    scale: 1,
    color: PALETTE.plumLight,
    ribbon: PALETTE.gold,
    spin: 0.2,
    float: 0.9,
  },
  {
    kind: "gift",
    position: [-3.1, -1.9, 0.4],
    scale: 0.85,
    color: PALETTE.roseDeep,
    ribbon: PALETTE.goldLight,
    spin: -0.18,
    float: 1,
  },
  {
    kind: "balloon",
    position: [3.9, 1.9, -1.6],
    scale: 1.25,
    color: PALETTE.gold,
    spin: 0.1,
    float: 1.2,
  },
  {
    kind: "balloon",
    position: [0.2, 2.6, -2.4],
    scale: 0.9,
    color: PALETTE.goldLight,
    spin: 0.14,
    float: 1.3,
  },
  {
    kind: "gift",
    position: [0.6, -2.6, -2],
    scale: 0.9,
    color: PALETTE.gold,
    ribbon: PALETTE.rose,
    spin: 0.16,
    float: 0.8,
  },
];

// On tall, narrow screens the horizontal frustum is far smaller, so the wide
// desktop layout falls off both edges. These placements hug the center to stay
// in frame (and still read as gifts + balloons drifting behind the content).
const MOBILE_ITEMS: Item[] = [
  {
    kind: "balloon",
    position: [-1.5, 2.3, -0.5],
    scale: 1,
    color: PALETTE.rose,
    spin: 0.12,
    float: 1.1,
  },
  {
    kind: "gift",
    position: [1.5, -2.1, -0.5],
    scale: 0.85,
    color: PALETTE.plumLight,
    ribbon: PALETTE.gold,
    spin: 0.2,
    float: 0.9,
  },
  {
    kind: "balloon",
    position: [1.4, 2.7, -1.2],
    scale: 0.9,
    color: PALETTE.gold,
    spin: 0.1,
    float: 1.2,
  },
  {
    kind: "gift",
    position: [-1.5, -2.7, -1],
    scale: 0.8,
    color: PALETTE.roseDeep,
    ribbon: PALETTE.goldLight,
    spin: -0.16,
    float: 1,
  },
];

/** Eases the whole constellation toward the cursor for a parallax tilt. */
function ParallaxGroup({
  animate,
  children,
}: {
  animate: boolean;
  children: React.ReactNode;
}) {
  const ref = useRef<Group>(null);
  useFrame((state) => {
    if (!ref.current || !animate) return;
    const { x, y } = state.pointer; // normalized -1..1
    ref.current.rotation.y += (x * 0.18 - ref.current.rotation.y) * 0.05;
    ref.current.rotation.x += (-y * 0.12 - ref.current.rotation.x) * 0.05;
  });
  return <group ref={ref}>{children}</group>;
}

function Scene({ items, animate }: { items: Item[]; animate: boolean }) {
  return (
    <>
      <ambientLight intensity={0.65} />
      <directionalLight position={[4, 6, 5]} intensity={1.3} />
      {/* Warm candlelight fill from below-left */}
      <pointLight position={[-5, -3, 2]} intensity={18} color={PALETTE.gold} />

      <ParallaxGroup animate={animate}>
        {items.map((item, i) => {
          const body =
            item.kind === "gift" ? (
              <Gift color={item.color} ribbon={item.ribbon ?? PALETTE.gold} />
            ) : (
              <Balloon color={item.color} />
            );
          return (
            <Float
              key={`${item.kind}-${i}`}
              position={item.position}
              speed={animate ? 1.4 : 0}
              rotationIntensity={animate ? 0.5 : 0}
              floatIntensity={animate ? item.float : 0}
            >
              <group scale={item.scale}>
                {animate ? <Spin speed={item.spin}>{body}</Spin> : body}
              </group>
            </Float>
          );
        })}
      </ParallaxGroup>
    </>
  );
}

/**
 * Full-page ambient WebGL layer: gifts and balloons drifting behind the
 * content. Fixed, non-interactive, and rendered only on the client (mounted via
 * a dynamic `ssr:false` import) so it never blocks first paint. Honors
 * reduced-motion by rendering a single still frame.
 */
export default function FloatingScene() {
  const reduced = useReducedMotion();
  // Track viewport width so the scene adapts to resize / orientation changes.
  const [isNarrow, setIsNarrow] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 768 : false,
  );
  useEffect(() => {
    const onResize = () => setIsNarrow(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Phones use center-hugging placements (see MOBILE_ITEMS) so nothing drifts
  // off the narrow horizontal frustum.
  const items = isNarrow ? MOBILE_ITEMS : ITEMS;
  const animate = !reduced;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 opacity-60"
    >
      <Canvas
        camera={{ position: [0, 0, 9], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
        // "demand" only advances on invalidation, so reduced-motion users get a
        // single static frame instead of a running render loop.
        frameloop={animate ? "always" : "demand"}
      >
        <Scene items={items} animate={animate} />
      </Canvas>
    </div>
  );
}
