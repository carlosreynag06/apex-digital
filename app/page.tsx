// app/page.tsx
"use client";

import { useState } from "react";
import MotionWrapper from "@/components/MotionWrapper"; // Assuming MotionWrapper is in this path

// Helper component for the FAQ chevron icon
const ChevronIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5 transition-transform duration-300 group-open:rotate-180"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

// New SVG Icons for the Process section
const ChatIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[rgb(var(--primary))]"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" x2="12" y1="15" y2="3"></line></svg>
);

const PlanIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[rgb(var(--primary))]"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><line x1="10" y1="9" x2="8" y2="9"></line></svg>
);

const HandshakeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[rgb(var(--primary))]"><path d="M12 11V3"></path><path d="M18 11V3"></path><path d="M12 11a4 4 0 0 1 0 8c-2.478 0-4.041 1.258-4 4"></path><path d="M18 11a4 4 0 0 1 0 8c2.478 0 4.041 1.258 4 4"></path><path d="M6 11V3"></path></svg>
);

// Narrow the state to valid service keys
type ServiceKey = "personal" | "pareja" | "talleres";

export default function Home() {
  const [activeService, setActiveService] = useState<ServiceKey>("personal");

  const services = {
    personal: {
      title: "Sesiones Personales",
      description: "Conversaciones privadas para organizar ideas, reducir el ruido y diseñar próximos pasos realistas.",
      items: ["Claridad en decisiones importantes", "Herramientas de manejo del estrés", "Planes sencillos y sostenibles"],
    },
    pareja: {
      title: "Terapia de Pareja",
      description: "Herramientas prácticas para mejorar la comunicación y construir acuerdos saludables en la relación.",
      items: ["Comunicación empática y escucha activa", "Manejo de conflictos y negociación", "Reconexión emocional y confianza"],
    },
    talleres: {
      title: "Talleres y Charlas",
      description: "Actividades prácticas para equipos y grupos, con ejemplos de la vida real para un bienestar colectivo.",
      items: ["Bienestar y hábitos saludables", "Comunicación con empatía", "Trabajo con propósito"],
    },
  };

  const processSteps = [
    { icon: <ChatIcon />, title: "Primera conversación", description: "Hablamos de lo que te trae aquí y vemos si este espacio es adecuado para ti." },
    { icon: <PlanIcon />, title: "Plan terapéutico", description: "Si decidimos continuar, trazaremos juntos un plan con objetivos claros y flexibles." },
    { icon: <HandshakeIcon />, title: "Sesiones de seguimiento", description: "Nos reuniremos semanal o quincenalmente, online o presencial según te convenga." },
  ];

  const faqs = [
    { q: "¿Las sesiones garantizan resultados?", a: "No ofrecemos garantías. Cada proceso es personal. Compartimos herramientas y apoyo para que avances a tu ritmo." },
    { q: "¿Puedo cancelar o reprogramar?", a: "Sí, con aviso previo razonable. Buscamos que el espacio funcione para ti." },
    { q: "¿Atienden fuera de República Dominicana?", a: "Sí, atendemos de forma virtual y ajustamos horarios cuando sea posible." },
    { q: "¿Cómo es la primera conversación?", a: "Es una charla breve para entender tu situación y acordar próximos pasos realistas." },
  ];

  return (
    <>
      <main className="overflow-hidden">
        {/* ============= HERO SECTION: Your First Breath of Calm ============= */}
        <section
          id="inicio"
          className="relative flex items-center justify-center min-h-screen pt-[var(--header-height-mobile)] md:pt-[var(--header-height-desktop)]"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(80%_60%_at_50%_0%,rgba(245,206,199,0.3)_0%,transparent_70%)]"
          />
          {/* Correction: Added bottom padding to raise content block for better visual centering */}
          <div className="container-padded relative z-10 text-center pb-16 md:pb-20">
            <div className="mx-auto max-w-3xl space-y-6 md:space-y-8">
              <MotionWrapper delay={0}>
                <span className="inline-flex items-center rounded-full border border-black/10 bg-white/60 px-3 py-1 text-xs text-[rgb(var(--text-muted))] shadow-sm backdrop-blur-sm">
                  Bienvenido a <strong className="ml-1 text-[rgb(var(--text-primary))]">Sabio al Vivir</strong>
                </span>
              </MotionWrapper>

              <MotionWrapper delay={0.1}>
                <h1 className="h1">
                  Vive con <span className="text-[rgb(var(--primary))]">claridad</span>,
                  <br />
                  <span className="text-[rgb(var(--secondary))] font-medium">calma</span> y propósito
                </h1>
              </MotionWrapper>

              <MotionWrapper delay={0.2}>
                <p className="lead max-w-2xl mx-auto">
                  Apoyo profesional y recursos prácticos para avanzar a tu ritmo. Un enfoque humano, accesible y realista para tu bienestar
                </p>
              </MotionWrapper>

              <MotionWrapper delay={0.3}>
                <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                  <a href="/contacto" className="inline-block rounded-full bg-[rgb(var(--primary))] px-8 py-3 font-medium text-white shadow-md transition-all duration-300 hover:scale-[1.03] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--primary))] focus-visible:ring-offset-2">
                    Agendar conversación
                  </a>
                  <a href="/servicios" className="inline-block rounded-full border border-[rgb(var(--primary))] bg-transparent px-8 py-3 font-medium text-[rgb(var(--primary))] transition-colors hover:bg-[rgb(var(--accent))]">
                    Conocer servicios
                  </a>
                </div>
              </MotionWrapper>
            </div>
          </div>
        </section>

        {/* ============= SOBRE SECTION: From Overwhelm to Understanding ============= */}
        <section id="sobre" className="py-20 md:py-32 bg-[rgb(var(--accent))]">
          <div className="container-padded">
            {/* Correction: Section header is now centered on top */}
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="h2 text-[rgb(var(--text-primary))]">
                A veces, el paso más valiente <br />
                <span className="text-[rgb(var(--primary))]">es simplemente pedir ayuda</span>

              </h2>
              <p className="lead mt-4">
                No tienes que luchar solo. Soy la Licda. Lidia González y te ofrezco un apoyo profesional y completamente confidencial para ayudarte a navegar los desafíos de la vida.
              </p>
            </div>

            {/* Correction: Grid starts after the header, creating the two-column layout below */}
            <div className="mt-16 grid items-center gap-12 md:grid-cols-2 md:gap-16">
              {/* Correction: Increased vertical space between boxes to space-y-6 */}
              <div className="space-y-6"> 
                <MotionWrapper delay={0.1}>
                  <p className="flex items-center rounded-2xl bg-white/70 p-4 min-h-[64px] text-[rgb(var(--text-primary))] shadow-sm">
                    ¿Te sientes triste y vacío?
                  </p>
                </MotionWrapper>
                <MotionWrapper delay={0.15}>
                  <p className="flex items-center rounded-2xl bg-white/70 p-4 min-h-[64px] text-[rgb(var(--text-primary))] shadow-sm">
                    ¿Sientes que tu relación de pareja no va bien?
                  </p>
                </MotionWrapper>
                <MotionWrapper delay={0.2}>
                  <p className="flex items-center rounded-2xl bg-white/70 p-4 min-h-[64px] text-[rgb(var(--text-primary))] shadow-sm">
                    ¿Perdiste a un ser querido y no sabes cómo seguir?
                  </p>
                </MotionWrapper>
              </div>
              <MotionWrapper delay={0.3}>
                <div className="relative rounded-3xl bg-white p-8 md:p-10 shadow-lg">
                  <h2 className="h2">Un refugio para tus emociones</h2>
                  <div className="mt-4 space-y-4 text-[rgb(var(--text-muted))]">
                    <p>La terapia es un acto de amor propio. Buscar apoyo no es una señal de debilidad, sino de inmensa fortaleza.</p>
                    <p>Es darte el permiso de parar, de entenderte mejor y de adquirir herramientas para vivir de una manera más plena y consciente.</p>
                  </div>
                  <div className="mt-8">
                    <a href="/contacto" className="inline-block rounded-full bg-[rgb(var(--primary))] px-8 py-3 font-medium text-white shadow-md transition-all duration-300 hover:scale-[1.03] hover:shadow-lg">
                      Comienza tu camino
                    </a>
                  </div>
                </div>
              </MotionWrapper>
            </div>
          </div>
        </section>

        {/* ============= SERVICIOS SECTION: Your Path to Well-being ============= */}
        <section id="servicios" className="py-20 md:py-32">
          <div className="container-padded">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="h2">Cómo podemos ayudarte</h2>
              <p className="lead mt-4">Opciones flexibles según tus necesidades. Todo en lenguaje sencillo y aplicable.</p>
            </div>
            
            <div className="mt-12">
              <div className="flex flex-wrap justify-center gap-2 md:gap-4 border-b border-black/10 pb-4">
                <button onClick={() => setActiveService('personal')} className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${activeService === 'personal' ? 'bg-[rgb(var(--primary))] text-white' : 'text-[rgb(var(--text-muted))] hover:bg-[rgb(var(--accent))]'}`}>Sesiones Personales</button>
                <button onClick={() => setActiveService('pareja')} className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${activeService === 'pareja' ? 'bg-[rgb(var(--primary))] text-white' : 'text-[rgb(var(--text-muted))] hover:bg-[rgb(var(--accent))]'}`}>Terapia de Pareja</button>
                <button onClick={() => setActiveService('talleres')} className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${activeService === 'talleres' ? 'bg-[rgb(var(--primary))] text-white' : 'text-[rgb(var(--text-muted))] hover:bg-[rgb(var(--accent))]'}`}>Talleres y Charlas</button>
              </div>
              
              <div className="mt-8 mx-auto max-w-2xl rounded-3xl bg-[rgb(var(--accent))] p-8 text-center min-h=[280px]">
                <h3 className="text-xl font-semibold text-[rgb(var(--text-primary))]">{services[activeService].title}</h3>
                <p className="mt-2 text-sm text-[rgb(var(--text-muted))]">{services[activeService].description}</p>
                <ul className="mt-6 space-y-2 text-sm text-left inline-block">
                  {services[activeService].items.map(item => (
                    <li key={item} className="flex items-center gap-3">
                      <svg className="h-4 w-4 flex-shrink-0 text-[rgb(var(--primary))]" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                      <span className="text-[rgb(var(--text-primary))]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ============= PROCESO SECTION: Our Journey Together ============= */}
        <section id="proceso" className="py-20 md:py-32 bg-[rgb(var(--accent))]">
          <div className="container-padded">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="h2">Nuestro viaje juntos, paso a paso</h2>
              <p className="lead mt-4">Un proceso claro y humano, diseñado para que te sientas en confianza desde el primer día.</p>
            </div>
            <div className="relative mt-16">
              <div aria-hidden="true" className="absolute left-1/2 top-0 -ml-px h-full w-0.5 bg-[rgb(var(--primary))] opacity-20"></div>
              {processSteps.map((step, index) => (
                <MotionWrapper key={index} className={`relative mb-12 flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="rounded-2xl bg-white p-6 shadow-md">
                      <div className="mb-2 flex justify-center items-center h-10 w-10 rounded-full bg-white shadow-inner">{step.icon}</div>
                      <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
                      <p className="mt-1 text-sm text-[rgb(var(--text-muted))]">{step.description}</p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                    <div className="h-4 w-4 rounded-full bg-[rgb(var(--primary))] ring-8 ring-[rgb(var(--accent))]"></div>
                  </div>
                </MotionWrapper>
              ))}
            </div>
            <div className="mt-8 text-center">
                <a href="/contacto" className="inline-block rounded-full bg-[rgb(var(--primary))] px-8 py-3 font-medium text-white shadow-md transition-all duration-300 hover:scale-[1.03] hover:shadow-lg">
                  Agenda tu primera cita
                </a>
            </div>
          </div>
        </section>

        {/* ============= FAQ SECTION: Clarity and Confidence ============= */}
        <section className="py-20 md:py-32">
          <div className="container-padded">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="h2">Preguntas frecuentes</h2>
            </div>
            <div className="mx-auto mt-12 max-w-3xl space-y-4">
              {faqs.map((faq) => (
                <details key={faq.q} className="group rounded-2xl bg-white/50 p-6 transition-colors hover:bg-[rgb(var(--accent))]">
                  <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-[rgb(var(--text-primary))]">
                    {faq.q}
                    <ChevronIcon />
                  </summary>
                  <p className="mt-4 text-sm text-[rgb(var(--text-muted))]">{faq.a}</p>
                </details>
              ))}
            </div>
             <div className="mt-12 text-center">
                <a href="/contacto" className="inline-block rounded-full border border-[rgb(var(--primary))] bg-transparent px-8 py-3 font-medium text-[rgb(var(--primary))] transition-colors hover:bg-[rgb(var(--accent))]">
                  ¿Tienes otra duda? Contáctame
                </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
