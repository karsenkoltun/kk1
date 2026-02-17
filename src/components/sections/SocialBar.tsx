"use client";

import { useState } from "react";
import { Instagram, Youtube, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";
import AnimateIn from "@/components/ui/AnimateIn";

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.8a8.18 8.18 0 0 0 4.76 1.52V6.87a4.84 4.84 0 0 1-1-.18Z" />
  </svg>
);

const socials = [
  {
    icon: Instagram,
    label: "Instagram",
    count: "12K",
    href: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "#",
    hoverColor: "hover:bg-gradient-to-br hover:from-[#833AB4] hover:via-[#FD1D1D] hover:to-[#F77737]",
    hoverTextColor: "group-hover:text-white",
    hoverBg: "instagram",
  },
  {
    icon: Youtube,
    label: "YouTube",
    count: "5K",
    href: process.env.NEXT_PUBLIC_YOUTUBE_URL || "#",
    hoverColor: "",
    hoverTextColor: "group-hover:text-[#FF0000]",
    hoverBg: "youtube",
  },
  {
    icon: TikTokIcon,
    label: "TikTok",
    count: "25K",
    href: process.env.NEXT_PUBLIC_TIKTOK_URL || "#",
    hoverColor: "",
    hoverTextColor: "group-hover:text-[#00F2EA]",
    hoverBg: "tiktok",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    count: "3K",
    href: process.env.NEXT_PUBLIC_LINKEDIN_URL || "#",
    hoverColor: "",
    hoverTextColor: "group-hover:text-[#0A66C2]",
    hoverBg: "linkedin",
  },
];

const platformColors: Record<string, string> = {
  instagram: "linear-gradient(135deg, #833AB4, #FD1D1D, #F77737)",
  youtube: "#FF0000",
  tiktok: "#00F2EA",
  linkedin: "#0A66C2",
};

export default function SocialBar() {
  const [hoveredPlatform, setHoveredPlatform] = useState<string | null>(null);

  return (
    <section className="border-y border-border bg-background py-14">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <AnimateIn>
          {/* "Follow Along" header text */}
          <p className="mb-8 text-center text-xs font-medium tracking-[0.4em] text-accent uppercase">
            Follow Along
          </p>

          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 transition-all duration-300"
                onMouseEnter={() => setHoveredPlatform(social.hoverBg)}
                onMouseLeave={() => setHoveredPlatform(null)}
              >
                {/* Icon with scale-up hover and platform color */}
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full border border-border transition-all duration-300",
                    "group-hover:scale-110 group-hover:border-transparent"
                  )}
                  style={
                    hoveredPlatform === social.hoverBg
                      ? {
                          background:
                            social.hoverBg === "instagram"
                              ? platformColors.instagram
                              : platformColors[social.hoverBg],
                        }
                      : undefined
                  }
                >
                  <social.icon
                    className={cn(
                      "h-4.5 w-4.5 text-text-muted transition-colors duration-300",
                      hoveredPlatform === social.hoverBg && "text-white"
                    )}
                  />
                </div>
                <div>
                  <p
                    className={cn(
                      "text-sm font-semibold text-text-primary transition-colors duration-300",
                      social.hoverTextColor
                    )}
                  >
                    {social.count}
                  </p>
                  <p className="text-[10px] tracking-[0.15em] text-text-muted uppercase">
                    {social.label}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
