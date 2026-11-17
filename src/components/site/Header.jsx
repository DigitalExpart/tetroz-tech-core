import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, ArrowUpRight } from "lucide-react";
import Logo from "@/components/site/Logo";
import ThemeToggle from "@/components/site/ThemeToggle";
import { Button } from "@/components/ui/button";
import { navMenus } from "@/data/navigation";

const alignClasses = {
  left: "left-0",
  center: "left-1/2 -translate-x-1/2",
  right: "right-0",
};

const companyPaths = ["/about", "/partnerships", "/careers", "/contact"];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [expandedMobile, setExpandedMobile] = useState(null);
  const closeTimerRef = useRef(null);
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveMenu(null);
    setExpandedMobile(null);
  }, [pathname, search, hash]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setActiveMenu(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    };
  }, []);

  const openMenu = (id) => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setActiveMenu(id);
  };

  const scheduleClose = () => {
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = window.setTimeout(() => {
      setActiveMenu(null);
    }, 110);
  };

  const isMenuActive = (menu) => {
    if (!menu.to) {
      return companyPaths.includes(pathname) || pathname.startsWith("/legal/");
    }
    if (menu.to === "/solutions" || menu.to === "/products" || menu.to === "/industries" || menu.to === "/resources") {
      return pathname === menu.to || pathname.startsWith(`${menu.to}/`);
    }
    return pathname === menu.to;
  };

  const isSubActive = (to) => {
    if (to.includes("?")) return `${pathname}${search}` === to;
    if (to.includes("#")) return `${pathname}${hash}` === to;
    return pathname === to;
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${
        scrolled ? "glass border-b border-foreground/[0.08]" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between gap-4 px-5 sm:px-8">
        <Logo />

        <nav className="hidden items-center gap-4 lg:flex xl:gap-6" aria-label="Primary">
          {navMenus.map((menu) => {
            const isOpen = activeMenu === menu.id;
            const active = isMenuActive(menu);
            const triggerClass = `flex items-center gap-1 whitespace-nowrap py-2 text-[0.83rem] font-medium tracking-tight transition-colors ${
              active || isOpen ? "text-foreground" : "text-foreground/60 hover:text-foreground"
            }`;

            return (
              <div
                key={menu.id}
                className="relative"
                onMouseEnter={() => openMenu(menu.id)}
                onMouseLeave={scheduleClose}
                onFocus={() => openMenu(menu.id)}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget)) {
                    scheduleClose();
                  }
                }}
              >
                {menu.to ? (
                  <Link
                    to={menu.to}
                    onClick={() => setActiveMenu(null)}
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    className={triggerClass}
                  >
                    {menu.label}
                    <ChevronDown
                      className={`h-3 w-3 opacity-60 transition-transform duration-200 ${isOpen ? "rotate-180 opacity-100" : ""}`}
                      strokeWidth={1.8}
                    />
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => setActiveMenu((v) => (v === menu.id ? null : menu.id))}
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    className={triggerClass}
                  >
                    {menu.label}
                    <ChevronDown
                      className={`h-3 w-3 opacity-60 transition-transform duration-200 ${isOpen ? "rotate-180 opacity-100" : ""}`}
                      strokeWidth={1.8}
                    />
                  </button>
                )}

                {isOpen && (
                  <div
                    className={`absolute top-full z-50 pt-3 ${menu.widthClass} ${alignClasses[menu.align] || "left-0"}`}
                  >
                    <div className="overflow-hidden rounded-md border border-foreground/10 bg-surface-elevated p-2 shadow-2xl shadow-black/15 dark:shadow-black/70">
                      {menu.to && menu.overviewLabel && (
                        <Link
                          to={menu.to}
                          onClick={() => setActiveMenu(null)}
                          className="mb-1.5 flex items-center justify-between rounded border-b border-foreground/[0.07] px-3 py-2.5 transition-colors hover:bg-foreground/[0.04]"
                        >
                          <div>
                            <p className="text-[0.82rem] font-semibold text-foreground">{menu.overviewLabel}</p>
                            {menu.overviewDescription && (
                              <p className="mt-0.5 text-[0.72rem] text-foreground/50">{menu.overviewDescription}</p>
                            )}
                          </div>
                          <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-primary/70" strokeWidth={1.8} />
                        </Link>
                      )}

                      <div className={`grid gap-0.5 ${menu.columns === 2 ? "grid-cols-2" : "grid-cols-1"}`}>
                        {menu.items.map((sub) => {
                          const subActive = isSubActive(sub.to);
                          return (
                            <Link
                              key={sub.to}
                              to={sub.to}
                              onClick={() => setActiveMenu(null)}
                              className={`group flex items-start justify-between gap-2 rounded px-3 py-2 transition-colors ${
                                subActive
                                  ? "bg-primary/10 text-primary"
                                  : "text-foreground/75 hover:bg-foreground/[0.05] hover:text-foreground"
                              }`}
                            >
                              <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                  {sub.badge && (
                                    <span className="font-mono text-[0.55rem] tracking-[0.16em] text-primary/70">
                                      {sub.badge}
                                    </span>
                                  )}
                                  <span className="truncate text-[0.8rem] font-medium">{sub.label}</span>
                                </div>
                                {sub.description && (
                                  <p className="mt-0.5 line-clamp-1 text-[0.7rem] text-foreground/45">
                                    {sub.description}
                                  </p>
                                )}
                              </div>
                              <ArrowUpRight
                                className="mt-0.5 h-3.5 w-3.5 shrink-0 opacity-35 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary group-hover:opacity-100"
                                strokeWidth={1.6}
                              />
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            asChild
            className="hidden h-10 rounded-sm bg-foreground px-5 text-[0.8rem] font-semibold tracking-tight text-background hover:bg-primary hover:text-primary-foreground md:inline-flex"
          >
            <Link to="/contact">Let&apos;s Build What&apos;s Next</Link>
          </Button>
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="flex h-10 w-10 items-center justify-center rounded-sm border border-foreground/15 text-foreground lg:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" strokeWidth={1.6} /> : <Menu className="h-5 w-5" strokeWidth={1.6} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="max-h-[calc(100vh-72px)] overflow-y-auto border-t border-foreground/[0.08] bg-surface-alt px-5 pb-8 pt-4 lg:hidden">
          <nav className="flex flex-col" aria-label="Mobile">
            {navMenus.map((menu, i) => {
              const isExpanded = expandedMobile === menu.id;
              const active = isMenuActive(menu);
              return (
                <div key={menu.id} className="border-b border-foreground/[0.07]">
                  <div className="flex items-center justify-between py-3.5">
                    {menu.to ? (
                      <Link
                        to={menu.to}
                        className={`flex-1 text-[0.95rem] font-medium ${active ? "text-primary" : "text-foreground/85"}`}
                      >
                        <span className="mr-3 font-mono text-[0.6rem] text-foreground/35">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {menu.label}
                      </Link>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setExpandedMobile((v) => (v === menu.id ? null : menu.id))}
                        className={`flex-1 text-left text-[0.95rem] font-medium ${active ? "text-primary" : "text-foreground/85"}`}
                      >
                        <span className="mr-3 font-mono text-[0.6rem] text-foreground/35">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {menu.label}
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => setExpandedMobile((v) => (v === menu.id ? null : menu.id))}
                      aria-label={`Toggle ${menu.label} subpages`}
                      aria-expanded={isExpanded}
                      className="flex h-8 w-8 items-center justify-center rounded-sm text-foreground/55 hover:bg-foreground/[0.05] hover:text-foreground"
                    >
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                        strokeWidth={1.7}
                      />
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="mb-3 space-y-1 pl-7">
                      {menu.items.map((sub) => (
                        <Link
                          key={sub.to}
                          to={sub.to}
                          className={`flex items-center justify-between rounded-sm px-2.5 py-2 text-[0.83rem] transition-colors ${
                            isSubActive(sub.to)
                              ? "bg-primary/10 text-primary"
                              : "text-foreground/65 hover:bg-foreground/[0.04] hover:text-foreground"
                          }`}
                        >
                          <span>{sub.label}</span>
                          <ArrowUpRight className="h-3.5 w-3.5 opacity-40" strokeWidth={1.6} />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
          <Button
            asChild
            className="mt-6 h-12 w-full rounded-sm bg-primary text-[0.85rem] font-semibold text-primary-foreground hover:bg-primary/90"
          >
            <Link to="/contact">Let&apos;s Build What&apos;s Next</Link>
          </Button>
        </div>
      )}
    </header>
  );
}
