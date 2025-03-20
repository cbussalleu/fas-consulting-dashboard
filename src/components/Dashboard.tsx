import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';

// UI Components
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

// Charts and Data
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, 
  ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, 
  Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar 
} from 'recharts';
import { ArrowUp, ArrowDown, ArrowRight, Calendar, Download, ChevronDown } from "lucide-react";
import { availablePeriods, mockDataByPeriod } from "@/data/mockData";

// Consistent color palette
const colors = {
  primary: '#EF4444',
  primaryDark: '#DC2626',
  accent: '#4F46E5',
  accentLight: '#6366F1',
  secondary: '#070707',
  secondaryLight: '#262626',
  background: '#131313',
  foreground: '#F8F9FA',
  muted: '#6B7280',
  border: '#2D2D2D',
};

const Dashboard: React.FC = () => {
  // State for period selection
  const [period, setPeriod] = useState<string>("q2-2025");
  
  // Get data for selected period
  const periodData = mockDataByPeriod[period];
  
  if (!periodData) {
    return <div className="p-8 text-center text-white">No hay datos disponibles para el período seleccionado</div>;
  }

  return (
    <div className="min-h-screen bg-[#131313] text-white">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-secondary/90 backdrop-blur-md py-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex-1"></div>
          <Link 
            to="/" 
            className="text-xl font-display tracking-tighter text-white"
          >
            WE ARE FAS CONSULTING
          </Link>
          <div className="flex-1 flex justify-end">
            <button className="text-white">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <div className="pt-24 p-6 max-w-7xl mx-auto">
        {/* Header with Title and Period Selector */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-display tracking-tight text-white">DASHBOARD DE MONITOREO</h1>
            <p className="text-sm text-gray-400 mt-1">Consulting Practice Metrics</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" className="text-white border-gray-700 hover:bg-gray-800">
              <Download className="mr-2 h-4 w-4" /> Exportar
            </Button>
            
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-[180px] bg-secondary/50 text-white border-gray-700">
                <SelectValue placeholder="Seleccionar periodo" />
              </SelectTrigger>
              <SelectContent>
                {availablePeriods.map((p) => (
                  <SelectItem key={p.id} value={p.id}>{p.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* KPI Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="bg-secondary/20 border border-accent/20">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-4xl font-display text-accent mb-1">{periodData.understanding.value}%</div>
                <div className="text-sm text-gray-300">Nivel de Entendimiento</div>
                <div className={`flex items-center justify-center gap-1 text-xs mt-2 ${periodData.understanding.direction === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                  {periodData.understanding.direction === 'up' ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                  <span>{Math.abs(periodData.understanding.change)}% vs período anterior</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-secondary/20 border border-primary/20">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-4xl font-display text-primary mb-1">{periodData.engagement.value}%</div>
                <div className="text-sm text-gray-300">Nivel de Engagement</div>
                <div className={`flex items-center justify-center gap-1 text-xs mt-2 ${periodData.engagement.direction === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                  {periodData.engagement.direction === 'up' ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                  <span>{Math.abs(periodData.engagement.change)}% vs período anterior</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-secondary/20 border border-accent/20">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-4xl font-display text-accentLight mb-1">{periodData.usability.value}%</div>
                <div className="text-sm text-gray-300">Nivel de Usabilidad</div>
                <div className={`flex items-center justify-center gap-1 text-xs mt-2 ${periodData.usability.direction === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                  {periodData.usability.direction === 'up' ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                  <span>{Math.abs(periodData.usability.change)}% vs período anterior</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for Objectives */}
        <Tabs defaultValue="understanding" className="w-full">
          <TabsList className="grid grid-cols-3 bg-secondary/20 border-gray-800 border">
            <TabsTrigger 
              value="understanding" 
              className="text-white data-[state=active]:bg-accent/50 data-[state=active]:text-white"
            >
              Entendimiento
            </TabsTrigger>
            <TabsTrigger 
              value="engagement" 
              className="text-white data-[state=active]:bg-primary/50 data-[state=active]:text-white"
            >
              Engagement
            </TabsTrigger>
            <TabsTrigger 
              value="usability" 
              className="text-white data-[state=active]:bg-accentLight/50 data-[state=active]:text-white"
            >
              Usabilidad
            </TabsTrigger>
          </TabsList>

          {/* Objetivo 1: Entendimiento de la Práctica */}
          <TabsContent value="understanding" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Conocimiento General de la Práctica (Radar Chart) */}
              <Card className="bg-secondary/20 border border-accent/20">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Conocimiento de la Práctica</CardTitle>
                  <p className="text-xs text-gray-400">Source: Consulting Survey</p>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart 
                        cx="50%" 
                        cy="50%" 
                        outerRadius="80%" 
                        data={[
                          { subject: 'Conocimiento General', A: periodData.surveys.generalKnowledge, fullMark: 100 },
                          { subject: 'Conocimiento Líderes', A: periodData.surveys.leadersKnowledge, fullMark: 100 },
                          { subject: 'Valor para Clientes', A: periodData.surveys.clientValue, fullMark: 100 },
                          { subject: 'Valor para FAS', A: periodData.surveys.internalValue, fullMark: 100 },
                        ]}
                      >
                        <PolarGrid stroke="#333" />
                        <PolarAngleAxis dataKey="subject" stroke="#888" fontSize={10} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#888" fontSize={8} />
                        <Radar 
                          name="Nivel de Conocimiento" 
                          dataKey="A" 
                          stroke={colors.accent} 
                          fill={colors.accent} 
                          fillOpacity={0.3} 
                        />
                        <Tooltip />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Visitas al Site de la Práctica (Line Chart) */}
              <Card className="bg-secondary/20 border border-accent/20">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Visitas al Site</CardTitle>
                  <p className="text-xs text-gray-400">Source: Web Analytics</p>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart 
                        data={periodData.visitData.monthlyVisits}
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
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Objetivo 2: Engagement de la Práctica */}
          <TabsContent value="engagement" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Interacción con Práctica y Otras Prácticas (Line Chart) */}
              <Card className="bg-secondary/20 border border-primary/20">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Interacción con Prácticas</CardTitle>
                  <p className="text-xs text-gray-400">Source: Consulting Survey</p>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart 
                        data={periodData.interactionData.practiceInteractions}
                        margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                        <XAxis dataKey="name" stroke="#888" />
                        <YAxis stroke="#888" />
                        <Tooltip />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="consulting" 
                          name="Con Consulting" 
                          stroke={colors.accent} 
                          strokeWidth={3} 
                        />
                        <Line 
                          type="monotone" 
                          dataKey="otras" 
                          name="Con Otras Prácticas" 
                          stroke={colors.primary} 
                          strokeWidth={3} 
                          strokeDasharray="5 5" 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Participación en Eventos (Bar Chart) */}
              <Card className="bg-secondary/20 border border-primary/20">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Participación en Eventos</CardTitle>
                  <p className="text-xs text-gray-400">Source: Google Cloud</p>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart 
                        data={periodData.eventsData.participationByEvent}
                        margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                        <XAxis dataKey="name" stroke="#888" />
                        <YAxis stroke="#888" />
                        <Tooltip />
                        <Legend />
                        <Bar 
                          dataKey="attended" 
                          name="Asistentes" 
                          fill={colors.accent} 
                          radius={[4, 4, 0, 0]} 
                        />
                        <Bar 
                          dataKey="total" 
                          name="Capacidad" 
                          fill="#333" 
                          radius={[4, 4, 0, 0]} 
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Objetivo 3: Usabilidad de la Práctica */}
          <TabsContent value="usability" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Uso de Recursos (PieChart) */}
              <Card className="bg-secondary/20 border border-accent/20">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Uso de Recursos</CardTitle>
                  <p className="text-xs text-gray-400">Source: Consulting Survey</p>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={periodData.resourcesData.resourceUsage}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={3}
                          dataKey="value"
                          label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {periodData.resourcesData.resourceUsage.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={[colors.accent, colors.primary, colors.accentLight, colors.success][index % 4]} 
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Tendencia de Uso de Recursos (Line Chart) */}
              <Card className="bg-secondary/20 border border-accent/20">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Tendencia de Uso de Recursos</CardTitle>
                  <p className="text-xs text-gray-400">Source: Web Analytics & Google Cloud</p>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart 
                        data={periodData.resourcesData.resourceUsageTrend}
                        margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                        <XAxis dataKey="name" stroke="#888" />
                        <YAxis stroke="#888" />
                        <Tooltip />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="vistas" 
                          name="Vistas" 
                          stroke={colors.accent} 
                          strokeWidth={2} 
                        />
                        <Line 
                          type="monotone" 
                          dataKey="descargas" 
                          name="Descargas" 
                          stroke={colors.primary} 
                          strokeWidth={2} 
                        />
                        <Line 
                          type="monotone" 
                          dataKey="copias" 
                          name="Copias" 
                          stroke={colors.accentLight} 
                          strokeWidth={2} 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-gray-500">
          <p>Última actualización: 20 de Junio, 2025 • Findasense Consulting Dashboard</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
