"use client";

import {
  ArrowRight,
  CheckCircle2,
  CloudUpload,
  Loader2,
  Rocket,
  ServerCrash,
  XCircle,
  Zap,
} from "lucide-react";

import { StatusCheck } from "../../items/status-check/status-check";

export const StatusCheckDefault = () => (
  <StatusCheck
    idle={{
      label: "Start Transaction",
      icon: ArrowRight,
      iconClass: "text-muted-foreground",
      dotColor: "#9ca3af",
    }}
    processing={{
      label: "Processing",
      sublabel: "Verifying payment...",
      icon: Loader2,
      iconClass: "text-blue-400",
      dotColor: "#60a5fa",
      spin: true,
    }}
    completed={{
      label: "Completed",
      sublabel: "Payment successful",
      icon: CheckCircle2,
      iconClass: "text-emerald-400",
      dotColor: "#34d399",
      glowColor: "#34d399",
    }}
    failed={{
      label: "Failed",
      sublabel: "Transaction declined",
      icon: XCircle,
      iconClass: "text-red-400",
      dotColor: "#f87171",
      glowColor: "#f87171",
    }}
  />
);

export const StatusCheckFail = () => (
  <StatusCheck
    simulateFailure
    idle={{
      label: "Start Transaction",
      icon: ArrowRight,
      iconClass: "text-muted-foreground",
      dotColor: "#9ca3af",
    }}
    processing={{
      label: "Processing",
      sublabel: "Verifying payment...",
      icon: Loader2,
      iconClass: "text-blue-400",
      dotColor: "#60a5fa",
      spin: true,
    }}
    completed={{
      label: "Completed",
      sublabel: "Payment successful",
      icon: CheckCircle2,
      iconClass: "text-emerald-400",
      dotColor: "#34d399",
      glowColor: "#34d399",
    }}
    failed={{
      label: "Failed",
      sublabel: "Transaction declined",
      icon: XCircle,
      iconClass: "text-red-400",
      dotColor: "#f87171",
      glowColor: "#f87171",
    }}
  />
);

export const StatusCheckDeploy = () => (
  <StatusCheck
    idle={{
      label: "Deploy to Production",
      icon: Rocket,
      iconClass: "text-muted-foreground",
      dotColor: "#9ca3af",
    }}
    processing={{
      label: "Deploying",
      sublabel: "Building your project...",
      icon: Loader2,
      iconClass: "text-violet-400",
      dotColor: "#a78bfa",
      spin: true,
    }}
    completed={{
      label: "Live",
      sublabel: "Deployment successful",
      icon: CloudUpload,
      iconClass: "text-emerald-400",
      dotColor: "#34d399",
      glowColor: "#34d399",
    }}
    failed={{
      label: "Build Failed",
      sublabel: "Check your logs",
      icon: ServerCrash,
      iconClass: "text-red-400",
      dotColor: "#f87171",
      glowColor: "#f87171",
    }}
    processingDuration={3000}
  />
);

export const StatusCheckCharge = () => (
  <StatusCheck
    idle={{
      label: "Charge Card",
      icon: Zap,
      iconClass: "text-muted-foreground",
      dotColor: "#9ca3af",
    }}
    processing={{
      label: "Charging",
      sublabel: "Contacting bank...",
      icon: Loader2,
      iconClass: "text-amber-400",
      dotColor: "#fbbf24",
      spin: true,
    }}
    completed={{
      label: "Charged",
      sublabel: "$49.00 collected",
      icon: CheckCircle2,
      iconClass: "text-emerald-400",
      dotColor: "#34d399",
      glowColor: "#34d399",
    }}
    failed={{
      label: "Declined",
      sublabel: "Card was declined",
      icon: XCircle,
      iconClass: "text-red-400",
      dotColor: "#f87171",
      glowColor: "#f87171",
    }}
  />
);
