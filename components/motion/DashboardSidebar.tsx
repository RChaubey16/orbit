"use client";

import { useState } from "react";
import {
  BarChart3,
  Bell,
  ChevronRight,
  Home,
  LayoutDashboard,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
  Users,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "Home", active: false },
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: BarChart3, label: "Analytics", active: false },
  { icon: Users, label: "Team", active: false },
  { icon: Bell, label: "Notifications", active: false },
  { icon: Settings, label: "Settings", active: false },
];

export default function DashboardSidebar() {
  const [isOpen, setIsOpen] = useState(true);

  // Motion variants
  // Animations render in top-down manner, so when sidebar is "open", use "open" key in you child-variants to apply different animations and similarly use "closed" key for closed state
  const sidebarVariant = {
    open: { width: "15rem" },
    closed: { width: "0rem" },
  };

  const parentVariant = {
    open: {
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.2,
      },
    },
    closed: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: -1,
      },
    },
  };

  const childVariant = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: -10 },
  };

  return (
    <motion.div
      initial={false}
      animate={isOpen ? "open" : "closed"}
      className="relative flex h-[560px] overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-2xl backdrop-blur-md"
    >
      {/* Sidebar — always mounted so width can animate */}
      <motion.aside
        variants={sidebarVariant}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="relative flex h-full flex-col overflow-hidden border-r border-white/10"
      >
        {/* Header */}
        <div className="flex min-w-[240px] items-center justify-between px-4 py-5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500/20">
              <div className="h-3 w-3 rounded-sm bg-cyan-400" />
            </div>
            <motion.span
              variants={childVariant}
              transition={{ duration: 0.2 }}
              className="text-sm font-semibold tracking-tight text-white"
            >
              Orbit UI
            </motion.span>
          </div>
          <motion.button
            variants={childVariant}
            transition={{ duration: 0.3 }}
            onClick={() => setIsOpen(false)}
            className="flex h-7 w-7 items-center justify-center rounded-md text-white/40 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Close sidebar"
          >
            <PanelLeftClose size={15} />
          </motion.button>
        </div>

        {/* Nav */}
        <motion.nav
          variants={parentVariant}
          className="flex min-w-[240px] flex-1 flex-col gap-0.5 px-3"
        >
          {navItems.map(({ icon: Icon, label, active }) => (
            <motion.button
              variants={childVariant}
              transition={{ duration: 0.3 }}
              key={label}
              className={cn(
                "group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-cyan-500/15 text-cyan-400"
                  : "text-white/50 hover:bg-white/8 hover:text-white",
              )}
            >
              <Icon size={16} className="shrink-0" />
              <span>{label}</span>
              {active && <ChevronRight size={13} className="ml-auto opacity-60" />}
            </motion.button>
          ))}
        </motion.nav>
      </motion.aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        {/* Topbar */}
        <div className="flex items-center gap-3 border-b border-white/10 px-4 py-4">
          <AnimatePresence>
            {!isOpen && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setIsOpen(true)}
                className="flex h-7 w-7 items-center justify-center rounded-md text-white/40 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Open sidebar"
              >
                <PanelLeftOpen size={15} />
              </motion.button>
            )}
          </AnimatePresence>
          <h1 className="text-sm font-semibold text-white/80">Dashboard</h1>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col gap-4 p-5">
          {/* Stats row */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Total Users", value: "12,430", delta: "+8.2%" },
              { label: "Revenue", value: "$94.2k", delta: "+3.7%" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl border border-white/8 bg-white/4 p-4">
                <p className="text-xs text-white/40">{stat.label}</p>
                <p className="mt-1 text-xl font-semibold text-white">{stat.value}</p>
                <p className="mt-0.5 text-xs font-medium text-cyan-400">{stat.delta}</p>
              </div>
            ))}
          </div>

          {/* Chart placeholder */}
          <div className="flex flex-1 flex-col rounded-xl border border-white/8 bg-white/4 p-4">
            <p className="mb-3 text-xs font-medium text-white/40">Activity</p>
            <div className="flex flex-1 items-end gap-1.5">
              {[40, 65, 50, 80, 55, 90, 70, 85, 60, 75, 45, 88].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm bg-cyan-500/30"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
