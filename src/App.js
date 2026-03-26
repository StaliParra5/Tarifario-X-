import React, { useState, useEffect } from 'react';
import { 
  Terminal, DollarSign, AlertTriangle, Database, 
  Bot, BarChart3, ShieldAlert, Cpu, Search, 
  Settings, MessageSquare, Zap, ChevronRight, Menu, X 
} from 'lucide-react';

// --- DATA: Resumen estructurado del documento ---
const SECTIONS = [
  {
    id: 1,
    icon: <Terminal className="w-5 h-5" />,
    title: "1. Evolución del Paradigma API",
    content: (
      <div className="space-y-4 text-slate-300">
        <p>La arquitectura de automatización en X ha transitado de un modelo gratuito y permisivo a un modelo <strong>Pay-As-You-Go (Pago por Uso)</strong> estricto a partir de febrero de 2026.</p>
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
          <h4 className="text-white font-semibold mb-2">Cambios Clave:</h4>
          <ul className="list-disc pl-5 space-y-2">
            <li>Eliminación de los niveles fijos heredados ($200 Básico / $5,000 Pro).</li>
            <li>Adopción de infraestructura similar a AWS/GCP, donde cada HTTP Request consume créditos fraccionarios en USD.</li>
            <li>Comprender esta granularidad es ahora un <strong>requisito fundamental</strong> para la viabilidad financiera en n8n.</li>
          </ul>
        </div>
      </div>
    )
  },
  {
    id: 2,
    icon: <BarChart3 className="w-5 h-5" />,
    title: "2. Consola del Desarrollador",
    content: (
      <div className="space-y-4 text-slate-300">
        <p>La interfaz de usuario certifica la migración al modelo <code>pay-per-use</code>. El control del saldo es crítico.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="bg-red-900/20 border border-red-500/30 p-4 rounded-lg">
            <h4 className="text-red-400 font-semibold mb-1 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4"/> Saldo Cero ($0.00)
            </h4>
            <p className="text-sm">Resulta en la interrupción inmediata del servicio. n8n recibirá errores HTTP 400 (Falta de cuota), deteniendo la ejecución.</p>
          </div>
          <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
            <h4 className="text-blue-400 font-semibold mb-1 flex items-center gap-2">
              <Zap className="w-4 h-4"/> Auto-Top-Up
            </h4>
            <p className="text-sm">Función recomendada para evitar fallos silenciosos en picos de tráfico. Permite la recarga automática de créditos.</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 3,
    icon: <DollarSign className="w-5 h-5" />,
    title: "3. Costo por Tweet (Escrituras)",
    content: (
      <div className="space-y-4 text-slate-300">
        <p>El núcleo financiero de la publicación en n8n mediante <code>POST /2/tweets</code>.</p>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center bg-slate-800 p-3 rounded border border-slate-700">
            <span>Publicación Base (1 Tweet)</span>
            <span className="text-green-400 font-mono text-lg">$0.010 USD</span>
          </div>
          <div className="flex justify-between items-center bg-slate-800 p-3 rounded border border-slate-700">
            <span>Hilo de 5 Tweets (5 x $0.010)</span>
            <span className="text-green-400 font-mono text-lg">$0.050 USD</span>
          </div>
        </div>
        <p className="text-sm mt-4 text-slate-400 bg-slate-800/50 p-3 rounded">
          * La carga multimedia (media_upload) puede absorber costos de ancho de banda, pero la llamada final de creación mantiene su costo nominal inalterable. Más económico que el nivel Básico ($200) si se publican menos de 20,000 tweets/mes.
        </p>
      </div>
    )
  },
  {
    id: 4,
    icon: <Search className="w-5 h-5" />,
    title: "4. Economía de Lecturas",
    content: (
      <div className="space-y-4 text-slate-300">
        <p>La recuperación de datos penaliza monetariamente el consumo de información, un riesgo sustancial para bucles de <em>polling</em> en n8n.</p>
        <ul className="space-y-3">
          <li className="flex gap-4 items-start">
            <div className="bg-slate-800 p-2 rounded text-blue-400 font-mono">$0.005</div>
            <div><strong>Por cada tweet recuperado</strong>. Si n8n busca cada 5 min y trae 10 tweets = $0.05 por ejecución ($14.40/día).</div>
          </li>
          <li className="flex gap-4 items-start">
            <div className="bg-slate-800 p-2 rounded text-blue-400 font-mono">$0.010</div>
            <div><strong>User Lookup</strong>. Verificación de metadatos de perfil para filtrar spam.</div>
          </li>
        </ul>
        <div className="bg-yellow-900/20 border border-yellow-500/30 p-3 rounded-lg mt-4">
          <span className="text-yellow-400 font-bold">Nota de Deduplicación:</span> X implementa una ventana de 24h (reinicio a las 00:00 UTC) donde no cobra lecturas duplicadas, pero la documentación advierte que "no es una garantía completa".
        </div>
      </div>
    )
  },
  {
    id: 5,
    icon: <ShieldAlert className="w-5 h-5" />,
    title: "5. 'Operation Kill the Bots'",
    content: (
      <div className="space-y-4 text-slate-300">
        <p>En febrero de 2026, X implementó una restricción severa bloqueando retweets y respuestas programáticas <strong>no solicitadas</strong>.</p>
        <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-red-500">
          <h4 className="text-white font-semibold">Error 403 Forbidden Constante</h4>
          <p className="text-sm mt-2">Cualquier interacción en frío (cold reply) a cuentas que no hayan mencionado al bot previamente será bloqueada. Aunque no deduce créditos (solo se cobran solicitudes 200 OK), colapsa el flujo en n8n.</p>
        </div>
        <p className="text-sm mt-2">Casos permitidos ($0.010 USD): Hilos propios o respuestas a usuarios que han etiquetado (@mention) a la marca (Atención al cliente).</p>
      </div>
    )
  },
  {
    id: 6,
    icon: <MessageSquare className="w-5 h-5" />,
    title: "6. Resumen de Costos (Tabla)",
    content: (
      <div className="space-y-4 text-slate-300 overflow-x-auto">
        <p>Topología del consumo de créditos para operaciones de integración n8n:</p>
        <table className="min-w-full text-left text-sm border-collapse">
          <thead>
            <tr className="bg-slate-800 border-b border-slate-700">
              <th className="p-3">Operación n8n</th>
              <th className="p-3">Endpoint API</th>
              <th className="p-3">Costo (USD)</th>
              <th className="p-3">Restricción 2026</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            <tr>
              <td className="p-3">Crear Tweet</td>
              <td className="p-3 font-mono text-xs">POST /2/tweets</td>
              <td className="p-3 text-green-400">$0.010 / éxito</td>
              <td className="p-3 text-xs">Límites de volumen estándar</td>
            </tr>
            <tr>
              <td className="p-3">Lectura/Búsqueda</td>
              <td className="p-3 font-mono text-xs">GET /2/tweets/search</td>
              <td className="p-3 text-green-400">$0.005 / tweet</td>
              <td className="p-3 text-xs">Deduplicación de 24h aplicable</td>
            </tr>
            <tr>
              <td className="p-3">User Lookup</td>
              <td className="p-3 font-mono text-xs">GET /2/users/</td>
              <td className="p-3 text-green-400">$0.010 / perfil</td>
              <td className="p-3 text-xs">Uso vital para filtros</td>
            </tr>
            <tr>
              <td className="p-3">RT / Respuesta</td>
              <td className="p-3 font-mono text-xs">POST /2/users/:id/retweets</td>
              <td className="p-3 text-green-400">$0.010 / éxito</td>
              <td className="p-3 text-red-400 text-xs">Bloqueo 403 a interacciones en frío</td>
            </tr>
            <tr>
              <td className="p-3">Mensaje Directo</td>
              <td className="p-3 font-mono text-xs">POST /2/dm_events</td>
              <td className="p-3 text-yellow-400">Premium Var.</td>
              <td className="p-3 text-xs">Requiere opt-in o following previo</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  },
  {
    id: 9,
    icon: <Cpu className="w-5 h-5" />,
    title: "9. Sinergias xAI (Cashback)",
    content: (
      <div className="space-y-4 text-slate-300">
        <p>Integración de plataformas: El gasto en la API de X genera créditos gratuitos para modelos Grok (xAI).</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center">
          <div className="bg-slate-800 p-3 rounded border border-slate-700">
            <div className="text-xs text-slate-400 mb-1">$0 - $199</div>
            <div className="text-xl font-bold text-white">0%</div>
          </div>
          <div className="bg-slate-800 p-3 rounded border border-slate-700">
            <div className="text-xs text-slate-400 mb-1">$200 - $499</div>
            <div className="text-xl font-bold text-blue-400">10%</div>
          </div>
          <div className="bg-slate-800 p-3 rounded border border-slate-700">
            <div className="text-xs text-slate-400 mb-1">$500 - $999</div>
            <div className="text-xl font-bold text-blue-400">15%</div>
          </div>
          <div className="bg-slate-800 p-3 rounded border border-slate-700 border-b-2 border-b-green-500">
            <div className="text-xs text-slate-400 mb-1">$1,000+</div>
            <div className="text-xl font-bold text-green-400">20%</div>
          </div>
        </div>
        <p className="text-sm">Esto subsidia completamente el costo de inferencia LLM (Grok-4.1-Fast a $0.20/1M tokens) frente a alternativas como OpenAI o Anthropic.</p>
      </div>
    )
  },
  {
    id: 11,
    icon: <Database className="w-5 h-5" />,
    title: "11. Mitigación: Caché y Bases de Datos",
    content: (
      <div className="space-y-4 text-slate-300">
        <p>El estándar de oro arquitectónico en n8n para flujos de escucha social (Social Listening).</p>
        <ol className="list-decimal pl-5 space-y-2 text-sm bg-slate-800/50 p-4 rounded">
          <li>El nodo aísla el <code>Tweet ID</code> (ej. 123456789).</li>
          <li>Búsqueda local (MongoDB/Postgres/Supabase) para verificar si ya fue procesado.</li>
          <li><strong>Si existe:</strong> El flujo se detiene (ahorra CPU y API calls).</li>
          <li><strong>Si es nuevo:</strong> Procesa con IA, publica ($0.010) y guarda el ID en la BD para cuarentena temporal.</li>
        </ol>
      </div>
    )
  },
  {
    id: 13,
    icon: <AlertTriangle className="w-5 h-5" />,
    title: "13. Manejo de Errores y Fugas",
    content: (
      <div className="space-y-4 text-slate-300">
        <p>Prevención de "Credit Leaks" (Fugas de capital) en n8n bajo modelos dinámicos.</p>
        <div className="space-y-2">
          <p className="text-sm">Reintentos infinitos ante errores <strong>403 Forbidden</strong> o <strong>429 Too Many Requests</strong> resultan en suspensión total de la API.</p>
          <div className="bg-slate-800 p-3 rounded border border-slate-700">
            <strong>Arquitectura Recomendada:</strong>
            <p className="text-sm mt-1 text-slate-400">Vincular nodos secundarios (Catch Error Node) a canales audibles externos (Slack/Telegram) para forzar intervención manual, en lugar de permitir bucles ciegos incesantes.</p>
          </div>
        </div>
      </div>
    )
  }
];

// --- COMPONENTE CALCULADORA (Para sección 14) ---
const InteractiveCalculator = () => {
  const [tweetsPerDay, setTweetsPerDay] = useState(10);
  const [readsPerDay, setReadsPerDay] = useState(100);

  const daysInMonth = 30;
  const costPerTweet = 0.010;
  const costPerRead = 0.005;

  const monthlyTweetCost = tweetsPerDay * costPerTweet * daysInMonth;
  const monthlyReadCost = readsPerDay * costPerRead * daysInMonth;
  const totalMonthlyCost = monthlyTweetCost + monthlyReadCost;

  let cashbackPercent = 0;
  if (totalMonthlyCost >= 1000) cashbackPercent = 0.20;
  else if (totalMonthlyCost >= 500) cashbackPercent = 0.15;
  else if (totalMonthlyCost >= 200) cashbackPercent = 0.10;

  const cashbackAmount = totalMonthlyCost * cashbackPercent;
  // Grok token estimate: $0.20 per 1M input / $0.50 per 1M output. Let's average to $0.35 per 1M tokens.
  const freeTokensM = cashbackAmount > 0 ? (cashbackAmount / 0.35).toFixed(1) : 0;

  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-xl mt-6">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <BarChart3 className="text-blue-400" /> Simulador de Escenarios (Proyección)
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-slate-400 mb-1">Tweets Escritos por Día</label>
            <input 
              type="range" min="0" max="5000" step="10" 
              value={tweetsPerDay} onChange={(e) => setTweetsPerDay(Number(e.target.value))}
              className="w-full accent-blue-500"
            />
            <div className="text-right text-white font-mono">{tweetsPerDay.toLocaleString()} tweets</div>
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">Lecturas (Búsquedas) por Día</label>
            <input 
              type="range" min="0" max="20000" step="100" 
              value={readsPerDay} onChange={(e) => setReadsPerDay(Number(e.target.value))}
              className="w-full accent-green-500"
            />
            <div className="text-right text-white font-mono">{readsPerDay.toLocaleString()} búsquedas</div>
          </div>
        </div>

        <div className="bg-slate-900 p-4 rounded-lg flex flex-col justify-center space-y-4">
          <div className="flex justify-between items-end border-b border-slate-700 pb-2">
            <span className="text-slate-400">Costo Mensual Proyectado</span>
            <span className="text-3xl font-bold text-white">${totalMonthlyCost.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-400">Cashback xAI ({cashbackPercent * 100}%)</span>
            <span className="text-lg font-bold text-green-400">+ ${cashbackAmount.toFixed(2)}</span>
          </div>

          <div className="bg-blue-900/30 p-3 rounded border border-blue-500/30 text-sm">
            <span className="block text-blue-300 font-semibold mb-1">Impacto Computacional:</span>
            Subsidio equivale a procesar aprox. <strong>{freeTokensM} Millones de tokens</strong> en Grok gratis.
          </div>
        </div>
      </div>
    </div>
  );
};


// --- COMPONENTE PRINCIPAL ---
export default function App() {
  const [activeSection, setActiveSection] = useState(SECTIONS[0].id);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Cerrar menú móvil al cambiar de sección
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [activeSection]);

  const currentData = SECTIONS.find(s => s.id === activeSection);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-slate-200 font-sans selection:bg-blue-500/30">
      {/* Header Móvil */}
      <div className="md:hidden flex items-center justify-between bg-[#111] p-4 border-b border-slate-800 sticky top-0 z-20">
        <div className="font-bold text-white text-lg flex items-center gap-2">
          <Settings className="w-5 h-5 text-blue-500"/> X-API n8n
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-400">
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      <div className="flex flex-col md:flex-row min-h-screen relative">
        
        {/* Sidebar */}
        <aside className={`
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 transition-transform duration-300 ease-in-out
          fixed md:sticky top-0 left-0 h-screen w-72 bg-[#111] border-r border-slate-800 z-10 flex flex-col
        `}>
          <div className="p-6 hidden md:block">
            <h1 className="text-xl font-bold text-white flex items-center gap-2 leading-tight">
              <Settings className="w-6 h-6 text-blue-500"/>
              Arquitectura X-API
            </h1>
            <p className="text-xs text-slate-500 mt-2">Documentación Analítica n8n v2026</p>
          </div>
          
          <nav className="flex-1 overflow-y-auto px-4 pb-6 space-y-1 mt-4 md:mt-0">
            {SECTIONS.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full text-left flex items-center gap-3 px-3 py-3 rounded-lg text-sm transition-all duration-200
                  ${activeSection === section.id 
                    ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20 shadow-inner' 
                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 border border-transparent'}
                `}
              >
                <div className={`${activeSection === section.id ? 'text-blue-500' : 'text-slate-500'}`}>
                  {section.icon}
                </div>
                <span className="font-medium truncate leading-tight">{section.title}</span>
                {activeSection === section.id && <ChevronRight className="w-4 h-4 ml-auto opacity-50" />}
              </button>
            ))}
            
            <button
                onClick={() => setActiveSection(14)}
                className={`w-full text-left flex items-center gap-3 px-3 py-3 rounded-lg text-sm transition-all duration-200 mt-4 border-t border-slate-800
                  ${activeSection === 14 
                    ? 'bg-green-600/10 text-green-400 border border-green-500/20' 
                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'}
                `}
              >
                <BarChart3 className={activeSection === 14 ? 'text-green-500' : 'text-slate-500'} />
                <span className="font-medium">14. Modelado y Simulador</span>
            </button>
          </nav>
        </aside>

        {/* Contenido Principal */}
        <main className="flex-1 p-6 md:p-12 lg:p-16 max-w-5xl overflow-y-auto bg-gradient-to-br from-[#0a0a0a] to-[#0f1218]">
          
          {activeSection !== 14 ? (
            <div className="animate-fadeIn">
              <div className="mb-8">
                <span className="text-blue-500 text-sm font-bold tracking-wider uppercase mb-2 block">Sección {currentData.id}</span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
                  {currentData.title.split('. ')[1]}
                </h2>
                <div className="h-1 w-20 bg-blue-600 rounded mt-6 opacity-50"></div>
              </div>
              
              <div className="prose prose-invert prose-slate max-w-none text-lg leading-relaxed">
                {currentData.content}
              </div>
            </div>
          ) : (
            <div className="animate-fadeIn">
              <div className="mb-8">
                <span className="text-green-500 text-sm font-bold tracking-wider uppercase mb-2 block">Sección 14</span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
                  Modelado Matemático de Escenarios
                </h2>
                <div className="h-1 w-20 bg-green-600 rounded mt-6 opacity-50"></div>
              </div>
              
              <div className="space-y-6 text-slate-300 text-lg leading-relaxed">
                <p>
                  Para comprender el impacto económico subyacente de operar un agente en n8n bajo la arquitectura Pay-Per-Use, es necesario modelar escenarios. 
                  A diferencia de estructuras anteriores, cada ineficiencia en el código (ej. bucles redundantes, ausencia de bases de datos caché) se traduce directamente en un <strong>sangrado financiero continuo</strong>.
                </p>
                <InteractiveCalculator />
                
                <div className="bg-slate-800/30 border-l-4 border-slate-600 p-4 mt-8 rounded-r">
                  <p className="text-sm text-slate-400">
                    <em>Conclusión de Integración:</em> La API de X exige ahora una ingeniería rigurosa. Prácticas que antes eran opciones de optimización (deduplicación por bases de datos, webhooks, manejo asíncrono profundo y scraping paralelo delegado), son hoy barreras de viabilidad comercial absolutas.
                  </p>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
      
      {/* Estilos para animación */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
      `}} />
    </div>
  );
}
