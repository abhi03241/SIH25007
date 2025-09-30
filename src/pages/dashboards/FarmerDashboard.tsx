import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Navbar } from '@/components/Navbar';
import { useLanguage } from '@/components/LanguageProvider';
import { 
  Plus, 
  Heart, 
  Stethoscope, 
  Clock, 
  AlertTriangle,
  Phone,
  Calendar,
  MapPin
} from 'lucide-react';

export default function FarmerDashboard() {
  const { t } = useLanguage();

  const cattleData = [
    { id: 'LC001', breed: 'Holstein Friesian', type: 'Cow', age: '3 years', status: 'Healthy' },
    { id: 'LC002', breed: 'Jersey', type: 'Cow', age: '2 years', status: 'Treatment' },
    { id: 'LC003', breed: 'Gir', type: 'Bull', age: '4 years', status: 'Healthy' },
  ];

  const treatments = [
    { date: '2024-01-15', cattle: 'LC002', medicine: 'Antibiotic XYZ', vet: 'Dr. Sharma', withdrawalPeriod: '7 days remaining' },
    { date: '2024-01-10', cattle: 'LC001', medicine: 'Vitamin B12', vet: 'Dr. Patel', withdrawalPeriod: 'Completed' },
  ];

  const alerts = [
    { type: 'withdrawal', message: 'Withdrawal period ending for LC002 in 2 days', priority: 'high' },
    { type: 'vaccination', message: 'Vaccination due for LC003', priority: 'medium' },
  ];

  return (
    <div className="min-h-screen bg-background farmer-theme">
      <Navbar title={t('nav.dashboard')} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">{t('roles.farmer')}</h1>
          <p className="text-muted-foreground">{t('roles.farmer_description')}</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-agricultural">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t('stats.registered_cattle')}</p>
                  <p className="text-2xl font-bold text-primary">{cattleData.length}</p>
                </div>
                <Heart className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-agricultural">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t('stats.treatments_tracked')}</p>
                  <p className="text-2xl font-bold text-accent">1</p>
                </div>
                <Stethoscope className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-agricultural">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t('stats.active_alerts')}</p>
                  <p className="text-2xl font-bold text-destructive">{alerts.length}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-destructive" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-agricultural">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t('farmer.last_visit')}</p>
                  <p className="text-sm font-semibold">Jan 15, 2024</p>
                </div>
                <Calendar className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cattle Management */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-agricultural">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center">
                  <Heart className="mr-2 h-5 w-5" />
                  {t('nav.cattle')}
                </CardTitle>
                <Button className="gradient-primary text-primary-foreground">
                  <Plus className="mr-2 h-4 w-4" />
                  {t('farmer.register_cattle')}
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cattleData.map((cattle) => (
                    <div key={cattle.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-semibold">{cattle.id}</div>
                        <div className="text-sm text-muted-foreground">
                          {cattle.breed} • {cattle.type} • {cattle.age}
                        </div>
                      </div>
                      <Badge 
                        variant={cattle.status === 'Healthy' ? 'default' : 'secondary'}
                        className={cattle.status === 'Healthy' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                      >
                        {cattle.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Treatment History */}
            <Card className="shadow-agricultural">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="mr-2 h-5 w-5" />
                  {t('farmer.treatment_history')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {treatments.map((treatment, index) => (
                    <div key={index} className="flex items-start justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-medium">{treatment.cattle} - {treatment.medicine}</div>
                        <div className="text-sm text-muted-foreground">
                          By {treatment.vet} on {treatment.date}
                        </div>
                      </div>
                      <Badge 
                        variant={treatment.withdrawalPeriod === 'Completed' ? 'default' : 'secondary'}
                        className={treatment.withdrawalPeriod === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}
                      >
                        {treatment.withdrawalPeriod}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Alerts */}
            <Card className="shadow-agricultural">
              <CardHeader>
                <CardTitle className="flex items-center text-destructive">
                  <AlertTriangle className="mr-2 h-5 w-5" />
                  {t('stats.active_alerts')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {alerts.map((alert, index) => (
                    <div 
                      key={index} 
                      className={`p-3 rounded-lg border-l-4 ${
                        alert.priority === 'high' 
                          ? 'border-l-red-500 bg-red-50 dark:bg-red-900/20' 
                          : 'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
                      }`}
                    >
                      <p className="text-sm font-medium">{alert.message}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Assigned Veterinarian */}
            <Card className="shadow-agricultural">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Stethoscope className="mr-2 h-5 w-5" />
                  {t('farmer.my_veterinarian')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-gradient-secondary rounded-full flex items-center justify-center">
                    <Stethoscope className="h-8 w-8 text-secondary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Dr. Rajesh Sharma</h3>
                    <p className="text-sm text-muted-foreground">{t('farmer.vet_label')}</p>
                    <div className="flex items-center justify-center text-sm text-muted-foreground mt-2">
                      <MapPin className="h-3 w-3 mr-1" />
                      District Veterinary Hospital
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    <Phone className="mr-2 h-4 w-4" />
                    {t('farmer.contact_vet')}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-agricultural">
              <CardHeader>
                <CardTitle>{t('farmer.feature_registration')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Plus className="mr-2 h-4 w-4" />
                    {t('farmer.register_cattle')}
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Clock className="mr-2 h-4 w-4" />
                    {t('farmer.treatment_history')}
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Phone className="mr-2 h-4 w-4" />
                    {t('farmer.contact_vet')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
