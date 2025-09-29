import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { useLanguage } from '@/components/LanguageProvider';
import heroImage from '@/assets/hero-livestock.jpg';
import { 
  Tractor, 
  Stethoscope, 
  Shield, 
  Smartphone, 
  BarChart3, 
  Clock,
  MapPin,
  Award
} from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const roles = [
    {
      id: 'farmer',
      title: t('roles.farmer'),
      description: 'Register and manage your livestock, track treatments, and connect with veterinarians.',
      icon: Tractor,
      color: 'farmer-theme',
      features: ['Cattle Registration', 'Treatment History', 'Vet Consultation', 'Offline Support'],
      route: '/auth/farmer'
    },
    {
      id: 'veterinarian',
      title: t('roles.veterinarian'),
      description: 'Provide professional care, manage treatments, and issue digital prescriptions.',
      icon: Stethoscope,
      color: 'vet-theme',
      features: ['Patient Management', 'Digital Prescriptions', 'Treatment Forms', 'Farmer Network'],
      route: '/auth/vet'
    },
    {
      id: 'admin',
      title: t('roles.admin'),
      description: 'Monitor AMU trends, generate reports, and ensure compliance across regions.',
      icon: Shield,
      color: 'admin-theme',
      features: ['Real-time Analytics', 'Compliance Reports', 'Regional Monitoring', 'Data Export'],
      route: '/auth/admin'
    }
  ];

  const stats = [
    { label: 'Active Farmers', value: '12,000+', icon: Tractor },
    { label: 'Veterinarians', value: '450+', icon: Stethoscope },
    { label: 'Registered Cattle', value: '50,000+', icon: Award },
    { label: 'Treatments Tracked', value: '25,000+', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar showAuth={true} />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Modern livestock management with farmers, veterinarians, and technology"
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-hero opacity-20"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
              {t('app.title')}
            </h1>
            <div className="text-lg md:text-xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed space-y-4">
              <p>{t('app.mission')}</p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 animate-slide-up">
            {stats.map((stat, index) => (
              <Card key={index} className="shadow-agricultural">
                <CardContent className="p-6 text-center">
                  <stat.icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <h2 className="text-3xl font-semibold mb-4 text-foreground">Choose Your Role</h2>
          <p className="text-muted-foreground mb-12">Select your role to access specialized features designed for your needs.</p>
        </div>
      </section>

      {/* Role Cards */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {roles.map((role, index) => (
              <Card 
                key={role.id} 
                className={`shadow-agricultural-strong hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in border-2 hover:border-primary/20 ${role.color}`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-primary rounded-full flex items-center justify-center">
                    <role.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  
                  <h3 className="text-2xl font-semibold mb-4 text-foreground">
                    {role.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {role.description}
                  </p>

                  {/* Features List */}
                  <div className="mb-8">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {role.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center text-muted-foreground">
                          <div className="w-2 h-2 bg-primary rounded-full mr-2 flex-shrink-0"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button 
                    onClick={() => navigate(role.route)}
                    className="w-full"
                    variant="hero"
                    size="lg"
                  >
                    Continue as {role.title}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose LivestockCare?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive platform brings together modern technology and agricultural expertise to revolutionize livestock management.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Smartphone, title: 'Mobile First', desc: 'Works perfectly on mobile devices with offline capabilities' },
              { icon: Clock, title: 'Real-time Updates', desc: 'Get instant notifications and live data synchronization' },
              { icon: MapPin, title: 'Location Tracking', desc: 'GPS-enabled features for regional monitoring and analytics' },
              { icon: BarChart3, title: 'Advanced Analytics', desc: 'Comprehensive reporting and trend analysis tools' }
            ].map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-secondary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-8 w-8 text-secondary-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">LC</span>
            </div>
            <span className="text-lg font-semibold">LivestockCare</span>
          </div>
          <p className="text-muted-foreground">
            © 2024 LivestockCare. Empowering smart agriculture through technology.
          </p>
        </div>
      </footer>
    </div>
  );
}