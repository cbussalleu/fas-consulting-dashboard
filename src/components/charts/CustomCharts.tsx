import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  Cell,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar
} from 'recharts';

// Colores consistentes con el diseño existente
const colors = {
  primary: '#EF4444',
  primaryDark: '#DC2626',
  accent: '#4F46E5',
  accentLight: '#6366F1',
  secondary: '#070707',
  secondaryLight: '#262626',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  background: '#131313',
  foreground: '#F8F9FA',
  muted: '#6B7280',
  border: '#2D2D2D',
};

/**
 * Componente para gráfico de radar que muestra indicadores de conocimiento
 */
export const KnowledgeRadarChart: React.FC<{
  data: Array<{
    subject: string;
    A: number;
    fullMark: number;
  }>;
}> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid stroke="#333" />
        <PolarAngleAxis dataKey="subject" stroke="#888" fontSize={12} />
        <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#888" fontSize={10} />
        <Radar name="Nivel actual" dataKey="A" stroke={colors.accent} fill={colors.accent} fillOpacity={0.3} />
        <Legend />
        <Tooltip />
      </RadarChart>
    </ResponsiveContainer>
  );
};

/**
 * Componente para gráfico de líneas para visualizar visitas por mes
 */
export const MonthlyVisitsChart: React.FC<{
  data: Array<{
    name: string;
    value: number;
  }>;
}> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
        <XAxis dataKey="name" stroke="#888" />
        <YAxis stroke="#888" />
        <Tooltip />
        <Line 
          type="monotone" 
          dataKey="value" 
          name="Visitas"
          stroke={colors.primary} 
          strokeWidth={3} 
          dot={{ r: 6 }} 
          activeDot={{ r: 8 }} 
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

/**
 * Componente para gráfico circular con secciones del sitio más visitadas
 */
export const PageViewsChart: React.FC<{
  data: Array<{
    name: string;
    value: number;
  }>;
}> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={40}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={2}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={[colors.accent, colors.primary, colors.accentLight, colors.primaryDark][index % 4]} />
          ))}
        </Pie>
        <Tooltip formatter={(value, name, props) => [`${value} vistas`, props.payload.name]} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

/**
 * Componente para gráfico de interacción entre prácticas
 */
export const PracticeInteractionsChart: React.FC<{
  data: Array<{
    name: string;
    consulting: number;
    otras: number;
  }>;
}> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart 
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
        <XAxis dataKey="name" stroke="#888" />
        <YAxis stroke="#888" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="consulting" name="Con Consulting" stroke={colors.accent} strokeWidth={3} />
        <Line type="monotone" dataKey="otras" name="Con otras prácticas" stroke={colors.primary} strokeWidth={3} strokeDasharray="5 5" />
      </LineChart>
    </ResponsiveContainer>
  );
};

/**
 * Componente para gráfico de barras mostrando participación en eventos
 */
export const EventsParticipationChart: React.FC<{
  data: Array<{
    name: string;
    attended: number;
    total: number;
  }>;
}> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart 
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
        <XAxis dataKey="name" stroke="#888" />
        <YAxis stroke="#888" />
        <Tooltip />
        <Legend />
        <Bar dataKey="attended" name="Asistentes" fill={colors.accent} radius={[4, 4, 0, 0]} />
        <Bar dataKey="total" name="Capacidad" fill="#333" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

/**
 * Componente para gráfico de barras horizontales mostrando comentarios por tipo de recurso
 */
export const CommentsBarChart: React.FC<{
  data: Array<{
    name: string;
    value: number;
  }>;
}> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        layout="vertical"
        data={data}
        margin={{ top: 0, right: 0, left: 10, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#333" horizontal={false} />
        <XAxis type="number" stroke="#888" />
        <YAxis dataKey="name" type="category" scale="band" stroke="#888" width={80} />
        <Tooltip />
        <Bar dataKey="value" name="Comentarios" fill={colors.primary} radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

/**
 * Componente para gráfico circular mostrando uso de recursos por tipo
 */
export const ResourceUsagePieChart: React.FC<{
  data: Array<{
    name: string;
    value: number;
  }>;
}> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={90}
          fill="#8884d8"
          paddingAngle={3}
          dataKey="value"
          label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={[colors.accent, colors.primary, colors.accentLight, colors.success][index % 4]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

/**
 * Componente para gráfico de tendencia de uso de recursos
 */
export const ResourceUsageTrendChart: React.FC<{
  data: Array<{
    name: string;
    vistas: number;
    descargas: number;
    copias: number;
  }>;
}> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart 
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
        <XAxis dataKey="name" stroke="#888" />
        <YAxis stroke="#888" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="vistas" stroke={colors.accent} strokeWidth={2} />
        <Line type="monotone" dataKey="descargas" stroke={colors.primary} strokeWidth={2} />
        <Line type="monotone" dataKey="copias" stroke={colors.accentLight} strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
};

/**
 * Componente para mostrar un indicador circular de porcentaje
 */
export const CircularProgress: React.FC<{
  value: number;
  color?: string;
  size?: number;
}> = ({ value, color = colors.accentLight, size = 160 }) => {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-3xl font-display" style={{ color }}>{value}%</div>
      </div>
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <circle 
          cx="50" cy="50" r="45" 
          fill="none" 
          stroke="#333" 
          strokeWidth="10"
        />
        <circle 
          cx="50" cy="50" r="45" 
          fill="none" 
          stroke={color} 
          strokeWidth="10"
          strokeDasharray={`${2 * Math.PI * 45 * value / 100} ${2 * Math.PI * 45 * (1 - value / 100)}`}
          strokeDashoffset={2 * Math.PI * 45 * 0.25}
          transform="rotate(-90 50 50)"
        />
      </svg>
    </div>
  );
};
