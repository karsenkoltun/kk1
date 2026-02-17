export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-6">
        {/* Pulsing ring spinner */}
        <div className="relative h-12 w-12">
          <div
            className="absolute inset-0 rounded-full border-2 border-accent/20"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-accent"
            style={{
              animation: "kk-spin 1s cubic-bezier(0.55, 0.15, 0.45, 0.85) infinite",
            }}
            aria-hidden="true"
          />
          <div
            className="absolute inset-2 rounded-full border-2 border-transparent border-t-accent/50"
            style={{
              animation:
                "kk-spin 1.4s cubic-bezier(0.55, 0.15, 0.45, 0.85) infinite reverse",
            }}
            aria-hidden="true"
          />
        </div>

        {/* Subtle pulsing text */}
        <p
          className="text-sm tracking-widest text-text-muted uppercase"
          style={{
            animation: "kk-pulse 2s ease-in-out infinite",
          }}
        >
          Loading
        </p>
      </div>

      {/* Keyframes via inline style tag (server component compatible) */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes kk-spin {
              to { transform: rotate(360deg); }
            }
            @keyframes kk-pulse {
              0%, 100% { opacity: 0.4; }
              50% { opacity: 1; }
            }
          `,
        }}
      />
    </div>
  );
}
