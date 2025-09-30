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
  const [formData, setFormData] = useState({ aadhaar: '', name: '', phone: '', otp: '' });

  const handleSubmitDetails = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'register' && (!formData.aadhaar || !formData.name || !formData.phone)) {
      toast({ title: t('farmerAuth.toast.missingInfo'), variant: 'destructive' });
      return;
    }
    if (mode === 'login' && (!formData.phone || !formData.aadhaar)) {
      toast({ title: t('farmerAuth.toast.missingLoginInfo'), variant: 'destructive' });
      return;
    }

    toast({ title: t('farmerAuth.toast.otpSent').replace('{phone}', formData.phone) });
    setStep('otp');
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.otp) {
      toast({ title: t('farmerAuth.toast.invalidOtp'), variant: 'destructive' });
      return;
    }

    toast({ title: t('farmerAuth.toast.loginSuccess') });
    navigate('/farmer/dashboard');
  };

  return (
    <div className="min-h-screen bg-background farmer-theme">
      <Navbar title={t('roles.farmer')} />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <Button variant="ghost" onClick={() => navigate('/')} className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('farmerAuth.back')}
          </Button>

          <Card className="shadow-agricultural-strong">
            <CardHeader className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-primary rounded-full flex items-center justify-center">
                <Tractor className="h-8 w-8 text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl">
                {step === 'details'
                  ? mode === 'login'
                    ? t('farmerAuth.title.login')
                    : t('farmerAuth.title.register')
                  : t('farmerAuth.title.verifyOtp')}
              </CardTitle>
              <p className="text-muted-foreground">
                {step === 'details'
                  ? mode === 'login'
                    ? t('farmerAuth.details.login')
                    : t('farmerAuth.details.register')
                  : `${t('farmerAuth.otp.placeholder')} ${formData.phone}`}
              </p>
            </CardHeader>

            <CardContent>
              {step === 'details' ? (
                <form onSubmit={handleSubmitDetails} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="aadhaar">{t('farmerAuth.aadhaar.label')}</Label>
                    <Input
                      id="aadhaar"
                      type="text"
                      placeholder={t('farmerAuth.aadhaar.placeholder')}
                      value={formData.aadhaar}
                      onChange={(e) => setFormData(prev => ({ ...prev, aadhaar: e.target.value }))}
                      maxLength={12}
                      required
                    />
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Shield className="h-3 w-3 mr-1" />
                      {t('farmerAuth.aadhaar.secure')}
                    </div>
                  </div>

                  {mode === 'register' && (
                    <div className="space-y-2">
                      <Label htmlFor="name">{t('farmerAuth.name.label')}</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder={t('farmerAuth.name.placeholder')}
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        required
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="phone">{t('farmerAuth.phone.label')}</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder={t('farmerAuth.phone.placeholder')}
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full gradient-primary text-primary-foreground">
                    {t('farmerAuth.sendOtp')}
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
                      {mode === 'login'
                        ? t('farmerAuth.continueAsLogin')
                        : t('farmerAuth.continueAsRegister')}
                    </Button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleVerifyOTP} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="otp">{t('farmerAuth.otp.placeholder')}</Label>
                    <Input
                      id="otp"
                      type="text"
                      placeholder={t('farmerAuth.otp.placeholder')}
                      value={formData.otp}
                      onChange={(e) => setFormData(prev => ({ ...prev, otp: e.target.value }))}
                      maxLength={6}
                      className="text-center text-lg tracking-widest"
                      required
                    />
                  </div>

                  <div className="flex space-x-2">
                    <Button type="button" variant="outline" className="flex-1" onClick={() => setStep('details')}>
                      {t('farmerAuth.back')}
                    </Button>
                    <Button type="submit" className="flex-1 gradient-primary text-primary-foreground">
                      {t('farmerAuth.verify')}
                    </Button>
                  </div>

                  <Button
                    type="button"
                    variant="ghost"
                    className="w-full text-sm"
                    onClick={() =>
                      toast({ title: t('farmerAuth.toast.otpResent').replace('{phone}', formData.phone) })
                    }
                  >
                    {t('farmerAuth.resendOtp')}
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
