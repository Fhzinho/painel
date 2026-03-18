/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  Users, 
  Timer, 
  ArrowRight, 
  Loader2,
  ShieldCheck,
  Flame
} from 'lucide-react';

// LINK DE DESTINO - Defina o link do botão aqui
const DESTINATION_URL = "https://pay.kiwify.com.br/7kD4C6p"; 

export default function App() {
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [isLoading, setIsLoading] = useState(true);
  const [visitors, setVisitors] = useState(23);
  const [showSticky, setShowSticky] = useState(false);
  const [currentNotification, setCurrentNotification] = useState<{ name: string, message: string } | null>(null);
  const [showNotification, setShowNotification] = useState(false);

  const names = [
    "Ana Paula", "Beatriz Oliveira", "Camila Santos", "Daniela Lima", 
    "Eliane Costa", "Fernanda Souza", "Gisele Rocha", "Helena Martins", 
    "Isabela Ferreira", "Juliana Mendes"
  ];

  const messages = [
    "acabou de comprar!",
    "acabou de aproveitar o desconto!"
  ];

  // Purchase Notification Logic
  useEffect(() => {
    const showRandomNotification = () => {
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      
      setCurrentNotification({ name: randomName, message: randomMessage });
      setShowNotification(true);

      // Hide after 5 seconds
      setTimeout(() => {
        setShowNotification(false);
      }, 5000);
    };

    // Initial delay
    const initialTimeout = setTimeout(showRandomNotification, 3000);

    // Repeat every 12-20 seconds
    const interval = setInterval(() => {
      showRandomNotification();
    }, Math.floor(Math.random() * 8000) + 12000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  // Countdown Timer Logic
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // Loading Simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Dynamic Social Proof
  useEffect(() => {
    const interval = setInterval(() => {
      setVisitors(prev => {
        const change = Math.floor(Math.random() * 5) - 2;
        const next = prev + change;
        return next < 15 ? 15 : next > 45 ? 45 : next;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Handle Scroll for Sticky Button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowSticky(true);
      } else {
        setShowSticky(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCTA = useCallback(() => {
    window.open(DESTINATION_URL, '_blank');
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white flex flex-col items-center justify-center p-6 text-center z-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        >
          <Loader2 className="w-12 h-12 text-red-600 mb-4" />
        </motion.div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Verificando disponibilidade...</h2>
        <p className="text-gray-500">Aguarde um momento, estamos preparando sua oferta.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans text-gray-900 pb-12 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-red-50/50 to-transparent -z-10" />
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-red-100/30 rounded-full blur-3xl -z-10" />
      <div className="absolute top-1/2 -left-24 w-64 h-64 bg-blue-100/20 rounded-full blur-3xl -z-10" />

      {/* Top Urgency Bar */}
      <div className="bg-yellow-400 py-2 px-4 text-center font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 border-b border-yellow-500">
        <Flame className="w-4 h-4 text-red-600" />
        <span>Oferta por tempo limitado!</span>
        <Flame className="w-4 h-4 text-red-600" />
      </div>

      <main className="max-w-md mx-auto px-4 pt-6">
        {/* Persuasion Elements */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 gap-3 mb-8"
        >
          <div className="bg-white p-3.5 rounded-2xl shadow-[0_4px_15px_rgba(0,0,0,0.05)] border border-gray-100 flex items-center gap-3 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-red-500" />
            <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <Timer className="w-5 h-5 text-red-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-400 uppercase font-black tracking-widest leading-none mb-1.5">Expira em</span>
              <span className="text-xl font-black text-gray-900 tabular-nums leading-none">
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>
          <div className="bg-white p-3.5 rounded-2xl shadow-[0_4px_15px_rgba(0,0,0,0.05)] border border-gray-100 flex items-center gap-3 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <Users className="w-5 h-5 text-blue-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-400 uppercase font-black tracking-widest leading-none mb-1.5">Online agora</span>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black text-gray-900 tabular-nums leading-none">
                  {visitors}
                </span>
                <motion.div 
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-black text-red-600 leading-tight mb-2 drop-shadow-sm">
            ESPERA! NÃO SAIA AGORA
          </h1>
          
          <p className="text-lg font-semibold text-gray-700">
            Antes de fechar essa página…
          </p>
        </motion.div>

        {/* Main Content Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden mb-8 relative"
        >
          {/* Subtle top highlight */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500/20 to-transparent" />
          
          <div className="p-8">
            <p className="text-gray-800 font-medium mb-6 text-lg">
              Você está prestes a perder acesso a um material com:
            </p>

            <ul className="space-y-4 mb-8">
              {[
                "+100 painéis escolares prontos",
                "+500 moldes EVA para imprimir",
                "guia passo a passo de montagem",
                "ideias de murais para o ano inteiro"
              ].map((item, idx) => (
                <motion.li 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + (idx * 0.1) }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />
                  <span className="text-gray-700 font-semibold">{item}</span>
                </motion.li>
              ))}
            </ul>

            <div className="bg-yellow-50 border-2 border-dashed border-yellow-400 rounded-2xl p-6 text-center mb-6 relative overflow-hidden">
              <div className="absolute -top-1 -right-1 bg-yellow-400 text-yellow-900 text-[9px] font-black px-2 py-0.5 rounded-bl-lg uppercase tracking-tighter">
                OFERTA ÚNICA
              </div>
              <p className="text-gray-800 font-bold mb-1">
                Mas para não perder você…
              </p>
              <p className="text-gray-500 text-xs mb-4">
                Liberamos uma condição exclusiva agora:
              </p>
              
              <div className="flex flex-col items-center justify-center">
                <span className="text-gray-400 line-through text-sm font-medium">De R$27,90</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-sm font-bold text-green-600">R$</span>
                  <span className="text-5xl font-black text-green-600 tracking-tighter">
                    19,90
                  </span>
                </div>
                <div className="mt-2 inline-flex items-center gap-1.5 bg-green-100 text-green-700 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wide">
                  <CheckCircle2 className="w-3 h-3" />
                  Pagamento único
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 text-gray-500 text-sm font-medium mb-6">
              <ShieldCheck className="w-4 h-4" />
              <span>Isso dá menos de R$0,20 por painel.</span>
            </div>

            <div className="bg-red-50 border border-red-100 rounded-lg p-4 mb-8">
              <p className="text-red-700 text-sm font-bold flex items-center justify-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Essa é sua última chance antes de sair.
              </p>
              <p className="text-red-600 text-xs text-center mt-1">
                Depois que fechar essa página, essa condição pode não aparecer novamente.
              </p>
            </div>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCTA}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-black py-6 px-6 rounded-2xl text-xl shadow-xl flex items-center justify-center gap-2 transition-all group"
            >
              <span className="uppercase tracking-tight">
                QUERO GARANTIR MEU ACESSO AGORA
              </span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1.5 transition-transform" />
            </motion.button>
          </div>
        </motion.div>
      </main>

      {/* Sticky Bottom Button */}
      <AnimatePresence>
        {showSticky && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] z-40 md:hidden"
          >
            <button
              onClick={handleCTA}
              className="w-full bg-green-500 text-white font-black py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 uppercase text-sm group"
            >
              <span>GARANTIR MEU ACESSO AGORA</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Trust */}
      <footer className="mt-12 text-center px-6">
        <div className="flex items-center justify-center gap-4 opacity-40 grayscale mb-4">
          <ShieldCheck className="w-8 h-8" />
          <div className="h-4 w-px bg-gray-400"></div>
          <span className="font-bold text-sm">COMPRA 100% SEGURA</span>
        </div>
        <p className="text-[10px] text-gray-400 uppercase tracking-widest">
          © 2026 Materiais Pedagógicos Exclusivos
        </p>
      </footer>

      {/* Purchase Notification Popup */}
      <AnimatePresence>
        {showNotification && currentNotification && (
          <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
            className="fixed bottom-32 left-4 md:bottom-8 md:left-8 z-50 bg-white rounded-xl shadow-2xl border border-gray-100 p-3 flex items-center gap-3 max-w-[280px]"
          >
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-gray-900 leading-tight">
                {currentNotification.name}
              </span>
              <span className="text-[11px] text-gray-500 leading-tight">
                {currentNotification.message}
              </span>
              <span className="text-[9px] text-green-600 font-medium mt-0.5">
                há poucos segundos
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
