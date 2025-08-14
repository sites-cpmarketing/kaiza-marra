
'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Instagram, MapPin, Phone, ArrowRight, Menu } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

const CursorGlow = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return <div ref={cursorRef} className="cursor-glow"></div>;
};

const AnimatedButton = ({ className, children, ...props } : React.ComponentProps<typeof Button>) => {
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const button = buttonRef.current;
        if (!button) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = button.getBoundingClientRect();
            button.style.setProperty('--x', `${e.clientX - rect.left}px`);
            button.style.setProperty('--y', `${e.clientY - rect.top}px`);
        };

        button.addEventListener('mousemove', handleMouseMove);
        return () => button.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <Button ref={buttonRef} className={cn("animated-button", className)} {...props}>
            <span className="relative z-10 flex items-center gap-2">{children}</span>
        </Button>
    );
};


const CardTiltEffect = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        const handleMouseMove = (e: MouseEvent) => {
            if (!card) return;
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const rotateY = (x / rect.width - 0.5) * -12; 
            const rotateX = (y / rect.height - 0.5) * 12; 
            card.style.setProperty('--rotate-x', `${rotateX}deg`);
            card.style.setProperty('--rotate-y', `${rotateY}deg`);
            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
        };

        const handleMouseLeave = () => {
            if (!card) return;
            card.style.setProperty('--rotate-x', '0deg');
            card.style.setProperty('--rotate-y', '0deg');
        };

        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            card.removeEventListener('mousemove', handleMouseMove);
            card.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <div ref={cardRef} className={cn("group perspective-1000", className)}>
            {children}
        </div>
    );
};

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const services = [
    {
      title: "Obesidade e Sobrepeso",
      description: "Ajuda no gerenciamento do peso, oferecendo orientações nutricionais personalizadas, planos de alimentação e estratégias para promover a perda de peso de forma saudável e sustentável.",
    },
    {
      title: "Reposição Hormonal",
      description: "Compreendendo as complexidades dos desequilíbrios hormonais, a Dra. Kaiza oferece orientações e tratamentos personalizados para lidar com sintomas relacionados à menopausa, andropausa e outros distúrbios hormonais.",
    },
    {
      title: "Melhoria do Desempenho Esportivo",
      description: "Para atletas e praticantes de atividades físicas,é possível oferecer orientações nutricionais específicas para otimizar o desempenho esportivo, melhorar a recuperação e promover a saúde geral.",
    },
    {
      title: "Suplementação Alimentar",
      description: "A Dra. Kaiza oferece orientações sobre suplementação alimentar, recomendando produtos adequados para suprir deficiências nutricionais específicas e potencializar os resultados dos tratamentos.",
    },
    {
      title: "Distúrbios Alimentares",
      description: "Pode auxiliar no diagnóstico e tratamento de distúrbios alimentares, como anorexia nervosa, bulimia nervosa e transtorno da compulsão alimentar.",
    },
  ];

  const testimonials = [
    {
      name: "Zaira Maria Sampaio Rabelo",
      text: "Gostei muito! Não mediu esforços para explicar e indicar o melhor tratamento. Tem muito conhecimento, logo maior possibilidade de orientações no âmbito no mais integrativo possível. — Obrigada doutora! Sei que com a senhora estou em boas mãos, e não medirei esforços também para seguir o tratamento!",
      aiHint: "stars rating"
    },
    {
      name: "Isadora Fornaro",
      text: "Super atenciosa, atenta em explicar cada detalhe dos exames e como tudo funciona!",
      aiHint: "stars rating"
    },
    {
      name: "Francisco Farias da Silva",
      text: "Ótima profissional, já perdi 10kg praticamente em 1 mês. Muito atencioso e acompanha todo o tratamento.",
      aiHint: "stars rating"
    }
  ];

  const faqs = [
    {
      question: "Quais são os horários de atendimento?",
      answer: "O atendimento presencial ocorre de segunda a sexta, das 8h às 18h. O atendimento online tem horários flexíveis, mediante agendamento."
    },
    {
      question: "Como funciona o atendimento online?",
      answer: "O atendimento online é realizado por videochamada, com a mesma qualidade e atenção do presencial. Todos os materiais e planos são enviados digitalmente."
    },
    {
      question: "Aceita planos de saúde?",
      answer: "Não trabalhamos com convênios para garantir um atendimento completo e sem restrições de tempo, priorizando o bem-estar e as necessidades individuais de cada paciente."
    }
  ]

  const WhatsAppButton = () => (
    <a href="https://api.whatsapp.com/send?phone=5562994992141&text=Ol%C3%A1!%20Vim%20pelo%20site%20e%20gostaria%20de%20agendar%20uma%20consulta%20com%20a%20Dra%20Kaiza" target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-transform hover:scale-110 z-50">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-8 h-8 fill-current"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>
    </a>
  );

  return (
    <div className="bg-background text-foreground noise-bg overflow-x-hidden">
      <CursorGlow />
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-white/10 transition-all duration-300">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#" title="Dra. Kaiza Marra">
            <Image
              src="https://i.postimg.cc/0NKMHTWp/2024-04-kaizamarra-logo.png"
              alt="Logo Dra. Kaiza Marra"
              width={55}
              height={72}
              className="h-14 w-auto"
              data-ai-hint="logo"
            />
          </a>
           <nav className="hidden md:flex items-center gap-x-8">
            <a href="#atuacao" className="animated-link">Atuação</a>
            <a href="#curriculo" className="animated-link">Currículo</a>
            <a href="#depoimentos" className="animated-link">Depoimentos</a>
            <a href="#faq" className="animated-link">FAQ</a>
          </nav>
          <AnimatedButton size="lg" className="hidden md:flex" asChild>
            <a href="https://api.whatsapp.com/send?phone=5562994992141&text=Ol%C3%A1!%20Vim%20pelo%20site%20e%20gostaria%20de%20agendar%20uma%20consulta%20com%20a%20Dra%20Kaiza" target="_blank" rel="noopener noreferrer">AGENDAR CONSULTA</a>
          </AnimatedButton>
          <div className="md:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Abrir menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-background/95 backdrop-blur-lg">
                <nav className="flex flex-col items-center justify-center h-full gap-y-8">
                  <a href="#atuacao" className="animated-link text-2xl" onClick={() => setMobileMenuOpen(false)}>Atuação</a>
                  <a href="#curriculo" className="animated-link text-2xl" onClick={() => setMobileMenuOpen(false)}>Currículo</a>
                  <a href="#depoimentos" className="animated-link text-2xl" onClick={() => setMobileMenuOpen(false)}>Depoimentos</a>
                  <a href="#faq" className="animated-link text-2xl" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
                  <AnimatedButton size="lg" className="mt-8" asChild>
                    <a href="https://api.whatsapp.com/send?phone=5562994992141&text=Ol%C3%A1!%20Vim%20pelo%20site%20e%20gostaria%20de%20agendar%20uma%20consulta%20com%20a%20Dra%20Kaiza" target="_blank" rel="noopener noreferrer">AGENDAR CONSULTA</a>
                  </AnimatedButton>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main>
        <section className="relative pt-24 pb-32 md:pt-32 md:pb-48 overflow-hidden">
          <div className="spotlight"></div>
          <div className="container mx-auto px-6 z-10 relative">
            <div className="grid md:grid-cols-2 gap-8 items-center animate-fade-in-up">
              <div className="text-center md:text-left">
                <p className="text-primary mb-4 animate-fade-in-up" style={{ animationDelay: '200ms' }}>Dra Kaíza Marra Ferreira • CRM GO 29708</p>
                <h1 className="text-clamp-h1 font-semibold text-foreground mb-6 font-headline leading-tight animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                  Seu caminho para uma<br/>vida mais saudável<br/><strong className="text-primary font-bold">começa aqui!</strong>
                </h1>
                <p className="mb-8 text-foreground/80 text-lg max-w-lg mx-auto md:mx-0 animate-fade-in-up" style={{ animationDelay: '400ms' }}>Médica Especialista em Emagrecimento Saudável, Performance Esportiva, Longevidade e Reposição Hormonal.</p>
                <div className="animate-fade-in-up" style={{ animationDelay: '500ms' }}>
                <AnimatedButton size="lg" className="py-4 px-10 group" asChild>
                  <a href="https://api.whatsapp.com/send?phone=5562994992141&text=Ol%C3%A1!%20Vim%20pelo%20site%20e%20gostaria%20de%20agendar%20uma%20consulta%20com%20a%20Dra%20Kaiza" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    AGENDAR CONSULTA
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </AnimatedButton>
                </div>
              </div>
              <div className="hidden md:block relative animate-fade-in-up" style={{ animationDelay: '600ms' }}>
                 <CardTiltEffect>
                    <div className="relative card-tilt">
                      <div className="absolute inset-x-8 bottom-0 bg-primary rounded-3xl h-1/4"></div>
                      <Image
                        src="https://i.postimg.cc/43jtff7L/2024-04-kaizamarra.png"
                        alt="Dra. Kaiza Marra"
                        width={704}
                        height={617}
                        className="rounded-lg shadow-2xl object-cover object-top h-[500px] w-full relative z-10"
                        data-ai-hint="doctor professional"
                        priority
                      />
                       <div className="border-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                </CardTiltEffect>
              </div>
            </div>
          </div>
        </section>

        <section id="atuacao" className="py-20 bg-background/50">
           <div className="container mx-auto px-6 z-10 relative">
            <h2 className="text-clamp-h2 font-semibold text-center mb-16 font-headline text-foreground">Áreas de Atuação</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {services.map((service, index) => (
                 <div key={service.title} className="group text-center p-8 border border-white/10 rounded-xl bg-gradient-to-br from-white/5 to-transparent hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl animate-fade-in-up" style={{ animationDelay: `${100 * index}ms`}}>
                    <h3 className="font-headline font-semibold text-xl text-foreground mb-4">{service.title}</h3>
                    <p className="text-sm text-foreground/70 leading-relaxed">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="curriculo" className="py-24 bg-background">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-7 text-center lg:text-left">
                        <h2 className="text-clamp-h2 font-semibold mb-8 font-headline leading-snug">Uma carreira dedicada à sua saúde e bem-estar</h2>
                        <p className="text-foreground/80 mb-4 leading-relaxed">Com uma trajetória marcada pela excelência e pela busca contínua por conhecimento, a Dra. Kaiza Marra se dedica a oferecer um atendimento que integra as mais recentes inovações da medicina com um cuidado humano e personalizado.</p>
                        <p className="text-foreground/80 mb-8 leading-relaxed">Sua formação e participação em eventos de renome nacional e internacional atestam seu compromisso em proporcionar os melhores resultados para a sua saúde e qualidade de vida.</p>
                        <AnimatedButton size="lg" className="py-4 px-8" asChild>
                           <a href="https://api.whatsapp.com/send?phone=5562994992141&text=Ol%C3%A1!%20Vim%20pelo%20site%20e%20gostaria%20de%20agendar%20uma%20consulta%20com%20a%20Dra%20Kaiza" target="_blank" rel="noopener noreferrer">Conheça minha trajetória</a>
                        </AnimatedButton>
                    </div>
                    <div className="lg:col-span-5 relative order-first lg:order-last">
                       <div className="md:hidden">
                          <Image src="https://i.postimg.cc/RVPWCS27/2024-08-RQE-Cirurgiao-Vascular-No-16-213-RQE-Cirurgiao-Vascular-No-16-213-1.png" alt="Dra. Kaiza Marra segurando equipamento" width={380} height={475} className="rounded-xl shadow-xl object-cover mx-auto mb-8" data-ai-hint="doctor holding equipment" />
                        </div>
                        <div className="hidden md:block">
                            <CardTiltEffect>
                                <div className="relative aspect-[4/5] max-w-sm mx-auto">
                                  <Image src="https://i.postimg.cc/RVPWCS27/2024-08-RQE-Cirurgiao-Vascular-No-16-213-RQE-Cirurgiao-Vascular-No-16-213-1.png" alt="Dra. Kaiza Marra segurando equipamento" layout="fill" className="rounded-xl shadow-xl object-cover card-tilt" data-ai-hint="doctor holding equipment" />
                                  <div className="absolute inset-0 rounded-xl border-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                </div>
                            </CardTiltEffect>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section id="atendimento" className="py-24 bg-background/50 relative">
             <div className="spotlight-2"></div>
            <div className="container mx-auto px-6 z-10 relative">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-clamp-h2 font-semibold mb-4 font-headline leading-snug">Atendimento Personalizado Onde Você Estiver</h2>
                        <p className="text-foreground/80 mb-8 leading-relaxed">Oferecemos atendimento online para todo o Brasil, além de presencial em Goiânia e Patrocínio – MG, com foco em cuidado personalizado e de alta qualidade. Não trabalhamos com convênios para garantir um atendimento sem restrições de tempo, priorizando o bem-estar e as necessidades individuais de cada paciente.</p>
                        <AnimatedButton size="lg" className="py-4 px-10 group" asChild>
                            <a href="https://api.whatsapp.com/send?phone=5562994992141&text=Ol%C3%A1!%20Vim%20pelo%20site%20e%20gostaria%20de%20agendar%20uma%20consulta%20com%20a%20Dra%20Kaiza" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                              AGENDAR CONSULTA
                              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                              </a>
                        </AnimatedButton>
                    </div>
                    <CardTiltEffect className="rounded-xl overflow-hidden shadow-2xl h-96">
                        <iframe
                            width="100%"
                            height="100%"
                            loading="lazy"
                            allowFullScreen
                            src="https://maps.google.com/maps?q=Av.%20Portugal%2C%20869%20-%20St.%20MaristaGoi%C3%A2nia%20-%20GO&t=m&z=15&output=embed&iwloc=near"
                            className="card-tilt">
                        </iframe>
                    </CardTiltEffect>
                </div>
            </div>
        </section>

        <section id="depoimentos" className="py-24 bg-background">
          <div className="container mx-auto px-6">
            <h2 className="text-clamp-h2 font-semibold text-center mb-12 font-headline text-foreground">O que falam sobre mim?</h2>
            <div className="grid grid-cols-1 gap-8 max-w-2xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="bg-background/50 border-white/10 shadow-lg rounded-xl p-8 text-center flex flex-col">
                  <p className="text-foreground/70 mb-6 italic leading-relaxed flex-grow">"{testimonial.text}"</p>
                  <span className="font-semibold text-lg font-headline text-foreground/90 mt-auto">{testimonial.name}</span>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="py-24 bg-background/50">
           <div className="container mx-auto px-6 max-w-4xl z-10 relative">
              <h2 className="text-clamp-h2 font-semibold text-center mb-12 font-headline">Perguntas Frequentes</h2>
              <Accordion type="single" collapsible className="w-full space-y-4">
                {faqs.map((faq, index) => (
                   <AccordionItem value={`item-${index+1}`} key={index} className="bg-background/50 border border-white/10 rounded-lg px-6 transition-all hover:bg-white/5">
                      <AccordionTrigger className="text-lg font-semibold text-left text-foreground hover:no-underline py-6">{faq.question}</AccordionTrigger>
                      <AccordionContent className="text-foreground/70 pb-6 leading-relaxed">
                         {faq.answer}
                      </AccordionContent>
                   </AccordionItem>
                ))}
              </Accordion>
           </div>
        </section>
      </main>

      <footer className="bg-background border-t border-white/10 pt-16 pb-8">
        <div className="container mx-auto px-6 z-10 relative">
            <div className="grid md:grid-cols-12 gap-8 text-center md:text-left">
                <div className="md:col-span-4 flex flex-col items-center md:items-start">
                    <a href="#" title="Dra. Kaiza Marra" className="mb-4">
                        <Image
                          src="https://i.postimg.cc/0NKMHTWp/2024-04-kaizamarra-logo.png"
                          alt="Logo Dra. Kaiza Marra"
                          width={60}
                          height={78}
                          className="h-16 w-auto"
                          data-ai-hint="logo"
                        />
                    </a>
                    <p className="text-sm text-foreground/60 max-w-sm">Dra. Kaiza Marra, CRM GO 29708. Cuidado e excelência em nutrologia para uma vida mais saudável.</p>
                </div>
                <div className="md:col-span-2">
                     <h3 className="text-lg font-semibold mb-4 font-headline text-foreground">Navegação</h3>
                     <ul className="space-y-2">
                        <li><a href="#atuacao" className="animated-link">Atuação</a></li>
                        <li><a href="#curriculo" className="animated-link">Currículo</a></li>
                        <li><a href="#depoimentos" className="animated-link">Depoimentos</a></li>
                        <li><a href="#faq" className="animated-link">FAQ</a></li>
                     </ul>
                </div>
                <div className="md:col-span-3">
                     <h3 className="text-lg font-semibold mb-4 font-headline text-foreground">Endereços</h3>
                     <address className="not-italic space-y-4">
                     <div className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-start gap-3 text-foreground/80">
                        <MapPin className="w-5 h-5 mt-1 shrink-0 text-primary" />
                        <span className='text-center md:text-left'>Av. Portugal, 869 - St. Marista<br />Goiânia - GO</span>
                     </div>
                      <div className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-start gap-3 text-foreground/80">
                        <MapPin className="w-5 h-5 mt-1 shrink-0 text-primary" />
                        <span className='text-center md:text-left'>Galeria Horizonte Boulevard - R. Mal. Floriano, 43 - Centro, Patrocínio - MG, 38740-000</span>
                      </div>
                     </address>
                </div>
                <div className="md:col-span-3">
                    <h3 className="text-lg font-semibold mb-4 font-headline text-foreground">Siga-me</h3>
                    <div className="flex justify-center md:justify-start items-center gap-4">
                        <a href="https://www.instagram.com/dra.kaiza_marra/" target="_blank" rel="noopener noreferrer" className="text-foreground/80 hover:text-primary transition-colors">
                            <Instagram className="w-6 h-6" />
                        </a>
                         <a href="https://api.whatsapp.com/send?phone=5562994992141" target="_blank" rel="noopener noreferrer" className="text-foreground/80 hover:text-primary transition-colors flex items-center gap-2">
                            <Phone className="w-5 h-5" />
                            <span className="text-sm">(62) 99499-2141</span>
                        </a>
                    </div>
                </div>
            </div>
             <div className="text-center text-foreground/50 text-sm pt-12 mt-8 border-t border-white/10">
                <p>Todos os direitos reservados | Dra. Kaiza Marra © {new Date().getFullYear()}</p>
            </div>
        </div>
      </footer>
      <WhatsAppButton />
    </div>
  );
}

    