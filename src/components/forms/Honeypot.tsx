/**
 * Honeypot anti-bot field.
 *
 * Renders a visually-hidden text input that real users will never see or fill
 * in. Bots that auto-fill every field will populate it, allowing the server
 * to silently discard the submission.
 *
 * Usage: Drop <Honeypot value={...} onChange={...} /> inside any <form>.
 * On submit, include `_honey` in the payload sent to /api/lead.
 */

interface HoneypotProps {
  value: string;
  onChange: (val: string) => void;
}

export default function Honeypot({ value, onChange }: HoneypotProps) {
  return (
    <div
      aria-hidden="true"
      tabIndex={-1}
      style={{
        position: "absolute",
        left: "-9999px",
        top: "-9999px",
        height: 0,
        width: 0,
        overflow: "hidden",
        opacity: 0,
      }}
    >
      <label htmlFor="_honey">Leave this empty</label>
      <input
        type="text"
        id="_honey"
        name="_honey"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
      />
    </div>
  );
}
