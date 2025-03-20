/**
 * Archivo de datos simulados para el dashboard
 * En una aplicación real, estos datos vendrían de:
 * - API endpoints
 * - Google Analytics
 * - Encuestas en Google Forms
 * - Métricas almacenadas en Google Cloud
 */

// Types para nuestros datos
export type KPIData = {
  value: number;
  change: number;
  direction: 'up' | 'down' | 'flat';
  prevValue?: number;
};

export type PeriodData = {
  id: string;
  label: string;
  understanding: KPIData;
  engagement: KPIData;
  usability: KPIData;
  surveys: SurveyData;
  visitData: VisitData;
  interactionData: InteractionData;
  eventsData: EventData;
  resourcesData: ResourceData;
};

export type SurveyData = {
  generalKnowledge: number;
  leadersKnowledge: number;
  clientValue: number;
  internalValue: number;
  totalResponses: number;
};

export type VisitData = {
  monthlyVisits: Array<{name: string; value: number}>;
  pageViewsBySection: Array<{name: string; value: number}>;
  visitGrowth: number;
  totalVisits: number;
};

export type InteractionData = {
  practiceInteractions: Array<{name: string; consulting: number; otras: number}>;
  commentsFeedback: Array<{name: string; value: number}>;
  positiveExperiences: number;
  totalInteractions: number;
};

export type EventData = {
  participationByEvent: Array<{name: string; attended: number; total: number}>;
  totalEvents: number;
  attendanceRate: number;
};

export type ResourceData = {
  resourceUsage: Array<{name: string; value: number}>;
  resourceUsageTrend: Array<{name: string; vistas: number; descargas: number; copias: number}>;
  usabilityScore: number;
  mostUsedResource: string;
};

// Períodos disponibles
export const availablePeriods = [
  { id: 'q2-2025', label: 'Q2 2025' },
  { id: 'q1-2025', label: 'Q1 2025' },
  { id: 'q4-2024', label: 'Q4 2024' },
  { id: 'q3-2024', label: 'Q3 2024' },
];

// Datos simulados por período
export const mockDataByPeriod: Record<string, PeriodData> = {
  'q2-2025': {
    id: 'q2-2025',
    label: 'Q2 2025',
    understanding: { 
      value: 78, 
      change: 12, 
      direction: 'up',
      prevValue: 66
    },
    engagement: { 
      value: 63, 
      change: 5, 
      direction: 'up',
      prevValue: 58
    },
    usability: { 
      value: 82, 
      change: 8, 
      direction: 'up',
      prevValue: 74
    },
    surveys: {
      generalKnowledge: 78,
      leadersKnowledge: 65,
      clientValue: 85,
      internalValue: 72,
      totalResponses: 48
    },
    visitData: {
      monthlyVisits: [
        { name: 'Ene', value: 320 },
        { name: 'Feb', value: 450 },
        { name: 'Mar', value: 410 },
        { name: 'Abr', value: 540 },
        { name: 'May', value: 610 },
        { name: 'Jun', value: 590 },
      ],
      pageViewsBySection: [
        { name: 'Recursos', value: 420 },
        { name: 'Soluciones', value: 280 },
        { name: 'Equipo', value: 190 },
        { name: 'Eventos', value: 110 },
      ],
      visitGrowth: 22,
      totalVisits: 2920
    },
    interactionData: {
      practiceInteractions: [
        { name: 'Ene', consulting: 45, otras: 30 },
        { name: 'Feb', consulting: 52, otras: 35 },
        { name: 'Mar', consulting: 49, otras: 38 },
        { name: 'Abr', consulting: 60, otras: 40 },
        { name: 'May', consulting: 70, otras: 45 },
        { name: 'Jun', consulting: 68, otras: 50 },
      ],
      commentsFeedback: [
        { name: 'Recursos', value: 28 },
        { name: 'Workshops', value: 42 },
        { name: 'Artículos', value: 15 },
        { name: 'Tools', value: 35 },
      ],
      positiveExperiences: 86,
      totalInteractions: 320
    },
    eventsData: {
      participationByEvent: [
        { name: 'Workshop Design', attended: 24, total: 30 },
        { name: 'Case Review', attended: 18, total: 25 },
        { name: 'Tech Talk', attended: 15, total: 20 },
        { name: 'Panel CX', attended: 22, total: 30 },
        { name: 'Sesión Q&A', attended: 12, total: 15 },
      ],
      totalEvents: 5,
      attendanceRate: 75
    },
    resourcesData: {
      resourceUsage: [
        { name: 'Toolkit', value: 45 },
        { name: 'Plantillas', value: 25 },
        { name: 'Guías', value: 20 },
        { name: 'Artículos', value: 10 },
      ],
      resourceUsageTrend: [
        { name: 'Ene', vistas: 430, descargas: 210, copias: 52 },
        { name: 'Feb', vistas: 510, descargas: 230, copias: 60 },
        { name: 'Mar', vistas: 490, descargas: 250, copias: 65 },
        { name: 'Abr', vistas: 560, descargas: 270, copias: 70 },
        { name: 'May', vistas: 620, descargas: 310, copias: 82 },
        { name: 'Jun', vistas: 650, descargas: 340, copias: 87 },
      ],
      usabilityScore: 82,
      mostUsedResource: 'Toolkit CX Assessment'
    }
  },
  'q1-2025': {
    id: 'q1-2025',
    label: 'Q1 2025',
    understanding: { 
      value: 66, 
      change: 8, 
      direction: 'up',
      prevValue: 58
    },
    engagement: { 
      value: 58, 
      change: 3, 
      direction: 'up',
      prevValue: 55
    },
    usability: { 
      value: 74, 
      change: 6, 
      direction: 'up',
      prevValue: 68
    },
    surveys: {
      generalKnowledge: 66,
      leadersKnowledge: 55,
      clientValue: 72,
      internalValue: 64,
      totalResponses: 42
    },
    visitData: {
      monthlyVisits: [
        { name: 'Oct', value: 280 },
        { name: 'Nov', value: 310 },
        { name: 'Dic', value: 290 },
        { name: 'Ene', value: 320 },
        { name: 'Feb', value: 450 },
        { name: 'Mar', value: 410 },
      ],
      pageViewsBySection: [
        { name: 'Recursos', value: 380 },
        { name: 'Soluciones', value: 240 },
        { name: 'Equipo', value: 170 },
        { name: 'Eventos', value: 90 },
      ],
      visitGrowth: 18,
      totalVisits: 2060
    },
    interactionData: {
      practiceInteractions: [
        { name: 'Oct', consulting: 35, otras: 28 },
        { name: 'Nov', consulting: 38, otras: 29 },
        { name: 'Dic', consulting: 40, otras: 30 },
        { name: 'Ene', consulting: 45, otras: 30 },
        { name: 'Feb', consulting: 52, otras: 35 },
        { name: 'Mar', consulting: 49, otras: 38 },
      ],
      commentsFeedback: [
        { name: 'Recursos', value: 22 },
        { name: 'Workshops', value: 36 },
        { name: 'Artículos', value: 12 },
        { name: 'Tools', value: 28 },
      ],
      positiveExperiences: 79,
      totalInteractions: 260
    },
    eventsData: {
      participationByEvent: [
        { name: 'Workshop CX', attended: 20, total: 28 },
        { name: 'Case Study', attended: 16, total: 22 },
        { name: 'UX Talks', attended: 13, total: 18 },
        { name: 'Panel Digital', attended: 18, total: 25 },
      ],
      totalEvents: 4,
      attendanceRate: 72
    },
    resourcesData: {
      resourceUsage: [
        { name: 'Toolkit', value: 42 },
        { name: 'Plantillas', value: 23 },
        { name: 'Guías', value: 22 },
        { name: 'Artículos', value: 13 },
      ],
      resourceUsageTrend: [
        { name: 'Oct', vistas: 380, descargas: 190, copias: 45 },
        { name: 'Nov', vistas: 410, descargas: 200, copias: 50 },
        { name: 'Dic', vistas: 390, descargas: 195, copias: 47 },
        { name: 'Ene', vistas: 430, descargas: 210, copias: 52 },
        { name: 'Feb', vistas: 510, descargas: 230, copias: 60 },
        { name: 'Mar', vistas: 490, descargas: 250, copias: 65 },
      ],
      usabilityScore: 74,
      mostUsedResource: 'Toolkit CX Assessment'
    }
  },
  'q4-2024': {
    id: 'q4-2024',
    label: 'Q4 2024',
    understanding: { 
      value: 58, 
      change: 10, 
      direction: 'up',
      prevValue: 48
    },
    engagement: { 
      value: 55, 
      change: 8, 
      direction: 'up',
      prevValue: 47
    },
    usability: { 
      value: 68, 
      change: 12, 
      direction: 'up',
      prevValue: 56
    },
    surveys: {
      generalKnowledge: 58,
      leadersKnowledge: 48,
      clientValue: 65,
      internalValue: 56,
      totalResponses: 38
    },
    visitData: {
      monthlyVisits: [
        { name: 'Jul', value: 210 },
        { name: 'Ago', value: 240 },
        { name: 'Sep', value: 260 },
        { name: 'Oct', value: 280 },
        { name: 'Nov', value: 310 },
        { name: 'Dic', value: 290 },
      ],
      pageViewsBySection: [
        { name: 'Recursos', value: 340 },
        { name: 'Soluciones', value: 220 },
        { name: 'Equipo', value: 150 },
        { name: 'Eventos', value: 80 },
      ],
      visitGrowth: 15,
      totalVisits: 1590
    },
    interactionData: {
      practiceInteractions: [
        { name: 'Jul', consulting: 25, otras: 22 },
        { name: 'Ago', consulting: 28, otras: 24 },
        { name: 'Sep', consulting: 32, otras: 26 },
        { name: 'Oct', consulting: 35, otras: 28 },
        { name: 'Nov', consulting: 38, otras: 29 },
        { name: 'Dic', consulting: 40, otras: 30 },
      ],
      commentsFeedback: [
        { name: 'Recursos', value: 18 },
        { name: 'Workshops', value: 30 },
        { name: 'Artículos', value: 10 },
        { name: 'Tools', value: 22 },
      ],
      positiveExperiences: 72,
      totalInteractions: 210
    },
    eventsData: {
      participationByEvent: [
        { name: 'Workshop UX', attended: 18, total: 25 },
        { name: 'Case Presentation', attended: 14, total: 20 },
        { name: 'Digital Innovation', attended: 12, total: 18 },
        { name: 'CX Roundtable', attended: 16, total: 24 },
      ],
      totalEvents: 4,
      attendanceRate: 70
    },
    resourcesData: {
      resourceUsage: [
        { name: 'Toolkit', value: 38 },
        { name: 'Plantillas', value: 22 },
        { name: 'Guías', value: 24 },
        { name: 'Artículos', value: 16 },
      ],
      resourceUsageTrend: [
        { name: 'Jul', vistas: 320, descargas: 160, copias: 38 },
        { name: 'Ago', vistas: 340, descargas: 170, copias: 40 },
        { name: 'Sep', vistas: 360, descargas: 180, copias: 42 },
        { name: 'Oct', vistas: 380, descargas: 190, copias: 45 },
        { name: 'Nov', vistas: 410, descargas: 200, copias: 50 },
        { name: 'Dic', vistas: 390, descargas: 195, copias: 47 },
      ],
      usabilityScore: 68,
      mostUsedResource: 'Plantillas CX Journey'
    }
  },
  'q3-2024': {
    id: 'q3-2024',
    label: 'Q3 2024',
    understanding: { 
      value: 48, 
      change: -2, 
      direction: 'down',
      prevValue: 50
    },
    engagement: { 
      value: 47, 
      change: 4, 
      direction: 'up',
      prevValue: 43
    },
    usability: { 
      value: 56, 
      change: 2, 
      direction: 'up',
      prevValue: 54
    },
    surveys: {
      generalKnowledge: 48,
      leadersKnowledge: 40,
      clientValue: 55,
      internalValue: 46,
      totalResponses: 32
    },
    visitData: {
      monthlyVisits: [
        { name: 'Abr', value: 180 },
        { name: 'May', value: 190 },
        { name: 'Jun', value: 200 },
        { name: 'Jul', value: 210 },
        { name: 'Ago', value: 240 },
        { name: 'Sep', value: 260 },
      ],
      pageViewsBySection: [
        { name: 'Recursos', value: 310 },
        { name: 'Soluciones', value: 200 },
        { name: 'Equipo', value: 130 },
        { name: 'Eventos', value: 70 },
      ],
      visitGrowth: 12,
      totalVisits: 1280
    },
    interactionData: {
      practiceInteractions: [
        { name: 'Abr', consulting: 20, otras: 18 },
        { name: 'May', consulting: 22, otras: 19 },
        { name: 'Jun', consulting: 24, otras: 20 },
        { name: 'Jul', consulting: 25, otras: 22 },
        { name: 'Ago', consulting: 28, otras: 24 },
        { name: 'Sep', consulting: 32, otras: 26 },
      ],
      commentsFeedback: [
        { name: 'Recursos', value: 14 },
        { name: 'Workshops', value: 24 },
        { name: 'Artículos', value: 8 },
        { name: 'Tools', value: 18 },
      ],
      positiveExperiences: 65,
      totalInteractions: 170
    },
    eventsData: {
      participationByEvent: [
        { name: 'Workshop Intro', attended: 15, total: 22 },
        { name: 'Case Study Basics', attended: 12, total: 18 },
        { name: 'UX Fundamentals', attended: 10, total: 15 },
      ],
      totalEvents: 3,
      attendanceRate: 67
    },
    resourcesData: {
      resourceUsage: [
        { name: 'Toolkit', value: 35 },
        { name: 'Plantillas', value: 25 },
        { name: 'Guías', value: 20 },
        { name: 'Artículos', value: 20 },
      ],
      resourceUsageTrend: [
        { name: 'Abr', vistas: 280, descargas: 140, copias: 32 },
        { name: 'May', vistas: 290, descargas: 145, copias: 34 },
        { name: 'Jun', vistas: 300, descargas: 150, copias: 36 },
        { name: 'Jul', vistas: 320, descargas: 160, copias: 38 },
        { name: 'Ago', vistas: 340, descargas: 170, copias: 40 },
        { name: 'Sep', vistas: 360, descargas: 180, copias: 42 },
      ],
      usabilityScore: 56,
      mostUsedResource: 'Guías Metodológicas'
    }
  }
};
