import skLogo from "@/assets/SK-LOGO.jpeg";

export function Logo({ size = 44, withText = true }: { size?: number; withText?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      {/* Logo image in a circular frame */}
      <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
        <div className="absolute inset-0 rounded-full bg-gradient-gold opacity-25 blur-md animate-glow-pulse" />
        <div className="absolute inset-0 rounded-full border border-gold animate-spin-slow" style={{ borderStyle: "dashed" }} />
        <img
          src={skLogo}
          alt="SK Events Logo"
          className="absolute inset-[4px] rounded-full object-cover"
          style={{ width: size - 8, height: size - 8 }}
        />
      </div>

      {/* Text */}
      {withText && (
        <div className="leading-tight">
          <div className="font-display text-lg tracking-[0.2em] text-white font-bold" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}>
            SK EVENTS
          </div>
          <div className="text-[10px] tracking-[0.3em] text-white/85 font-semibold" style={{ textShadow: "0 1px 6px rgba(0,0,0,0.8)" }}>
            &amp; MANAGEMENT
          </div>
        </div>
      )}
    </div>
  );
}
