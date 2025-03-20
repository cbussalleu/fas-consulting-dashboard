import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, 
  ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, 
  Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar 
} from 'recharts';
import { ArrowUp, ArrowDown, ArrowRight, Calendar, Download, ChevronDown } from "lucide-react";
import { availablePeriods, mockDataByPeriod } from "@/data/mockData";

/**
 * Colores consistentes con el diseño existente
 */
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

const Dashboard: React.FC = () => {
  // Estado para selección de período
  const [period, setPeriod] = useState<string>("q2-2025");
  
  // Obtener datos del período seleccionado
  const periodData = mockDataByPeriod[period];
  
  if (!periodData) {
    return <div className="p-8 text-center">No hay datos disponibles para el período seleccionado</div>;
  }
  
  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-6">
      {/* Header with Title and Period Selector */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-display tracking-tight">DASHBOARD DE MONITOREO</h1>
          <p className="text-sm text-muted-foreground mt-1">Consulting Practice Metrics</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <Download size={14} />
              <span>Exportar</span>
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Periodo:</span>
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-[180px] h-8">
                <SelectValue placeholder="Seleccionar periodo" />
              </SelectTrigger>
              <SelectContent>
                {availablePeriods.map((p) => (
                  <SelectItem key={p.id} value={p.id}>{p.label}</SelectItem>
                ))}
                <SelectItem value="custom">Personalizar...</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="bg-secondary/5 border border-accent/10">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-4xl font-display text-accent mb-1">{periodData.understanding.value}%</div>
              <div className="text-sm text-muted-foreground">Nivel de Entendimiento</div>
              <div className={`flex items-center justify-center gap-1 text-xs mt-2 ${periodData.understanding.direction === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                {periodData.understanding.direction === 'up' ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                <span>{Math.abs(periodData.understanding.change)}% vs período anterior</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-secondary/5 border border-primary/10">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-4xl font-display text-primary mb-1">{periodData.engagement.value}%</div>
              <div className="text-sm text-muted-foreground">Nivel de Engagement</div>
              <div className={`flex items-center justify-center gap-1 text-xs mt-2 ${periodData.engagement.direction === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                {periodData.engagement.direction === 'up' ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                <span>{Math.abs(periodData.engagement.change)}% vs período anterior</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-secondary/5 border border-purple-light/10">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-4xl font-display text-purple-light mb-1">{periodData.usability.value}%</div>
              <div className="text-sm text-muted-foreground">Nivel de Usabilidad</div>
              <div className={`flex items-center justify-center gap-1 text-xs mt-2 ${periodData.usability.direction === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                {periodData.usability.direction === 'up' ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                <span>{Math.abs(periodData.usability.change)}% vs período anterior</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Tab Layout for 3 Objectives */}
      <Tabs defaultValue="understanding" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="understanding">Entendimiento</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="usability">Usabilidad</TabsTrigger>
        </TabsList>
        
        {/* Understanding Tab Content */}
        <TabsContent value="understanding" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Knowledge Indicators Radar Chart */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Indicadores de Conocimiento</CardTitle>
                <div className="text-xs text-muted-foreground">Source: Consulting Survey</div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={[
                      { subject: 'Conocimiento General', A: periodData.surveys.generalKnowledge, fullMark: 100 },
                      { subject: 'Conocimiento de Líderes', A: periodData.surveys.leadersKnowledge, fullMark: 100 },
                      { subject: 'Propuesta Cliente', A: periodData.surveys.clientValue, fullMark: 100 },
                      { subject: 'Propuesta Interna', A: periodData.surveys.internalValue, fullMark: 100 },
                    ]}>
                      <PolarGrid stroke="#333" />
                      <PolarAngleAxis dataKey="subject" stroke="#888" fontSize={12} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#888" fontSize={10} />
                      <Radar name="Nivel actual" dataKey="A" stroke={colors.accent} fill={colors.accent} fillOpacity={0.3} />
                      <Legend />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            {/* Site Visits Line Chart */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Visitas al Site de la Práctica</CardTitle>
                <div className="text-xs text-muted-foreground">Source: Web Analytics</div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-[300px] w-full">
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
          
          {/* Additional Understanding Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Vistas por Sección</CardTitle>
                <div className="text-xs text-muted-foreground">Source: Web Analytics</div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-[240px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={periodData.visitData.pageViewsBySection}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {periodData.visitData.pageViewsBySection.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={[colors.accent, colors.primary, colors.accentLight, colors.primaryDark][index % 4]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value, name, props) => [`${value} vistas`, props.payload.name]} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-secondary/5 border border-accent/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Totales de Visitas</CardTitle>
                <div className="text-xs text-muted-foreground">Source: Web Analytics</div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col h-full justify-center items-center">
                  <div className="text-3xl font-display text-accent mb-1">{periodData.visitData.totalVisits.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground mb-2">Visitas Totales</div>
                  
                  <div className={`flex items-center gap-1 text-xs mt-2 ${periodData.visitData.visitGrowth > 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {periodData.visitData.visitGrowth > 0 ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                    <span>{Math.abs(periodData.visitData.visitGrowth)}% crecimiento</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-secondary/5 border border-accent/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Encuestas Respondidas</CardTitle>
                <div className="text-xs text-muted-foreground">Source: Consulting Survey</div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col h-full justify-center items-center">
                  <div className="text-3xl font-display text-accent mb-1">{periodData.surveys.totalResponses}</div>
                  <div className="text-sm text-muted-foreground mb-3">Respuestas Totales</div>
                  
                  <Button variant="outline" size="sm" className="mt-2 w-full">
                    Ver Detalles <ArrowRight size={14} className="ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Engagement Tab Content */}
        <TabsContent value="engagement" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Practice Interactions Line Chart */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Interacción con Prácticas</CardTitle>
                <div className="text-xs text-muted-foreground">Source: Consulting Survey</div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-[300px] w-full">
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
                      <Line type="monotone" dataKey="consulting" name="Con Consulting" stroke={colors.accent} strokeWidth={3} />
                      <Line type="monotone" dataKey="otras" name="Con otras prácticas" stroke={colors.primary} strokeWidth={3} strokeDasharray="5 5" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            {/* Events Participation Bar Chart */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Participación en Eventos</CardTitle>
                <div className="text-xs text-muted-foreground">Source: Google Cloud</div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-[300px] w-full">
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
                      <Bar dataKey="attended" name="Asistentes" fill={colors.accent} radius={[4, 4, 0, 0]} />
                      <Bar dataKey="total" name="Capacidad" fill="#333" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Additional Engagement Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <Card className="bg-secondary/5 border border-primary/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Experiencias Positivas</CardTitle>
                <div className="text-xs text-muted-foreground">Source: Consulting Survey</div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col h-full justify-center items-center">
                  <div className="text-3xl font-display text-primary mb-1">{periodData.interactionData.positiveExperiences}%</div>
                  <div className="text-sm text-muted-foreground mb-2">Experiencia Positiva</div>
                  
                  <div className="w-full bg-secondary/20 rounded-full h-2 mt-3">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${periodData.interactionData.positiveExperiences}%` }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-secondary/5 border border-primary/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Comentarios en Recursos</CardTitle>
                <div className="text-xs text-muted-foreground">Source: Google Cloud</div>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      layout="vertical"
                      data={periodData.interactionData.commentsFeedback}
                      margin={{ top: 0, right: 0, left: 10, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" horizontal={false} />
                      <XAxis type="number" stroke="#888" />
                      <YAxis dataKey="name" type="category" scale="band" stroke="#888" width={80} />
                      <Tooltip />
                      <Bar dataKey="value" name="Comentarios" fill={colors.primary} radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-secondary/5 border border-primary/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Métricas de Eventos</CardTitle>
                <div className="text-xs text-muted-foreground">Source: Google Cloud</div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col h-full justify-center items-center">
                  <div className="grid grid-cols-2 gap-4 w-full">
                    <div className="text-center">
                      <div className="text-2xl font-display text-primary mb-1">{periodData.eventsData.totalEvents}</div>
                      <div className="text-xs text-muted-foreground">Total Eventos</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-display text-primary mb-1">{periodData.eventsData.attendanceRate}%</div>
                      <div className="text-xs text-muted-foreground">Tasa Asistencia</div>
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm" className="mt-6 w-full">
                    Ver Calendario <Calendar size={14} className="ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Usability Tab Content */}
        <TabsContent value="usability" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Resource Usage Pie Chart */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Uso de Recursos por Tipo</CardTitle>
                <div className="text-xs text-muted-foreground">Source: Consulting Survey</div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={periodData.resourcesData.resourceUsage}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        fill="#8884d8"
                        paddingAngle={3}
                        dataKey="value"
                        label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {periodData.resourcesData.resourceUsage.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={[colors.accent, colors.primary, colors.accentLight, colors.success][index % 4]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            {/* Resources Usage Trend Line Chart */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Tendencia de Uso de Recursos</CardTitle>
                <div className="text-xs text-muted-foreground">Source: Google Cloud & Web Analytics</div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-[300px] w-full">
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
                      <Line type="monotone" dataKey="vistas" stroke={colors.accent} strokeWidth={2} />
                      <Line type="monotone" dataKey="descargas" stroke={colors.primary} strokeWidth={2} />
                      <Line type="monotone" dataKey="copias" stroke={colors.accentLight} strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Additional Usability Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <Card className="bg-secondary/5 border border-purple-light/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Usabilidad Percibida</CardTitle>
                <div className="text-xs text-muted-foreground">Source: Consulting Survey</div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col h-full justify-center items-center py-4">
                  <div className="relative w-40 h-40 mb-4">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-3xl font-display text-purple-light">{periodData.resourcesData.usabilityScore}%</div>
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
                        stroke={colors.accentLight} 
                        strokeWidth="10"
                        strokeDasharray={`${2 * Math.PI * 45 * periodData.resourcesData.usabilityScore / 100} ${2 * Math.PI * 45 * (1 - periodData.resourcesData.usabilityScore / 100)}`}
                        strokeDashoffset={2 * Math.PI * 45 * 0.25}
                        transform="rotate(-90 50 50)"
                      />
                    </svg>
                  </div>
                  <div className="text-sm text-center text-muted-foreground mt-2">
                    Score de Usabilidad de Recursos
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-secondary/5 border border-purple-light/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Recurso Más Utilizado</CardTitle>
                <div className="text-xs text-muted-foreground">Source: Google Cloud</div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col h-full justify-center items-center py-6">
                  <div className="text-xl font-medium text-purple-light mb-3">
                    {periodData.resourcesData.mostUsedResource}
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 w-full mt-2">
                    <div className="text-center p-2 bg-secondary/10 rounded-md">
                      <div className="text-lg font-medium text-purple-light">
                        {periodData.resourcesData.resourceUsageTrend[periodData.resourcesData.resourceUsageTrend.length - 1].vistas}
                      </div>
                      <div className="text-xs text-muted-foreground">Vistas</div>
                    </div>
                    
                    <div className="text-center p-2 bg-secondary/10 rounded-md">
                      <div className="text-lg font-medium text-purple-light">
                        {periodData.resourcesData.resourceUsageTrend[periodData.resourcesData.resourceUsageTrend.length - 1].descargas}
                      </div>
                      <div className="text-xs text-muted-foreground">Descargas</div>
                    </div>
                    
                    <div className="text-center p-2 bg-secondary/10 rounded-md">
                      <div className="text-lg font-medium text-purple-light">
                        {periodData.resourcesData.resourceUsageTrend[periodData.resourcesData.resourceUsageTrend.length - 1].copias}
                      </div>
                      <div className="text-xs text-muted-foreground">Copias</div>
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm" className="mt-6 w-full">
                    Ver Detalles <ArrowRight size={14} className="ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Footer Info */}
      <div className="mt-8 text-center text-xs text-muted-foreground">
        <p>Última actualización: 20 de Junio, 2025 • Findasense Consulting Dashboard</p>
      </div>
    </div>
  );
};

export default Dashboard;
