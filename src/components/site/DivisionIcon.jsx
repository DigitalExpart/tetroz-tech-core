import React from "react";
import {
  BrainCircuit,
  Code2,
  Workflow,
  ShieldCheck,
  BarChart3,
  ShoppingBag,
  Network,
  FlaskConical,
} from "lucide-react";

const icons = {
  BrainCircuit,
  Code2,
  Workflow,
  ShieldCheck,
  BarChart3,
  ShoppingBag,
  Network,
  FlaskConical,
};

export default function DivisionIcon({ name, className = "h-5 w-5" }) {
  const Icon = icons[name] || BrainCircuit;
  return <Icon className={className} strokeWidth={1.5} />;
}