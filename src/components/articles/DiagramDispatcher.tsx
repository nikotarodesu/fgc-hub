'use client';

import React from 'react';
import { HadokenFlowDiagram, DistanceMeterDiagram, MindsetComparisonTable } from './RyuStrategyDiagrams';
import NeutralTriangleDiagram from './NeutralTriangleDiagram';
import FuzzyTimelineDiagram from './FuzzyTimelineDiagram';
import {
  AkumaWinPlanDiagram,
  AkumaHadokenDecisionDiagram,
  AkumaCornerSpacingDiagram,
} from './AkumaStrategyDiagrams';

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
    case 'akuma-win-plan':
      return <AkumaWinPlanDiagram />;
    case 'akuma-hadoken-decision':
      return <AkumaHadokenDecisionDiagram />;
    case 'akuma-corner-spacing':
      return <AkumaCornerSpacingDiagram />;
    default:
      return null;
  }
}
