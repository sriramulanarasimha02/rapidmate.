import { useEffect, useRef } from 'react';

export type VehicleType = 'moto' | 'cargo' | 'van';

interface TrailPoint {
  x: number;
  y: number;
  age: number;
}

interface CourierUnit {
  id: number;
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  x: number;
  y: number;
  angle: number;
  progress: number;
  duration: number;
  vehicle: VehicleType;
  trail: TrailPoint[];
  arrived: boolean;
}

interface ImpactPing {
  x: number;
  y: number;
  age: number;
  maxAge: number;
  label: string;
  vehicle: VehicleType;
}

interface TapDispatchCanvasProps {
  dispatchLabel: string;
  activeVehicle: VehicleType;
  enabled?: boolean;
}

export function TapDispatchCanvas({
  dispatchLabel,
  activeVehicle,
  enabled = true,
}: TapDispatchCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const labelRef = useRef(dispatchLabel);
  const vehicleRef = useRef(activeVehicle);

  useEffect(() => {
    labelRef.current = dispatchLabel;
  }, [dispatchLabel]);

  useEffect(() => {
    vehicleRef.current = activeVehicle;
  }, [activeVehicle]);

  useEffect(() => {
    if (!enabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    const couriers: CourierUnit[] = [];
    const pings: ImpactPing[] = [];
    let nextId = 1;
    let lastTime = performance.now();
    let rafId = 0;

    const pickSpawnEdge = (tx: number, ty: number) => {
      const distBottom = height - ty;
      const distLeft = tx;
      const distRight = width - tx;
      const distTop = ty;
      const minDist = Math.min(distBottom, distLeft, distRight, distTop);

      if (distBottom <= minDist * 1.15) {
        return {
          sx: Math.max(40, Math.min(width - 40, tx + (Math.random() - 0.5) * 220)),
          sy: height + 36,
        };
      }
      if (minDist === distLeft) {
        return {
          sx: -36,
          sy: Math.max(40, Math.min(height - 40, ty + (Math.random() - 0.5) * 160)),
        };
      }
      if (minDist === distRight) {
        return {
          sx: width + 36,
          sy: Math.max(40, Math.min(height - 40, ty + (Math.random() - 0.5) * 160)),
        };
      }
      return {
        sx: Math.max(40, Math.min(width - 40, tx + (Math.random() - 0.5) * 200)),
        sy: -36,
      };
    };

    const spawnCourier = (targetX: number, targetY: number, overrideVehicle?: VehicleType) => {
      const vehicle =
        overrideVehicle ??
        (Math.random() > 0.35 ? vehicleRef.current : Math.random() > 0.5 ? 'moto' : 'van');

      if (reducedMotion) {
        pings.push({
          x: targetX,
          y: targetY,
          age: 0,
          maxAge: 950,
          label: labelRef.current,
          vehicle,
        });
        return;
      }

      const { sx, sy } = pickSpawnEdge(targetX, targetY);
      const dx = targetX - sx;
      const dy = targetY - sy;
      const distance = Math.hypot(dx, dy);
      const duration = Math.max(360, Math.min(720, distance * 0.65));

      couriers.push({
        id: nextId++,
        startX: sx,
        startY: sy,
        targetX,
        targetY,
        x: sx,
        y: sy,
        angle: Math.atan2(dy, dx),
        progress: 0,
        duration,
        vehicle,
        trail: [],
        arrived: false,
      });
    };

    let pointerDownPos: { x: number; y: number } | null = null;

    const handlePointerDown = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest('[data-no-dispatch="true"]')) {
        pointerDownPos = null;
        return;
      }
      pointerDownPos = { x: e.clientX, y: e.clientY };
    };

    const handlePointerUp = (e: PointerEvent) => {
      if (!pointerDownPos) return;
      const moved = Math.hypot(e.clientX - pointerDownPos.x, e.clientY - pointerDownPos.y);
      pointerDownPos = null;
      if (moved > 14) return;
      spawnCourier(e.clientX, e.clientY);
    };

    const handleCustomDispatch = (e: Event) => {
      const detail = (e as CustomEvent<{ x: number; y: number; vehicle?: VehicleType }>).detail;
      if (!detail) return;
      spawnCourier(detail.x, detail.y, detail.vehicle);
    };

    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('pointerup', handlePointerUp, { passive: true });
    window.addEventListener('rapidmate:dispatch', handleCustomDispatch);

    const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

    const drawVehicle = (c: CourierUnit) => {
      ctx.save();
      ctx.translate(c.x, c.y);
      ctx.rotate(c.angle);

      const accent = c.vehicle === 'van' ? '#FFD000' : '#FF1493';

      // Headlight beam in warm gold / magenta
      const beam = ctx.createLinearGradient(8, 0, 58, 0);
      beam.addColorStop(
        0,
        c.vehicle === 'van' ? 'rgba(255, 208, 0, 0.42)' : 'rgba(255, 20, 147, 0.38)',
      );
      beam.addColorStop(1, 'rgba(255, 20, 147, 0)');
      ctx.fillStyle = beam;
      ctx.beginPath();
      ctx.moveTo(8, -3);
      ctx.lineTo(56, -15);
      ctx.lineTo(56, 15);
      ctx.lineTo(8, 3);
      ctx.closePath();
      ctx.fill();

      if (c.vehicle === 'van') {
        ctx.fillStyle = '#111111';
        ctx.strokeStyle = '#FFD000';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(-17, -8.5, 34, 17, 4.5);
        ctx.fill();
        ctx.stroke();

        // Magenta windshield accent
        ctx.fillStyle = '#FF1493';
        ctx.beginPath();
        ctx.roundRect(7, -6, 6, 12, 1.5);
        ctx.fill();

        // Gold roof badge
        ctx.fillStyle = '#FFD000';
        ctx.fillRect(-10, -2, 12, 4);
      } else {
        // Scooter / Cargo silhouette
        ctx.fillStyle = '#111111';
        ctx.strokeStyle = accent;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(-14, -6, 28, 12, 5.5);
        ctx.fill();
        ctx.stroke();

        // Hot Magenta delivery box
        ctx.fillStyle = '#E91E63';
        ctx.beginPath();
        ctx.roundRect(-11, -4.5, 10, 9, 2.2);
        ctx.fill();

        // Yellow visor dot
        ctx.fillStyle = '#FFD000';
        ctx.beginPath();
        ctx.arc(10, 0, 2.4, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    };

    const tick = (now: number) => {
      const dt = Math.min(48, now - lastTime);
      lastTime = now;

      ctx.clearRect(0, 0, width, height);

      for (let i = couriers.length - 1; i >= 0; i--) {
        const c = couriers[i];
        c.progress = Math.min(1, c.progress + dt / c.duration);
        const eased = easeOutExpo(c.progress);

        const prevX = c.x;
        const prevY = c.y;
        c.x = c.startX + (c.targetX - c.startX) * eased;
        c.y = c.startY + (c.targetY - c.startY) * eased;

        if (Math.hypot(c.x - prevX, c.y - prevY) > 0.5) {
          c.angle = Math.atan2(c.y - prevY, c.x - prevX);
        }

        c.trail.push({ x: c.x, y: c.y, age: 0 });
        for (let t = c.trail.length - 1; t >= 0; t--) {
          c.trail[t].age += dt;
          if (c.trail[t].age > 360) {
            c.trail.splice(t, 1);
          }
        }

        // Glowing Hot Magenta + Gold dual-layer motion trail
        if (c.trail.length > 1) {
          for (let t = 1; t < c.trail.length; t++) {
            const p0 = c.trail[t - 1];
            const p1 = c.trail[t];
            const alpha = Math.max(0, 1 - p1.age / 360);

            ctx.strokeStyle = `rgba(255, 20, 147, ${alpha * 0.85})`;
            ctx.lineWidth = Math.max(2, 5.5 * alpha);
            ctx.lineCap = 'round';
            ctx.beginPath();
            ctx.moveTo(p0.x, p0.y);
            ctx.lineTo(p1.x, p1.y);
            ctx.stroke();

            ctx.strokeStyle = `rgba(255, 208, 0, ${alpha * 0.65})`;
            ctx.lineWidth = Math.max(1, 2.2 * alpha);
            ctx.beginPath();
            ctx.moveTo(p0.x, p0.y);
            ctx.lineTo(p1.x, p1.y);
            ctx.stroke();
          }
        }

        drawVehicle(c);

        if (c.progress >= 1 && !c.arrived) {
          c.arrived = true;
          pings.push({
            x: c.targetX,
            y: c.targetY,
            age: 0,
            maxAge: 1150,
            label: labelRef.current,
            vehicle: c.vehicle,
          });
          couriers.splice(i, 1);
        }
      }

      // Impact Pulse Rings & High-Contrast Ping Label
      for (let i = pings.length - 1; i >= 0; i--) {
        const p = pings[i];
        p.age += dt;
        const t = p.age / p.maxAge;
        if (t >= 1) {
          pings.splice(i, 1);
          continue;
        }

        const fade = 1 - t;
        const r1 = 8 + t * 44;
        const r2 = 4 + Math.max(0, t - 0.12) * 58;

        ctx.save();
        ctx.strokeStyle = `rgba(233, 30, 99, ${fade * 0.95})`;
        ctx.lineWidth = 2.4;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r1, 0, Math.PI * 2);
        ctx.stroke();

        if (t > 0.12) {
          ctx.strokeStyle = `rgba(255, 193, 7, ${fade * 0.8})`;
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.arc(p.x, p.y, r2, 0, Math.PI * 2);
          ctx.stroke();
        }

        ctx.fillStyle = `rgba(255, 20, 147, ${fade})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4 * fade + 1.5, 0, Math.PI * 2);
        ctx.fill();

        const labelY = p.y - 20 - t * 14;
        const clampedX = Math.max(88, Math.min(width - 88, p.x));
        const clampedY = Math.max(30, labelY);

        ctx.font = '600 11px "JetBrains Mono", monospace';
        const textWidth = ctx.measureText(p.label).width;
        const boxW = textWidth + 20;
        const boxH = 24;

        ctx.fillStyle = `rgba(17, 17, 17, ${fade * 0.96})`;
        ctx.strokeStyle = `rgba(255, 20, 147, ${fade * 0.9})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.roundRect(clampedX - boxW / 2, clampedY - boxH / 2, boxW, boxH, 7);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = `rgba(255, 255, 255, ${fade})`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(p.label, clampedX, clampedY + 0.5);

        ctx.restore();
      }

      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('rapidmate:dispatch', handleCustomDispatch);
    };
  }, [enabled]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-40"
    />
  );
}
