import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Crown, Check, X, Sparkles, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import {
  getQuotaData,
  activatePremiumDemo,
  deactivatePremiumDemo,
  resetQuotaDemo,
  DAILY_QUOTA_LIMIT,
} from '@/utils/quotaStorage';

const freeFeatures = [
  { text: `${DAILY_QUOTA_LIMIT} orçamentos por dia`, included: true },
  { text: 'Visualização de orçamentos', included: true },
  { text: 'Edição básica', included: true },
  { text: 'Exportação de PDF', included: false },
  { text: 'Modelos personalizados', included: false },
  { text: 'Suporte prioritário', included: false },
  { text: 'Backup na nuvem', included: false },
  { text: 'Relatórios avançados', included: false },
];

const premiumFeatures = [
  { text: 'Orçamentos ilimitados', included: true },
  { text: 'Visualização de orçamentos', included: true },
  { text: 'Edição avançada', included: true },
  { text: 'Exportação de PDF profissional', included: true },
  { text: 'Modelos personalizados', included: true },
  { text: 'Suporte prioritário', included: true },
  { text: 'Backup automático na nuvem', included: true },
  { text: 'Relatórios e análises avançadas', included: true },
];

const PremiumSettings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [quotaData, setQuotaData] = useState({ count: 0, isPremium: false });

  const loadQuotaData = () => {
    const data = getQuotaData();
    setQuotaData({ count: data.count, isPremium: data.isPremium });
  };

  useEffect(() => {
    loadQuotaData();
  }, []);

  const handleActivatePremium = () => {
    activatePremiumDemo();
    loadQuotaData();
    toast({
      title: 'Premium ativado com sucesso! ✨',
      description: 'Agora você tem acesso a todos os recursos premium.',
    });
  };

  const handleDeactivatePremium = () => {
    deactivatePremiumDemo();
    loadQuotaData();
    toast({
      title: 'Premium desativado',
      description: 'Você voltou ao plano gratuito.',
    });
  };

  const handleResetDemo = () => {
    resetQuotaDemo();
    loadQuotaData();
    toast({
      title: 'Contador resetado',
      description: 'A contagem de orçamentos do dia foi zerada.',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500">
              <Crown className="h-6 w-6 text-amber-950" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Planos e Premium</h1>
          </div>
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
        </div>

        {/* Current plan status */}
        <Card className={quotaData.isPremium ? 'border-amber-400 bg-gradient-to-r from-amber-50 to-yellow-50' : ''}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {quotaData.isPremium ? (
                <>
                  <Crown className="h-5 w-5 text-amber-600" />
                  Plano Premium Ativo
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5 text-muted-foreground" />
                  Plano Gratuito
                </>
              )}
            </CardTitle>
            <CardDescription>
              {quotaData.isPremium
                ? 'Você tem acesso a todos os recursos premium.'
                : `Você usou ${quotaData.count}/${DAILY_QUOTA_LIMIT} orçamentos hoje.`}
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Plans comparison */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Free plan */}
          <Card className={!quotaData.isPremium ? 'border-primary' : ''}>
            <CardHeader>
              <CardTitle>Grátis</CardTitle>
              <CardDescription>Para começar</CardDescription>
              <div className="mt-2">
                <span className="text-3xl font-bold">R$ 0</span>
                <span className="text-muted-foreground">/mês</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {freeFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    {feature.included ? (
                      <Check className="h-4 w-4 text-primary" />
                    ) : (
                      <X className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className={feature.included ? '' : 'text-muted-foreground'}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Premium plan */}
          <Card className={`${quotaData.isPremium ? 'border-amber-400' : ''} bg-gradient-to-b from-amber-50 to-yellow-50`}>
            <CardHeader>
              <div className="flex items-center gap-2">
                <CardTitle>Premium</CardTitle>
                <Crown className="h-5 w-5 text-amber-600" />
              </div>
              <CardDescription>Para profissionais</CardDescription>
              <div className="mt-2">
                <span className="text-3xl font-bold text-amber-600">R$ 9,90</span>
                <span className="text-muted-foreground">/mês</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {premiumFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-amber-600" />
                    <span>{feature.text}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Demo controls */}
        <Card className="border-dashed">
          <CardHeader>
            <CardTitle className="text-lg">Controles de Demonstração</CardTitle>
            <CardDescription>
              Use estes botões para testar as funcionalidades do sistema premium.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            {quotaData.isPremium ? (
              <Button variant="outline" onClick={handleDeactivatePremium}>
                Desativar Premium (Demo)
              </Button>
            ) : (
              <Button
                onClick={handleActivatePremium}
                className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-amber-950"
              >
                <Crown className="h-4 w-4 mr-2" />
                Ativar Premium (Demo)
              </Button>
            )}
            <Button variant="outline" onClick={handleResetDemo}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Resetar Contador
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PremiumSettings;
