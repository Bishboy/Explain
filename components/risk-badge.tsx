"use client";

import { Badge } from "@/components/ui/badge";
import type { RiskLevel } from "@/store/api/explainApi";

interface RiskBadgeProps {
  level: RiskLevel;
  className?: string;
}

const variantMap = {
  Low: "safe" as const,
  Medium: "caution" as const,
  High: "danger" as const,
};

export function RiskBadge({ level, className }: RiskBadgeProps) {
  return (
    <Badge variant={variantMap[level]} className={className}>
      {level}
    </Badge>
  );
}
