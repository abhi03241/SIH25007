import React from 'react';
import { Moon, Sun, Globe, Monitor, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from '@/components/ThemeProvider';
import { useLanguage } from '@/components/LanguageProvider';
import { useNavigate, useLocation } from 'react-router-dom';

interface NavbarProps {
  title?: string;
  showThemeToggle?: boolean;
  showLanguageToggle?: boolean;
  showAuth?: boolean;
}

export function Navbar({ 
  title = "LivestockCare", 
  showThemeToggle = true, 
  showLanguageToggle = true,
  showAuth = false
}: NavbarProps) {
  const { setTheme, theme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  // Mapping language codes to display names
  const languageNames: Record<typeof language, string> = {
    en: 'English',
    hi: 'हिंदी',
  };

  return (
    <nav className="border-b bg-card shadow-agricultural">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">LC</span>
            </div>
            <h1 className="text-xl font-semibold text-foreground">{title}</h1>
          </div>

          <div className="flex items-center space-x-2">
            {showAuth && location.pathname === '/' && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <LogIn className="h-4 w-4 mr-1" />
                    <span className="hidden sm:inline">{t('auth.login')}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => navigate('/auth/farmer')}>
                    {t('roles.farmer')}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/auth/vet')}>
                    {t('roles.veterinarian')}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/auth/admin')}>
                    {t('roles.admin')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {showLanguageToggle && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Globe className="h-4 w-4" />
                    <span className="ml-1 hidden sm:inline">{languageNames[language]}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setLanguage('en')}>English</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLanguage('hi')}>हिंदी</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {showThemeToggle && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    {theme === 'light' ? (
                      <Sun className="h-4 w-4" />
                    ) : theme === 'dark' ? (
                      <Moon className="h-4 w-4" />
                    ) : (
                      <Monitor className="h-4 w-4" />
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setTheme('light')}>
                    <Sun className="mr-2 h-4 w-4" />
                    {t('theme.light')}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme('dark')}>
                    <Moon className="mr-2 h-4 w-4" />
                    {t('theme.dark')}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme('system')}>
                    <Monitor className="mr-2 h-4 w-4" />
                    {t('theme.system')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
