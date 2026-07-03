'use client';
import { useEffect, useRef } from 'react';

export default function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let particles = [];
    const mouse = { x: null, y: null, radius: 160 };

    const COLORS = [
      'rgba(6,160,69,0.85)',
      'rgba(62,207,110,0.75)',
      'rgba(255,201,60,0.7)',
      'rgba(255,255,255,0.55)',
    ];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    class Particle {
      constructor(x, y, isBurst = false) {
        this.isBurst = isBurst;
        this.x = x ?? Math.random() * canvas.width;
        this.y = y ?? Math.random() * canvas.height;
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];

        if (isBurst) {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 6 + 2;
          this.vx = Math.cos(angle) * speed;
          this.vy = Math.sin(angle) * speed;
          this.size = Math.random() * 3.5 + 1;
          this.opacity = 1;
          this.life = 1;
          this.decay = Math.random() * 0.028 + 0.016;
          this.color = Math.random() > 0.5 ? 'rgba(255,201,60,0.95)' : 'rgba(6,160,69,0.95)';
        } else {
          this.vx = (Math.random() - 0.5) * 0.55;
          this.vy = (Math.random() - 0.5) * 0.55;
          this.size = Math.random() * 1.8 + 0.4;
          this.opacity = Math.random() * 0.55 + 0.15;
          this.life = 1;
          this.decay = 0;
        }
      }

      update() {
        if (mouse.x !== null && !this.isBurst) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius && dist > 0) {
            const force = (mouse.radius - dist) / mouse.radius;
            this.vx += (dx / dist) * force * 0.9;
            this.vy += (dy / dist) * force * 0.9;
          }
        }

        this.vx *= this.isBurst ? 0.94 : 0.98;
        this.vy *= this.isBurst ? 0.94 : 0.98;
        this.x += this.vx;
        this.y += this.vy;

        if (!this.isBurst) {
          if (this.x < -10) this.x = canvas.width + 10;
          if (this.x > canvas.width + 10) this.x = -10;
          if (this.y < -10) this.y = canvas.height + 10;
          if (this.y > canvas.height + 10) this.y = -10;
        }

        if (this.decay > 0) {
          this.life -= this.decay;
        }
      }

      draw() {
        if (this.life <= 0) return;
        const alpha = Math.max(0, this.opacity * this.life);
        ctx.save();
        ctx.globalAlpha = alpha;
        if (this.isBurst) {
          ctx.shadowBlur = 12;
          ctx.shadowColor = this.color;
        } else {
          ctx.shadowBlur = 4;
          ctx.shadowColor = this.color;
        }
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, Math.max(0.1, this.size), 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      isDead() {
        return this.life <= 0;
      }
    }

    const spawnBurst = (x, y, count = 20) => {
      for (let i = 0; i < count; i++) {
        particles.push(new Particle(x, y, true));
      }
    };

    const init = () => {
      const count = Math.min(140, Math.floor((canvas.width * canvas.height) / 6500));
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    };

    const drawConnections = () => {
      const maxDist = 115;
      const nonBurst = particles.filter(p => !p.isBurst && p.life > 0);
      for (let i = 0; i < nonBurst.length; i++) {
        for (let j = i + 1; j < nonBurst.length; j++) {
          const dx = nonBurst[i].x - nonBurst[j].x;
          const dy = nonBurst[i].y - nonBurst[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            ctx.save();
            ctx.globalAlpha = (1 - dist / maxDist) * 0.13;
            ctx.strokeStyle = 'rgba(6,160,69,1)';
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(nonBurst[i].x, nonBurst[i].y);
            ctx.lineTo(nonBurst[j].x, nonBurst[j].y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles = particles.filter(p => !p.isDead());
      particles.forEach(p => { p.update(); p.draw(); });
      drawConnections();
      animId = requestAnimationFrame(animate);
    };

    resize();
    init();
    animate();

    const handleResize = () => {
      resize();
      const existing = particles.filter(p => !p.isBurst);
      const target = Math.min(140, Math.floor((canvas.width * canvas.height) / 6500));
      while (existing.length < target) existing.push(new Particle());
      particles = [...existing, ...particles.filter(p => p.isBurst)];
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => { mouse.x = null; mouse.y = null; };

    const handleClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      spawnBurst(e.clientX - rect.left, e.clientY - rect.top);
    };

    const handleTouchStart = (e) => {
      const rect = canvas.getBoundingClientRect();
      Array.from(e.touches).forEach(t => {
        const x = t.clientX - rect.left;
        const y = t.clientY - rect.top;
        mouse.x = x; mouse.y = y;
        spawnBurst(x, y, 14);
      });
    };

    const handleTouchMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const t = e.touches[0];
      mouse.x = t.clientX - rect.left;
      mouse.y = t.clientY - rect.top;
    };

    const handleTouchEnd = () => { mouse.x = null; mouse.y = null; };

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('click', handleClick);
    canvas.addEventListener('touchstart', handleTouchStart, { passive: true });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: true });
    canvas.addEventListener('touchend', handleTouchEnd);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('click', handleClick);
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="particleCanvas"
      aria-hidden="true"
    />
  );
}
