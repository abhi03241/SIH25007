import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Navbar } from '@/components/Navbar';
import { useLanguage } from '@/components/LanguageProvider';
import { Tractor, ArrowLeft, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function FarmerAuth() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { toast } = useToast();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [step, setStep] = useState<'details' | 'otp'>('details');
  const [formData, setFormData] = useState({
    aadhaar: '',
    name: '',
    phone: '',
    otp: ''
  });

  const handleSubmitDetails = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'register' && (!formData.aadhaar || !formData.name || !formData.phone)) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields.",
        variant: "destructive"
      });
      return;
    }
    if (mode === 'login' && (!formData.phone || !formData.aadhaar)) {
      toast({
        title: "Missing Information",
        description: "Please enter Aadhaar and phone number.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "OTP Sent",
      description: `OTP sent to ${formData.phone}`,
    });
    setStep('otp');
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.otp) {
      toast({
        title: "Invalid OTP",
        description: "Please enter the OTP.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Login Successful",
      description: "Welcome to your farmer dashboard!",
    });
    navigate('/farmer/dashboard');
  };

  return (
    <div className="min-h-screen bg-background farmer-theme">
      <Navbar title="Farmer Authentication" />
      
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

          <Card className="shadow-agricultural-strong">
            <CardHeader className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-primary rounded-full flex items-center justify-center">
                <Tractor className="h-8 w-8 text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl">
                {step === 'details' ? (mode === 'login' ? 'Farmer Login' : 'Farmer Registration') : 'Verify OTP'}
              </CardTitle>
              <p className="text-muted-foreground">
                {step === 'details' 
                  ? (mode === 'login' ? 'Enter your Aadhaar and phone number' : 'Enter your Aadhaar, name, and phone number')
                  : `Enter the OTP sent to ${formData.phone}`
                }
              </p>
            </CardHeader>
            
            <CardContent>
              {step === 'details' ? (
                <form onSubmit={handleSubmitDetails} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="aadhaar">Aadhaar Number</Label>
                    <Input
                      id="aadhaar"
                      type="text"
                      placeholder="Enter 12-digit Aadhaar number"
                      value={formData.aadhaar}
                      onChange={(e) => setFormData(prev => ({ ...prev, aadhaar: e.target.value }))}
                      maxLength={12}
                      required
                    />
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Shield className="h-3 w-3 mr-1" />
                      Your Aadhaar is secure and encrypted
                    </div>
                  </div>

                  {mode === 'register' && (
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        required
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your mobile number"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full gradient-primary text-primary-foreground"
                  >
                    Send OTP
                  </Button>

                  <div className="text-center mt-4">
                    <Button
                      type="button"
                      variant="link"
                      onClick={() => {
                        setMode(mode === 'login' ? 'register' : 'login');
                        setFormData({ aadhaar: '', name: '', phone: '', otp: '' });
                      }}
                    >
                      {mode === 'login' ? "Don't have an account? Register" : 'Already have an account? Login'}
                    </Button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleVerifyOTP} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="otp">Enter OTP</Label>
                    <Input
                      id="otp"
                      type="text"
                      placeholder="Enter 6-digit OTP"
                      value={formData.otp}
                      onChange={(e) => setFormData(prev => ({ ...prev, otp: e.target.value }))}
                      maxLength={6}
                      className="text-center text-lg tracking-widest"
                      required
                    />
                  </div>

                  <div className="flex space-x-2">
                    <Button 
                      type="button"
                      variant="outline"
                      className="flex-1"
                      onClick={() => setStep('details')}
                    >
                      Back
                    </Button>
                    <Button 
                      type="submit" 
                      className="flex-1 gradient-primary text-primary-foreground"
                    >
                      Verify & Login
                    </Button>
                  </div>

                  <Button 
                    type="button"
                    variant="ghost"
                    className="w-full text-sm"
                    onClick={() => {
                      toast({
                        title: "OTP Resent",
                        description: `New OTP sent to ${formData.phone}`,
                      });
                    }}
                  >
                    Resend OTP
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}