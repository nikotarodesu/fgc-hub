'use client';

import React from 'react';
import { HadokenFlowDiagram, DistanceMeterDiagram, MindsetComparisonTable } from './RyuStrategyDiagrams';
import NeutralTriangleDiagram from './NeutralTriangleDiagram';
import FuzzyTimelineDiagram from './FuzzyTimelineDiagram';

interface DiagramDispatcherProps {
  diagramType?: string;
}

export default function DiagramDispatcher({ diagramType }: DiagramDispatcherProps) {
  if (!diagramType) return null;

  switch (diagramType) {
    case 'hadoken-flow':
      return <HadokenFlowDiagram />;
    case 'distance-meter':
      return <DistanceMeterDiagram />;
    case 'mindset-comparison':
      return <MindsetComparisonTable />;
    case 'neutral-triangle':
      return <NeutralTriangleDiagram />;
    case 'fuzzy-timeline':
      return <FuzzyTimelineDiagram />;
    default:
      return null;
  }
}
