import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Navbar } from '@/components/Navbar';
import { useLanguage } from '@/components/LanguageProvider';
import { 
  BarChart3, 
  TrendingUp, 
  AlertTriangle,
  Download,
  MapPin,
  Users,
  Stethoscope,
  Calendar,
  FileText,
  Shield,
  Activity
} from 'lucide-react';

export default function AdminDashboard() {
  const { t } = useLanguage();

  const stats = [
    { label: 'Total Farmers', value: '12,847', change: '+5.2%', icon: Users, color: 'text-blue-600' },
    { label: 'Active Veterinarians', value: '456', change: '+2.1%', icon: Stethoscope, color: 'text-green-600' },
    { label: 'Registered Cattle', value: '52,341', change: '+8.7%', icon: Activity, color: 'text-purple-600' },
    { label: 'Treatments This Month', value: '2,847', change: '+12.3%', icon: FileText, color: 'text-orange-600' },
  ];

  const regionData = [
    { region: 'North District', farmers: 3245, cattle: 15670, treatments: 567, compliance: 94 },
    { region: 'South District', farmers: 2890, cattle: 13420, treatments: 489, compliance: 91 },
    { region: 'East District', farmers: 3567, cattle: 18230, treatments: 623, compliance: 96 },
    { region: 'West District', farmers: 3145, cattle: 16021, treatments: 545, compliance: 88 },
  ];

  const alerts = [
    { type: 'high', message: 'Antibiotic usage spike detected in North District', time: '2 hours ago' },
    { type: 'medium', message: 'Compliance audit due for 15 farms in South District', time: '4 hours ago' },
    { type: 'low', message: 'Monthly report generation completed', time: '6 hours ago' },
  ];

  const amuTrends = [
    { month: 'Jan', antibiotics: 340, vaccines: 890, supplements: 560 },
    { month: 'Feb', antibiotics: 285, vaccines: 920, supplements: 580 },
    { month: 'Mar', antibiotics: 310, vaccines: 950, supplements: 620 },
    { month: 'Apr', antibiotics: 275, vaccines: 980, supplements: 640 },
  ];

  return (
    <div className="min-h-screen bg-background admin-theme">
      <Navbar title="Government Admin Dashboard" />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">AMU Monitoring Dashboard</h1>
              <p className="text-muted-foreground">Real-time antimicrobial usage monitoring and compliance tracking</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export CSV
              </Button>
              <Button variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                Generate Report
              </Button>
            </div>
          </div>
        </div>

        {/* Key Performance Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="shadow-agricultural">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change} from last month
                    </p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Analytics */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="regions">Regions</TabsTrigger>
                <TabsTrigger value="trends">AMU Trends</TabsTrigger>
                <TabsTrigger value="compliance">Compliance</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <Card className="shadow-agricultural">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart3 className="mr-2 h-5 w-5" />
                      AMU Overview - Current Month
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-red-600">275</div>
                          <div className="text-sm text-muted-foreground">Antibiotic Treatments</div>
                          <div className="text-xs text-green-600">↓ 18% from last month</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-blue-600">980</div>
                          <div className="text-sm text-muted-foreground">Vaccinations</div>
                          <div className="text-xs text-green-600">↑ 3% from last month</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-green-600">640</div>
                          <div className="text-sm text-muted-foreground">Supplements</div>
                          <div className="text-xs text-green-600">↑ 7% from last month</div>
                        </div>
                      </div>
                      
                      <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center border-2 border-dashed border-muted-foreground/25">
                        <div className="text-center">
                          <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-2" />
                          <p className="text-muted-foreground">AMU Analytics Chart</p>
                          <p className="text-sm text-muted-foreground">Interactive charts will be displayed here</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="regions">
                <Card className="shadow-agricultural">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MapPin className="mr-2 h-5 w-5" />
                      Regional Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {regionData.map((region, index) => (
                        <div key={index} className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="font-semibold">{region.region}</h3>
                            <div className={`px-2 py-1 rounded text-xs ${
                              region.compliance >= 95 ? 'bg-green-100 text-green-800' :
                              region.compliance >= 90 ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {region.compliance}% Compliance
                            </div>
                          </div>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <div className="text-muted-foreground">Farmers</div>
                              <div className="font-semibold">{region.farmers.toLocaleString()}</div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">Cattle</div>
                              <div className="font-semibold">{region.cattle.toLocaleString()}</div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">Treatments</div>
                              <div className="font-semibold">{region.treatments}</div>
                            </div>
                          </div>
                          <div className="mt-3">
                            <div className="flex justify-between text-xs mb-1">
                              <span>Compliance Rate</span>
                              <span>{region.compliance}%</span>
                            </div>
                            <Progress value={region.compliance} className="h-2" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="trends">
                <Card className="shadow-agricultural">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="mr-2 h-5 w-5" />
                      AMU Trends Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-red-600">↓ 18%</div>
                          <div className="text-sm text-muted-foreground">Antibiotic Usage</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-green-600">↑ 12%</div>
                          <div className="text-sm text-muted-foreground">Preventive Care</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-blue-600">↑ 8%</div>
                          <div className="text-sm text-muted-foreground">Vaccination Rate</div>
                        </div>
                      </div>
                      
                      <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center border-2 border-dashed border-muted-foreground/25">
                        <div className="text-center">
                          <TrendingUp className="h-16 w-16 text-muted-foreground mx-auto mb-2" />
                          <p className="text-muted-foreground">Trend Analysis Chart</p>
                          <p className="text-sm text-muted-foreground">Time-series data visualization</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="compliance">
                <Card className="shadow-agricultural">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Shield className="mr-2 h-5 w-5" />
                      Compliance Monitoring
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-6">
                        <div className="text-center p-4 border rounded-lg">
                          <div className="text-3xl font-bold text-green-600">94.2%</div>
                          <div className="text-sm text-muted-foreground">Overall Compliance</div>
                          <div className="text-xs text-green-600 mt-1">↑ 2.1% from last quarter</div>
                        </div>
                        <div className="text-center p-4 border rounded-lg">
                          <div className="text-3xl font-bold text-orange-600">23</div>
                          <div className="text-sm text-muted-foreground">Pending Audits</div>
                          <div className="text-xs text-red-600 mt-1">Due within 7 days</div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-semibold">Recent Compliance Issues</h4>
                        <div className="space-y-2">
                          <div className="p-3 border-l-4 border-l-red-500 bg-red-50 dark:bg-red-900/20 rounded">
                            <p className="text-sm font-medium">Withdrawal period violation detected</p>
                            <p className="text-xs text-muted-foreground">Farm ID: F2847 - North District</p>
                          </div>
                          <div className="p-3 border-l-4 border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 rounded">
                            <p className="text-sm font-medium">Missing treatment documentation</p>
                            <p className="text-xs text-muted-foreground">Farm ID: F1923 - South District</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Real-time Alerts */}
            <Card className="shadow-agricultural">
              <CardHeader>
                <CardTitle className="flex items-center text-orange-600">
                  <AlertTriangle className="mr-2 h-5 w-5" />
                  Real-time Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {alerts.map((alert, index) => (
                    <div 
                      key={index} 
                      className={`p-3 rounded-lg border-l-4 ${
                        alert.type === 'high' 
                          ? 'border-l-red-500 bg-red-50 dark:bg-red-900/20' 
                          : alert.type === 'medium'
                          ? 'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
                          : 'border-l-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      }`}
                    >
                      <p className="text-sm font-medium">{alert.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="shadow-agricultural">
              <CardHeader>
                <CardTitle>System Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Data Sync</span>
                    <span className="text-sm text-green-600 font-medium">Online</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Last Update</span>
                    <span className="text-sm text-muted-foreground">2 min ago</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Active Users</span>
                    <span className="text-sm font-medium">1,247</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Server Load</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={35} className="w-16 h-2" />
                      <span className="text-sm">35%</span>
                    </div>
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
                    <Download className="mr-2 h-4 w-4" />
                    Export Monthly Report
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule Audit
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    Send Alert
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