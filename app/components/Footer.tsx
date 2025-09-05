// components/Footer.tsx

// Re-using the same Logo component from the Header for consistency
const Logo = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 2.00001C12.8337 5.21601 9.40371 10.664 16 16C22.5963 21.336 27.1663 26.784 16 30" stroke="rgb(var(--secondary))" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 2.00001C19.1663 5.21601 22.596 10.664 16 16C9.404 21.336 4.834 26.784 16 30" stroke="rgb(var(--primary))" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.7"/>
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-[rgb(var(--accent))] border-t border-[rgb(var(--primary))]/10">
      <div className="container-padded py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5 lg:col-span-6">
            <div className="flex items-center gap-2">
              <Logo />
              <span className="font-lora text-lg font-medium text-[rgb(var(--text-primary))]">
                Sabio al Vivir
              </span>
            </div>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-[rgb(var(--text-muted))]">
              Apoyo humano y herramientas prácticas para una vida con mayor claridad, calma y propósito. Lenguaje sencillo y respeto por tu proceso.
            </p>
          </div>

          {/* Now only two columns: Menú + Contacto (Recursos removed) */}
          <div className="md:col-span-7 lg:col-span-6 grid grid-cols-2 gap-8 sm:grid-cols-2">
            <nav aria-label="Navegación" className="flex flex-col gap-3">
              <h3 className="font-semibold text-sm text-[rgb(var(--text-primary))]">Menú</h3>
              <a href="/" className="text-sm text-[rgb(var(--text-muted))] transition-colors hover:text-[rgb(var(--text-primary))]">Inicio</a>
              <a href="/sobre-lidia" className="text-sm text-[rgb(var(--text-muted))] transition-colors hover:text-[rgb(var(--text-primary))]">Sobre Lidia</a>
              <a href="/servicios" className="text-sm text-[rgb(var(--text-muted))] transition-colors hover:text-[rgb(var(--text-primary))]">Servicios</a>
              <a href="/testimonios" className="text-sm text-[rgb(var(--text-muted))] transition-colors hover:text-[rgb(var(--text-primary))]">Testimonios</a>
            </nav>

            {/* This column replaces the old "Recursos" with "Contacto" */}
            <div>
              <h3 className="font-semibold text-sm text-[rgb(var(--text-primary))]">Contacto</h3>
              <ul className="mt-3 space-y-2 text-sm text-[rgb(var(--text-muted))]">
                <li>
                  <a href="mailto:contacto@sabioalvivir.com" className="transition-colors hover:text-[rgb(var(--text-primary))]">
                    contacto@sabioalvivir.com
                  </a>
                </li>
                <li>
                  <a href="tel:+18090000000" className="transition-colors hover:text-[rgb(var(--text-primary))]">
                    +1 (829) 586-9514
                  </a>
                </li>
                <li className="pt-1">República Dominicana</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-[rgb(var(--primary))]/10 pt-8 text-sm text-[rgb(var(--text-muted))] md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Sabio al Vivir. Todos los derechos reservados.</p>

          {/* Add "Preguntas Frecuentes" next to Política de privacidad, same gap */}
          <div className="flex gap-4">
            <a href="/politica-de-privacidad" className="transition-colors hover:text-[rgb(var(--text-primary))]">Política de privacidad</a>
            <a href="/preguntas-frecuentes" className="transition-colors hover:text-[rgb(var(--text-primary))]">Preguntas Frecuentes</a>
            <a href="/terminos-de-uso" className="transition-colors hover:text-[rgb(var(--text-primary))]">Términos de uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
