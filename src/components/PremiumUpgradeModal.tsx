import { Crown, Check, Sparkles, FileText, BarChart3, Cloud, Headphones, Palette } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { DAILY_QUOTA_LIMIT, getUsedQuota } from '@/utils/quotaStorage';

interface PremiumUpgradeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpgrade?: () => void;
}

const benefits = [
  { icon: Sparkles, text: 'Orçamentos ilimitados por dia' },
  { icon: FileText, text: 'Exportação de PDF profissional' },
  { icon: Palette, text: 'Modelos de orçamento personalizados' },
  { icon: Headphones, text: 'Suporte prioritário' },
  { icon: Cloud, text: 'Backup automático na nuvem' },
  { icon: BarChart3, text: 'Relatórios e análises avançadas' },
];

export const PremiumUpgradeModal = ({ open, onOpenChange, onUpgrade }: PremiumUpgradeModalProps) => {
  const usedQuota = getUsedQuota();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 p-3 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 w-fit">
            <Crown className="h-8 w-8 text-amber-950" />
          </div>
          <DialogTitle className="text-2xl font-bold text-center">
            Limite de Orçamentos Atingido 🚀
          </DialogTitle>
          <DialogDescription className="text-center mt-2">
            Você criou {usedQuota} orçamentos hoje. Atualize para o plano Premium para orçamentos ilimitados!
          </DialogDescription>
        </DialogHeader>

        {/* Quota indicator */}
        <div className="flex justify-center my-4">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 text-red-700 font-medium">
            <span>{usedQuota}/{DAILY_QUOTA_LIMIT} orçamentos usados hoje</span>
          </div>
        </div>

        {/* Benefits list */}
        <div className="space-y-3 my-4">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="flex-shrink-0 p-1 rounded-full bg-primary/10">
                <Check className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm text-foreground">{benefit.text}</span>
            </div>
          ))}
        </div>

        {/* Price */}
        <div className="text-center py-4 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg border border-amber-200">
          <p className="text-sm text-muted-foreground">Apenas</p>
          <p className="text-3xl font-bold text-amber-600">
            R$ 9,90<span className="text-base font-normal text-muted-foreground">/mês</span>
          </p>
        </div>

        {/* Actions */}
        <div className="mt-4">
          <Button
            onClick={() => {
              onUpgrade?.();
              onOpenChange(false);
            }}
            className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-amber-950 font-semibold"
          >
            <Crown className="h-4 w-4 mr-2" />
            Assinar Agora
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
