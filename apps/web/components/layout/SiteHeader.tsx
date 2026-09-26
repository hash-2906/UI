"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Compass, LogOut, Menu, User, X } from "lucide-react";
import { primaryNav } from "@/lib/constants/nav";
import { NavLink } from "@/components/navigation/NavLink";
import { IconButton } from "@/components/ui/IconButton";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";
import { useAuth } from "@/lib/auth/AuthContext";

function useVisibleNav() {
  const { user } = useAuth();

  return useMemo(() => {
    if (!user) return primaryNav;

    if (user.role === "provider") {
      return primaryNav.filter((item) => !["/trip", "/saved"].includes(item.href));
    }

    return primaryNav.filter((item) => item.href !== "/provider");
  }, [user]);
}

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();
  const visibleNav = useVisibleNav();

  async function handleLogout() {
    await logout();
    setMobileOpen(false);
    router.push("/");
  }

  return (
    <header className="sticky top-0 z-50 lg:static">
      {/* Mobile and tablet header */}
      <div className="flex h-16 items-center justify-between border-b border-line bg-surface/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-surface/85 lg:hidden">
        <Link href="/" className="flex items-center gap-2.5 font-semibold text-ink">
          <span className="flex size-9 items-center justify-center rounded-xl border border-pastel-lemon/80 bg-pastel-lemon text-pastel-lemon-ink shadow-xs">
            <Compass className="size-4.5" aria-hidden="true" />
          </span>
          <span className="text-[17px] font-semibold tracking-tight">LocaLens</span>
        </Link>

        <IconButton
          label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav-panel"
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </IconButton>
      </div>

      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-64 flex-col border-r border-[#02655a] bg-[#037F71] px-4 py-6 text-[#FAF7F2] backdrop-blur-md lg:flex">
        <Link href="/" className="group flex items-center gap-3 px-2 font-semibold">
          <span className="flex size-10 items-center justify-center rounded-xl border border-pastel-lemon/80 bg-pastel-lemon text-pastel-lemon-ink shadow-xs transition-transform duration-200 group-hover:scale-105">
            <Compass className="size-5" aria-hidden="true" />
          </span>
          <div className="flex flex-col">
            <span className="text-lg font-semibold tracking-tight text-[#FAF7F2]">LocaLens</span>
            <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#FFD094]">Curated Local</span>
          </div>
        </Link>

        <nav aria-label="Primary" className="mt-8 flex flex-col gap-1.5">
          {visibleNav.map((item) => (
            <NavLink
              key={item.href}
              {...item}
              className="w-full justify-start rounded-xl px-3.5 py-2.5 text-sm font-medium text-[#CDEAE7] transition-all duration-150 hover:bg-white/10 hover:text-[#FAF7F2] aria-[current=page]:border aria-[current=page]:border-[#FFD094]/60 aria-[current=page]:bg-[#02655a]/80 aria-[current=page]:text-[#FAF7F2] aria-[current=page]:font-semibold aria-[current=page]:shadow-xs"
            />
          ))}
        </nav>

        <div className="mt-auto border-t border-[#02655a] pt-4">
          {isLoading ? null : user ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2 rounded-xl border border-[#02655a] bg-[#02584e] px-3 py-2">
                <div className="size-2 rounded-full bg-accent" />
                <span
                  className="block truncate text-xs font-medium text-[#CDEAE7]"
                  title={user.email}
                >
                  {user.email}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-[#CDEAE7] hover:bg-white/10 hover:text-[#FAF7F2]"
                onClick={handleLogout}
              >
                <LogOut className="size-4" aria-hidden="true" />
                Log out
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              <Link href="/login" className="block">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-[#CDEAE7] hover:bg-white/10 hover:text-[#FAF7F2]"
                >
                  Log in
                </Button>
              </Link>
              <Link href="/register" className="block">
                <Button
                  variant="primary"
                  size="sm"
                  className="w-full border border-[#EF6545] bg-[#EF6545] text-white font-semibold shadow-xs hover:brightness-105 active:scale-[0.98] transition-all"
                >
                  <User className="size-4" aria-hidden="true" />
                  Get started
                </Button>
              </Link>
            </div>
          )}
        </div>
      </aside>

      {/* Mobile and tablet navigation panel */}
      <div
        id="mobile-nav-panel"
        className={cn(
          "border-b border-line bg-surface/95 backdrop-blur-lg shadow-float lg:hidden",
          mobileOpen ? "block" : "hidden",
        )}
      >
        <nav aria-label="Mobile primary" className="flex flex-col gap-1 px-4 py-3">
          {visibleNav.map((item) => (
            <NavLink
              key={item.href}
              {...item}
              className="w-full justify-start rounded-xl aria-[current=page]:border aria-[current=page]:border-pastel-mint/80 aria-[current=page]:bg-pastel-mint/35 aria-[current=page]:text-pastel-mint-ink"
              onClick={() => setMobileOpen(false)}
            />
          ))}

          <div className="mt-2 flex gap-2 border-t border-line pt-3">
            {isLoading ? null : user ? (
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={handleLogout}
              >
                <LogOut className="size-4" aria-hidden="true" />
                Log out ({user.email})
              </Button>
            ) : (
              <>
                <Link
                  href="/login"
                  className="flex-1"
                  onClick={() => setMobileOpen(false)}
                >
                  <Button variant="outline" size="sm" className="w-full">
                    Log in
                  </Button>
                </Link>
                <Link
                  href="/register"
                  className="flex-1"
                  onClick={() => setMobileOpen(false)}
                >
                  <Button variant="primary" size="sm" className="w-full border border-pastel-lemon/80 bg-pastel-lemon text-pastel-lemon-ink font-semibold">
                    <User className="size-4" aria-hidden="true" />
                    Get started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
