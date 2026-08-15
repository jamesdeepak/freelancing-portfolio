import React from 'react';
import { Phone, MessageSquare, Mail, Calendar } from 'lucide-react';

export default function ContactActions({ navigate }) {
  const actions = [
    {
      label: 'Call Me',
      value: '9500142806',
      href: 'tel:9500142806',
      icon: Phone,
      color: 'bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-100 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-900/30'
    },
    {
      label: 'WhatsApp',
      value: '9500142806',
      href: 'https://wa.me/919500142806',
      icon: MessageSquare,
      color: 'bg-green-50 text-green-700 hover:bg-green-100 border-green-100 dark:bg-green-950/20 dark:text-green-400 dark:border-green-900/30',
      external: true
    },
    {
      label: 'Email Me',
      value: 'deepak.ai.tech@gmail.com',
      href: 'mailto:deepak.ai.tech@gmail.com',
      icon: Mail,
      color: 'bg-amber-50 text-amber-700 hover:bg-amber-100 border-amber-100 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/30'
    },
    {
      label: 'Start a Project',
      value: 'Inquiry Form',
      onClick: () => navigate('/client-register'),
      icon: Calendar,
      color: 'bg-brand/5 text-brand hover:bg-brand/10 border-brand/20 dark:bg-brand/10 dark:text-cyan-400 dark:border-brand/30 dark:hover:bg-brand/20'
    }
  ];

  return (
    <section className="py-8 bg-white/50 dark:bg-slate-900/50 border-y border-gray-100 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {actions.map((act, index) => {
            const Icon = act.icon;
            const cardClasses = `flex flex-col items-center justify-center p-5 rounded-xl border text-center transition-all duration-200 hover:-translate-y-0.5 cursor-pointer ${act.color}`;
            
            if (act.onClick) {
              return (
                <button key={index} onClick={act.onClick} className={cardClasses} type="button">
                  <Icon className="w-6 h-6 mb-2" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                    {act.label}
                  </span>
                  <span className="text-sm font-bold mt-1">{act.value}</span>
                </button>
              );
            }

            return (
              <a
                key={index}
                href={act.href}
                target={act.external ? '_blank' : undefined}
                rel={act.external ? 'noopener noreferrer' : undefined}
                className={cardClasses}
              >
                <Icon className="w-6 h-6 mb-2" />
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                  {act.label}
                </span>
                <span className="text-sm font-bold mt-1">{act.value}</span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
