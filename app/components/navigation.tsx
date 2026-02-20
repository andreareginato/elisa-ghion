import { useRef, useState } from "react";
import { useLocation, Link } from "react-router";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Workshops", href: "/workshops" },
  { label: "Collaborations", href: "#collaborations" },
];

export function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useGSAP(
    () => {
      const hero = document.querySelector("#hero");
      if (!hero) {
        // On sub-pages, show opaque nav immediately
        if (navRef.current) {
          navRef.current.style.backgroundColor = "rgba(251, 246, 240, 0.97)";
          navRef.current.style.backdropFilter = "blur(16px)";
          navRef.current.style.boxShadow = "0 1px 0 rgba(0,0,0,0.04)";
        }
        return;
      }

      ScrollTrigger.create({
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        onUpdate: (self) => {
          if (navRef.current) {
            const p = self.progress;
            const opacity = Math.min(p * 2.5, 0.97);
            navRef.current.style.backgroundColor = `rgba(251, 246, 240, ${opacity})`;
            navRef.current.style.backdropFilter =
              p > 0.03 ? "blur(16px)" : "none";
            navRef.current.style.boxShadow =
              p > 0.1 ? "0 1px 0 rgba(0,0,0,0.04)" : "none";
          }
        },
      });
    },
    { scope: navRef, dependencies: [isHome] }
  );

  const handleHashClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const target = document.querySelector(href);
    target?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const linkClassName =
    "relative font-body text-[13px] uppercase tracking-[0.2em] text-brand-charcoalLight hover:text-brand-terracotta transition-colors duration-300 after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1.5px] after:bg-brand-terracotta hover:after:w-full after:transition-all after:duration-300";

  const mobileLinkClassName =
    "font-body text-[13px] uppercase tracking-[0.2em] text-brand-charcoalLight hover:text-brand-terracotta transition-colors";

  const renderNavLink = (link: { label: string; href: string }, mobile = false) => {
    const cls = mobile ? mobileLinkClassName : linkClassName;
    const isHash = link.href.startsWith("#");

    if (isHash) {
      if (isHome) {
        return (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => handleHashClick(e, link.href)}
            className={cls}
          >
            {link.label}
          </a>
        );
      }
      return (
        <Link
          key={link.href}
          to={`/${link.href}`}
          className={cls}
          onClick={() => setMenuOpen(false)}
        >
          {link.label}
        </Link>
      );
    }

    return (
      <Link
        key={link.href}
        to={link.href}
        className={cls}
        onClick={() => setMenuOpen(false)}
      >
        {link.label}
      </Link>
    );
  };

  const logoElement = isHome ? (
    <a
      href="#hero"
      onClick={(e) => handleClick(e, "#hero")}
      className="font-heading text-2xl font-black text-brand-charcoal tracking-tight hover:text-brand-terracotta transition-colors duration-300"
    >
      EG<span className="text-brand-terracotta">.</span>
    </a>
  ) : (
    <Link
      to="/"
      className="font-heading text-2xl font-black text-brand-charcoal tracking-tight hover:text-brand-terracotta transition-colors duration-300"
    >
      EG<span className="text-brand-terracotta">.</span>
    </Link>
  );

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backgroundColor: isHome ? "rgba(251, 246, 240, 0)" : "rgba(251, 246, 240, 0.97)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5 flex items-center justify-between">
        {logoElement}

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => renderNavLink(link))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-2 group"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-[1.5px] bg-brand-charcoal transition-all duration-300 origin-center ${
              menuOpen ? "rotate-45 translate-y-[6.5px]" : ""
            }`}
          />
          <span
            className={`block w-6 h-[1.5px] bg-brand-charcoal transition-all duration-300 ${
              menuOpen ? "opacity-0 scale-x-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-[1.5px] bg-brand-charcoal transition-all duration-300 origin-center ${
              menuOpen ? "-rotate-45 -translate-y-[6.5px]" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 py-5 bg-brand-cream/97 backdrop-blur-xl border-t border-brand-sand flex flex-col gap-5">
          {navLinks.map((link) => renderNavLink(link, true))}
        </div>
      </div>
    </nav>
  );
}
