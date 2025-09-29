import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Navbar } from '@/components/Navbar';
import { useLanguage } from '@/components/LanguageProvider';
import { Shield, ArrowLeft, Mail, Lock, Building } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function AdminAuth() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    department: ''
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password || !formData.department) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Login Successful",
      description: "Welcome to the Admin Dashboard!",
    });
    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-background admin-theme">
      <Navbar title="Government Admin Portal" />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>

          <Card className="shadow-agricultural-strong border-2">
            <CardHeader className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-primary rounded-full flex items-center justify-center">
                <Shield className="h-8 w-8 text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl">Government Portal</CardTitle>
              <p className="text-muted-foreground">
                Secure access for authorized personnel only
              </p>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <select
                      id="department"
                      value={formData.department}
                      onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
                      className="w-full pl-10 pr-3 py-2 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      required
                    >
                      <option value="">Select Department</option>
                      <option value="agriculture">Department of Agriculture</option>
                      <option value="animal-husbandry">Animal Husbandry Department</option>
                      <option value="veterinary">Veterinary Services</option>
                      <option value="rural-development">Rural Development</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="admin-email">Government Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="admin-email"
                      type="email"
                      placeholder="your.name@gov.in"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="pl-10"
                      required
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Use your official government email address
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="admin-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="admin-password"
                      type="password"
                      placeholder="Enter your secure password"
                      value={formData.password}
                      onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full gradient-primary text-primary-foreground"
                >
                  Secure Login
                </Button>

                <div className="text-center pt-4">
                  <p className="text-xs text-muted-foreground">
                    This portal is for authorized government personnel only. 
                    Unauthorized access is prohibited and monitored.
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}