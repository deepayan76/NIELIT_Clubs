import React from 'react';
import { DataPixelArcCanvas } from './DataPixelArcCanvas';
import './predictive-arc.css';

/**
 * PredictiveArcCanvas Component
 * Exact ThreeUI implementation supporting variant="data-pixel"
 */
export function PredictiveArcCanvas(props) {
  if (props.variant === 'data-pixel') {
    const { variant: _variant, ...canvasProps } = props;
    return <DataPixelArcCanvas {...canvasProps} />;
  }

  // Default to DataPixelArcCanvas as standard variant for AI club
  const { variant: _variant, ...canvasProps } = props;
  return <DataPixelArcCanvas {...canvasProps} />;
}

export default PredictiveArcCanvas;
