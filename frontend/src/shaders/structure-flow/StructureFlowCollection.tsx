import React, { Suspense } from "react";
import { StructureFlowBackground, type StructureFlowBackgroundProps } from "./StructureFlowBackground";
import { FluxVortexBackground, type FluxVortexBackgroundProps } from "../flux-vortex/FluxVortexBackground";
import { OrbitalSphereBackground, type OrbitalSphereBackgroundProps } from "../orbital-sphere/OrbitalSphereBackground";

export const STRUCTURE_FLOW_VARIANTS = [
  "structure-flow",
  "emerald-horizon",
  "orbital-sphere",
  "dot-matrix",
  "expanse-field",
  "logic-core",
  "dimensional-field",
  "data-field",
  "topology-field",
  "nebula",
  "fluid-field",
  "ember-storm",
  "flux-vortex",
] as const;

export type StructureFlowVariant = (typeof STRUCTURE_FLOW_VARIANTS)[number];

export type StructureFlowCollectionProps = StructureFlowBackgroundProps &
  OrbitalSphereBackgroundProps &
  FluxVortexBackgroundProps & {
    variant?: StructureFlowVariant;
  };

const FALLBACK = <div className="threeui-background" style={{ background: "#050607" }} />;

export function StructureFlowCollection(props: StructureFlowCollectionProps) {
  const { variant = "structure-flow", ...restProps } = props;

  if (variant === "flux-vortex") {
    return (
      <Suspense fallback={FALLBACK}>
        <FluxVortexBackground {...restProps} />
      </Suspense>
    );
  }

  if (variant === "orbital-sphere") {
    return (
      <Suspense fallback={FALLBACK}>
        <OrbitalSphereBackground {...restProps} />
      </Suspense>
    );
  }

  return (
    <Suspense fallback={FALLBACK}>
      <StructureFlowBackground {...restProps} />
    </Suspense>
  );
}


