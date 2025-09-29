import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Navbar } from '@/components/Navbar';
import { useLanguage } from '@/components/LanguageProvider';
import { 
  FileText, 
  Users, 
  Stethoscope, 
  Calendar,
  MapPin,
  Phone,
  Plus,
  Search,
  AlertCircle
} from 'lucide-react';

export default function VetDashboard() {
  const { t } = useLanguage();

  const farmers = [
    { id: 'F001', name: 'Ramesh Kumar', location: 'Village Sunrise', cattle: 5, lastVisit: '2024-01-15', status: 'active' },
    { id: 'F002', name: 'Priya Sharma', location: 'Village Greenfield', cattle: 8, lastVisit: '2024-01-12', status: 'treatment' },
    { id: 'F003', name: 'Suresh Patel', location: 'Village Harvest', cattle: 3, lastVisit: '2024-01-08', status: 'active' },
  ];

  const treatments = [
    { id: 'T001', farmer: 'Ramesh Kumar', cattle: 'LC002', medicine: 'Antibiotic XYZ', date: '2024-01-15', status: 'ongoing' },
    { id: 'T002', farmer: 'Priya Sharma', cattle: 'LC005', medicine: 'Anti-inflammatory', date: '2024-01-12', status: 'completed' },
  ];

  const appointments = [
    { time: '09:00', farmer: 'Ramesh Kumar', type: 'Regular Checkup', location: 'Village Sunrise' },
    { time: '11:30', farmer: 'Priya Sharma', type: 'Treatment Follow-up', location: 'Village Greenfield' },
    { time: '14:00', farmer: 'Suresh Patel', type: 'Vaccination', location: 'Village Harvest' },
  ];

  return (
    <div className="min-h-screen bg-background vet-theme">
      <Navbar title="Veterinarian Dashboard" />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, Dr. Sharma!</h1>
          <p className="text-muted-foreground">Manage your patients and provide the best care for livestock.</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-agricultural">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Farmers</p>
                  <p className="text-2xl font-bold text-primary">{farmers.length}</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-agricultural">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Treatments</p>
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
                  <p className="text-sm text-muted-foreground">Today's Appointments</p>
                  <p className="text-2xl font-bold text-secondary">{appointments.length}</p>
                </div>
                <Calendar className="h-8 w-8 text-secondary" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-agricultural">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Prescriptions</p>
                  <p className="text-2xl font-bold text-primary">15</p>
                </div>
                <FileText className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="farmers" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="farmers">Farmers</TabsTrigger>
                <TabsTrigger value="treatments">Treatments</TabsTrigger>
                <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
              </TabsList>

              <TabsContent value="farmers">
                <Card className="shadow-agricultural">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="flex items-center">
                      <Users className="mr-2 h-5 w-5" />
                      Registered Farmers
                    </CardTitle>
                    <Button size="sm" variant="outline">
                      <Search className="mr-2 h-4 w-4" />
                      Search
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {farmers.map((farmer) => (
                        <div key={farmer.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                              <span className="text-primary-foreground font-semibold">
                                {farmer.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <div>
                              <div className="font-semibold">{farmer.name}</div>
                              <div className="text-sm text-muted-foreground flex items-center">
                                <MapPin className="h-3 w-3 mr-1" />
                                {farmer.location} • {farmer.cattle} cattle
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Last visit: {farmer.lastVisit}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge 
                              variant={farmer.status === 'active' ? 'default' : 'secondary'}
                              className={farmer.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}
                            >
                              {farmer.status === 'active' ? 'Active' : 'Under Treatment'}
                            </Badge>
                            <Button size="sm" variant="outline">
                              <Phone className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="treatments">
                <Card className="shadow-agricultural">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="flex items-center">
                      <Stethoscope className="mr-2 h-5 w-5" />
                      Treatment Records
                    </CardTitle>
                    <Button className="gradient-secondary text-secondary-foreground">
                      <Plus className="mr-2 h-4 w-4" />
                      New Treatment
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {treatments.map((treatment) => (
                        <div key={treatment.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <div className="font-semibold">{treatment.id} - {treatment.cattle}</div>
                            <div className="text-sm text-muted-foreground">
                              {treatment.farmer} • {treatment.medicine}
                            </div>
                            <div className="text-xs text-muted-foreground">{treatment.date}</div>
                          </div>
                          <Badge 
                            variant={treatment.status === 'completed' ? 'default' : 'secondary'}
                            className={treatment.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}
                          >
                            {treatment.status === 'completed' ? 'Completed' : 'Ongoing'}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="prescriptions">
                <Card className="shadow-agricultural">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="flex items-center">
                      <FileText className="mr-2 h-5 w-5" />
                      Digital Prescriptions
                    </CardTitle>
                    <Button className="gradient-secondary text-secondary-foreground">
                      <Plus className="mr-2 h-4 w-4" />
                      Create Prescription
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No prescriptions yet</h3>
                      <p className="text-muted-foreground mb-4">Start creating digital prescriptions for your patients</p>
                      <Button className="gradient-secondary text-secondary-foreground">
                        Create First Prescription
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Today's Schedule */}
            <Card className="shadow-agricultural">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  Today's Schedule
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {appointments.map((appointment, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 border rounded-lg">
                      <div className="text-sm font-mono bg-primary text-primary-foreground px-2 py-1 rounded">
                        {appointment.time}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{appointment.farmer}</div>
                        <div className="text-xs text-muted-foreground">{appointment.type}</div>
                        <div className="text-xs text-muted-foreground flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {appointment.location}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Urgent Alerts */}
            <Card className="shadow-agricultural border-orange-200">
              <CardHeader>
                <CardTitle className="flex items-center text-orange-600">
                  <AlertCircle className="mr-2 h-5 w-5" />
                  Urgent Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 rounded-lg">
                    <p className="text-sm font-medium text-orange-800 dark:text-orange-200">
                      Emergency call from Ramesh Kumar
                    </p>
                    <p className="text-xs text-orange-600 dark:text-orange-300">
                      Cattle LC002 showing distress - 15 min ago
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-agricultural">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Plus className="mr-2 h-4 w-4" />
                    New Treatment Form
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="mr-2 h-4 w-4" />
                    Create Prescription
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule Visit
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