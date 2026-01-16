import { useState, useEffect } from "react";
import { Link } from "wouter";
import { LayoutDashboard, Loader2, Menu } from "lucide-react";

export function LandingNavigation() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollAnnouncement, setScrollAnnouncement] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setScrollAnnouncement(`Navigating to ${id} section`);
      setTimeout(() => setScrollAnnouncement(""), 1000);
    }
  };

  return (
    <>
      <nav
        className={`fixed top-3 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-3rem)] max-w-[1152px] h-16 rounded-[33554400px] border border-[#374d58] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.2),0px_4px_6px_-4px_rgba(0,0,0,0.2)] backdrop-blur-2xl transition-all duration-300 ${
          scrolled ? "bg-[#111d22]/90" : "bg-[#111d22]/80"
        }`}
      >
        <div className="h-full px-6 flex items-center justify-between gap-5">
          {/* Logo */}
          <Link
            href="/landing"
            className="flex-shrink-0"
            aria-label="SleekInvoices - Go to home"
          >
            <img
              src="/logos/wide/SleekInvoices-Logo-Wide.svg"
              alt=""
              className="h-6 w-auto max-w-[140.2px]"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleNavClick("features")}
              className="rounded-[33554400px] px-4 py-2 text-sm font-medium text-[#a3b1b8] hover:text-[#f1f6f9] hover:bg-[#5f6fff]/10 transition-all"
            >
              Features
            </button>
            <button
              type="button"
              onClick={() => handleNavClick("pricing")}
              className="rounded-[33554400px] px-4 py-2 text-sm font-medium text-[#a3b1b8] hover:text-[#f1f6f9] hover:bg-[#5f6fff]/10 transition-all"
            >
              Pricing
            </button>
            <button
              type="button"
              onClick={() => {
                window.location.href = "/docs";
              }}
              className="rounded-[33554400px] px-4 py-2 text-sm font-medium text-[#a3b1b8] hover:text-[#f1f6f9] hover:bg-[#5f6fff]/10 transition-all"
            >
              Docs
            </button>
            <button
              type="button"
              onClick={() => handleNavClick("faq")}
              className="rounded-[33554400px] px-4 py-2 text-sm font-medium text-[#a3b1b8] hover:text-[#f1f6f9] hover:bg-[#5f6fff]/10 transition-all"
            >
              FAQ
            </button>
          </div>

          {/* Dashboard CTA */}
          <div className="hidden lg:flex items-center">
            <a
              href="/dashboard"
              className="h-8 rounded-[33554400px] bg-[#5f6fff] border border-[#5f6fff] px-4 flex items-center justify-center gap-2 text-xs font-medium text-[#f1f6f9] hover:bg-[#5f6fff]/90 transition-all"
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => {
              const sidebar = document.querySelector(
                '[data-state="open"][role="dialog"]'
              ) as HTMLElement;
              if (sidebar?.nextElementSibling?.nextElementSibling) {
                (
                  sidebar.nextElementSibling.nextElementSibling as HTMLElement
                ).click();
              }
            }}
            className="lg:hidden flex-shrink-0 h-10 w-10 rounded-full bg-[#5f6fff] flex items-center justify-center"
            aria-label="Open navigation menu"
          >
            <Menu className="h-5 w-5 text-[#f1f6f9]" />
          </button>
        </div>
      </nav>

      {/* ARIA live region for scroll announcements */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {scrollAnnouncement}
      </div>
    </>
  );
}
