export function Footer() {
  return (
    <footer className="py-16 md:py-20 bg-brand-charcoal">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col items-center text-center">
          <span className="font-heading text-3xl font-black text-brand-cream tracking-tight">
            EG<span className="text-brand-terracotta">.</span>
          </span>
          <p className="mt-4 font-body text-brand-warmGray text-sm max-w-xs leading-relaxed">
            Movement, connection, and the art of listening through the body.
          </p>

          <div className="mt-8 h-[1px] w-12 bg-gradient-to-r from-transparent via-brand-warmGray/30 to-transparent" />

          <div className="mt-8 flex gap-8">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-[13px] uppercase tracking-[0.15em] text-brand-warmGray hover:text-brand-terracottaLight transition-colors duration-300"
            >
              Instagram
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-[13px] uppercase tracking-[0.15em] text-brand-warmGray hover:text-brand-terracottaLight transition-colors duration-300"
            >
              Facebook
            </a>
            <a
              href="mailto:hello@elisaghion.com"
              className="font-body text-[13px] uppercase tracking-[0.15em] text-brand-warmGray hover:text-brand-terracottaLight transition-colors duration-300"
            >
              Contact
            </a>
          </div>

          <p className="mt-10 font-body text-[11px] text-brand-warmGray/50 tracking-wider">
            &copy; {new Date().getFullYear()} Elisa Ghion
          </p>
        </div>
      </div>
    </footer>
  );
}
