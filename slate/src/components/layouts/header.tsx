"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/auth/client";
import { User } from "@supabase/supabase-js";
import { 
  Bell, 
  Search, 
  Menu,
  LogOut,
  Settings,
  User as UserIcon,
  ChevronDown
} from "lucide-react";

interface HeaderProps {
  user: User;
}

export function Header({ user }: HeaderProps) {
  const router = useRouter();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  const userMetadata = user.user_metadata || {};
  const userName = userMetadata.name || user.email?.split("@")[0] || "User";
  const userInitials = userName.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2);

  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-4 sm:gap-x-6 lg:px-8">
      {/* Mobile menu button */}
      <button
        type="button"
        className="lg:hidden -m-2.5 p-2.5 text-slate-700 dark:text-slate-300"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Separator */}
      <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 lg:hidden" />

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        {/* Search */}
        <form className="relative flex flex-1" action="#" method="GET">
          <Search className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-slate-400" />
          <input
            type="search"
            name="search"
            placeholder="Search estimates, invoices, clients..."
            className="block h-full w-full border-0 bg-transparent py-0 pl-8 pr-0 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-0 sm:text-sm"
          />
        </form>

        <div className="flex items-center gap-x-4 lg:gap-x-6">
          {/* Notifications */}
          <button
            type="button"
            className="relative -m-2.5 p-2.5 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500" />
          </button>

          {/* Separator */}
          <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-slate-200 dark:lg:bg-slate-700" />

          {/* User menu */}
          <div className="relative">
            <button
              type="button"
              className="flex items-center gap-x-3 -m-1.5 p-1.5"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-slate-600 to-slate-800 dark:from-slate-300 dark:to-slate-500 flex items-center justify-center">
                <span className="text-xs font-medium text-white dark:text-slate-900">
                  {userInitials}
                </span>
              </div>
              <span className="hidden lg:flex lg:items-center">
                <span className="text-sm font-medium text-slate-900 dark:text-white">
                  {userName}
                </span>
                <ChevronDown className="ml-2 h-4 w-4 text-slate-400" />
              </span>
            </button>

            {/* Dropdown */}
            {showUserMenu && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setShowUserMenu(false)} 
                />
                <div className="absolute right-0 z-20 mt-2 w-56 origin-top-right rounded-xl bg-white dark:bg-slate-800 shadow-lg ring-1 ring-slate-200 dark:ring-slate-700 p-1">
                  <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-700">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">{userName}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
                  </div>
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        router.push("/dashboard/settings");
                      }}
                      className="flex w-full items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"
                    >
                      <UserIcon className="h-4 w-4" />
                      Profile
                    </button>
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        router.push("/dashboard/settings");
                      }}
                      className="flex w-full items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"
                    >
                      <Settings className="h-4 w-4" />
                      Settings
                    </button>
                  </div>
                  <div className="border-t border-slate-100 dark:border-slate-700 py-1">
                    <button
                      onClick={handleSignOut}
                      className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50 rounded-lg"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign out
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
