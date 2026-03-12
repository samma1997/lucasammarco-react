export interface Service {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  longDescription: string;
  icon: string;
  color: string;
  features: string[];
  process: { step: number; title: string; description: string }[];
  faq: { question: string; answer: string }[];
  includes: string[];
}

export const SERVICES: Service[] = [
  {
    id: 'seo-geo',
    slug: 'seo-geo',
    title: 'SEO & GEO as a Service',
    shortTitle: 'SEO & GEO',
    description:
      'Portati in cima a Google con una strategia SEO completa: ottimizzazione tecnica, contenuti, link building e local SEO per dominare le ricerche locali.',
    longDescription:
      'In un mercato sempre più competitivo, essere trovati su Google non è un optional: è una necessità. La mia strategia SEO combina ottimizzazione tecnica profonda, content strategy e link building di qualità. Con il GEO (Generative Engine Optimization), ti preparo anche per le ricerche AI come ChatGPT Search e Google AI Overviews.',
    icon: 'search',
    color: '#045CB4',
    includes: [
      'Audit SEO tecnico completo',
      'Ottimizzazione on-page e meta tag',
      'Strategia keyword e content plan',
      'Local SEO e Google Business Profile',
      'Link building etico e duraturo',
      'GEO optimization per AI search',
      'Report mensile con KPI',
      'Analisi competitor continua',
    ],
    features: [
      'SEO Tecnico avanzato',
      'Local SEO per ricerche locali',
      'GEO optimization per AI',
      'Content strategy e copywriting',
      'Link building etico',
      'Monitoraggio posizioni H24',
    ],
    process: [
      {
        step: 1,
        title: 'Audit e Analisi',
        description:
          'Analisi completa del sito, dei competitor e delle opportunità keyword nel tuo settore.',
      },
      {
        step: 2,
        title: 'Strategia Personalizzata',
        description:
          'Piano SEO su misura con priorità, obiettivi e timeline chiari per massimizzare il ROI.',
      },
      {
        step: 3,
        title: 'Ottimizzazione Tecnica',
        description:
          'Correzione di tutti i problemi tecnici: velocità, structured data, crawlability, Core Web Vitals.',
      },
      {
        step: 4,
        title: 'Contenuti e Link Building',
        description:
          'Creazione di contenuti ottimizzati e acquisizione di link di qualità da siti autorevoli.',
      },
      {
        step: 5,
        title: 'Monitoraggio e Report',
        description:
          'Report mensile dettagliato con posizioni, traffico, conversioni e prossimi step.',
      },
    ],
    faq: [
      {
        question: 'Quanto tempo ci vuole per vedere risultati SEO?',
        answer:
          'Generalmente i primi risultati si vedono in 2-3 mesi. Risultati significativi arrivano tra i 4 e 6 mesi. La SEO è un investimento a lungo termine che porta traffico organico costante.',
      },
      {
        question: "Cos'è il GEO optimization e perché è importante?",
        answer:
          "GEO (Generative Engine Optimization) ottimizza il tuo sito per essere citato nelle risposte AI di ChatGPT, Google AI Overviews e Perplexity. Con l'arrivo dell'AI search, è fondamentale adattare la strategia.",
      },
      {
        question: 'La SEO locale è diversa dalla SEO tradizionale?',
        answer:
          'Sì, la Local SEO si concentra sulle ricerche geolocalizzate ("web developer Monza"), su Google Business Profile, recensioni e citazioni NAP coerenti. Ideale per attività locali.',
      },
      {
        question: 'Garantite le prime posizioni su Google?',
        answer:
          'Nessuno può garantire posizioni specifiche su Google. Posso garantire un lavoro professionale, trasparente e basato su best practice che massimizzano le probabilità di successo.',
      },
      {
        question: 'Posso monitorare i progressi in tempo reale?',
        answer:
          'Assolutamente sì. Avrai accesso a un dashboard personalizzato e riceverai report mensili dettagliati con tutte le metriche rilevanti.',
      },
    ],
  },
  {
    id: 'software',
    slug: 'software',
    title: 'Sviluppo Software Custom',
    shortTitle: 'Software Custom',
    description:
      'Software su misura per le tue esigenze aziendali: dashboard, CRM, gestionali, ERP e tool interni che automatizzano i processi e aumentano la produttività.',
    longDescription:
      'Ogni azienda ha processi unici che i software generici non riescono a soddisfare completamente. Sviluppo soluzioni software custom che si adattano perfettamente al tuo business, integrandosi con i sistemi esistenti e crescendo con te. Dal CRM aziendale al gestionale di magazzino, fino alle dashboard analytics avanzate.',
    icon: 'code',
    color: '#046BD2',
    includes: [
      'Analisi requisiti e UX design',
      'Architettura scalabile',
      'Frontend React/TypeScript',
      'Backend Node.js o Python',
      'Database design e ottimizzazione',
      'Integrazione API esterne',
      'Testing automatizzato',
      'Documentazione tecnica',
      'Manutenzione e aggiornamenti',
    ],
    features: [
      'Dashboard e analytics avanzate',
      'CRM e gestione clienti',
      'Gestionali e ERP',
      'Integrazione sistemi esistenti',
      'API REST e GraphQL',
      'Mobile-responsive o app native',
    ],
    process: [
      {
        step: 1,
        title: 'Discovery e Requisiti',
        description:
          'Workshop di analisi per capire processi, pain point e obiettivi. Definizione precisa di funzionalità e roadmap.',
      },
      {
        step: 2,
        title: 'Design UX/UI',
        description:
          'Prototipo interattivo per validare il flusso utente prima di scrivere una riga di codice.',
      },
      {
        step: 3,
        title: 'Sviluppo Agile',
        description:
          'Sviluppo iterativo con sprint bisettimanali. Dimostrazione costante dei progressi e feedback continuo.',
      },
      {
        step: 4,
        title: 'Testing e QA',
        description:
          'Test unitari, di integrazione e UAT con gli utenti finali. Zero bug in produzione è il nostro standard.',
      },
      {
        step: 5,
        title: 'Deploy e Formazione',
        description:
          'Deploy in produzione, migrazione dati e formazione del team. Supporto post-lancio incluso.',
      },
    ],
    faq: [
      {
        question: 'Quanto costa sviluppare un software custom?',
        answer:
          'Il costo dipende dalla complessità. Un tool interno semplice parte da 3.000€, mentre un gestionale completo può arrivare a 20.000€+. Contattami per un preventivo preciso basato sui tuoi requisiti.',
      },
      {
        question: 'Quali tecnologie utilizzate?',
        answer:
          'Frontend: React, Next.js, TypeScript. Backend: Node.js, Python, FastAPI. Database: PostgreSQL, MongoDB, Redis. Cloud: AWS, Vercel, Railway. Scelgo sempre lo stack più adatto al progetto.',
      },
      {
        question: 'Potete integrare il software con i sistemi che già usiamo?',
        answer:
          "Sì, sviluppo connettori per i principali software aziendali: Salesforce, HubSpot, SAP, QuickBooks, Google Workspace, Microsoft 365 e molti altri tramite API.",
      },
      {
        question: "Il software sarà nostro o avrete accesso dopo lo sviluppo?",
        answer:
          'Il software e il codice sorgente sono completamente tuoi. Ricevi tutto il codice, la documentazione e le credenziali. Sei libero di gestirlo come preferisci.',
      },
      {
        question: 'Offrite manutenzione e aggiornamenti?',
        answer:
          'Sì, offro piani di manutenzione mensili che includono aggiornamenti di sicurezza, bug fix, piccole modifiche e supporto prioritario.',
      },
    ],
  },
  {
    id: 'web-app',
    slug: 'web-app',
    title: 'Web App & SaaS',
    shortTitle: 'Web App & SaaS',
    description:
      'Dal MVP alla piattaforma SaaS scalabile: costruisco web app moderne con autenticazione, pagamenti, real-time features e architetture pronte per crescere.',
    longDescription:
      'Hai un\'idea per un prodotto digitale? Costruisco MVP funzionali in 4-8 settimane per validare il mercato, poi scala verso una piattaforma SaaS robusta. Dall\'autenticazione ai pagamenti Stripe, dalle notifiche real-time alla gestione degli abbonamenti: costruisco il "full stack" del tuo prodotto.',
    icon: 'layers',
    color: '#58D0F5',
    includes: [
      'Architettura SaaS multi-tenant',
      'Autenticazione OAuth e JWT',
      'Integrazione Stripe per pagamenti',
      'Dashboard admin e analytics',
      'Notifiche email e real-time',
      'API documentata',
      'CI/CD e DevOps',
      'Scalabilità cloud-native',
    ],
    features: [
      'MVP in 4-8 settimane',
      'Autenticazione completa',
      'Pagamenti e abbonamenti',
      'Real-time con WebSocket',
      'Dashboard analytics',
      'Scalabilità automatica',
    ],
    process: [
      {
        step: 1,
        title: 'Validazione Idea',
        description:
          "Analisi del mercato, dei competitor e definizione dell'MVP minimo necessario per validare il prodotto.",
      },
      {
        step: 2,
        title: 'MVP Development',
        description:
          "Sviluppo veloce delle funzionalità core. L'obiettivo è avere qualcosa nelle mani degli utenti il prima possibile.",
      },
      {
        step: 3,
        title: 'Lancio e Feedback',
        description:
          'Deploy del MVP, raccolta feedback degli early adopter e analisi dati per capire cosa sviluppare.',
      },
      {
        step: 4,
        title: 'Iterazione e Scale',
        description:
          "Sviluppo iterativo basato sui dati reali. Aggiunta di feature su feature basandosi sull'utilizzo reale.",
      },
    ],
    faq: [
      {
        question: 'Che differenza c\'è tra un sito web e una web app?',
        answer:
          "Un sito web è principalmente informativo. Una web app è interattiva: gli utenti si registrano, creano contenuti, interagiscono con dati in tempo reale. Pensa a Notion, Trello, o Spotify.",
      },
      {
        question: 'Quanto ci vuole per sviluppare un MVP?',
        answer:
          'Un MVP ben definito richiede 4-8 settimane. La chiave è definire chiaramente il "minimum" di funzionalità necessarie per validare il valore del prodotto.',
      },
      {
        question: 'Gestite i pagamenti e gli abbonamenti?',
        answer:
          'Sì, integro Stripe per pagamenti una tantum, abbonamenti mensili/annuali, trial gratuiti e gestione delle fatture. Stripe è lo standard di riferimento per i SaaS.',
      },
      {
        question: 'La web app funzionerà su mobile?',
        answer:
          'Tutte le web app che sviluppo sono mobile-first e responsive. Se serve anche una app nativa iOS/Android, posso svilupparla con React Native condividendo il codice.',
      },
      {
        question: 'Come gestite la scalabilità?',
        answer:
          'Uso architetture cloud-native su AWS o Vercel con auto-scaling. Il sistema si adatta automaticamente ai picchi di traffico senza downtime.',
      },
    ],
  },
  {
    id: 'ai-services',
    slug: 'ai-services',
    title: 'Soluzioni AI-Powered',
    shortTitle: 'AI Services',
    description:
      "Integra l'intelligenza artificiale nel tuo business: chatbot intelligenti, analisi dati con AI, automazione documenti e workflow potenziati da LLM.",
    longDescription:
      "L'AI non è più il futuro: è il presente. Aiuto le aziende a integrare in modo pratico e immediato gli strumenti AI più potenti. Chatbot che rispondono come un esperto del tuo settore, sistemi che analizzano documenti e contratti, dashboard predittive basate su dati storici. Tutto personalizzato per il tuo business.",
    icon: 'brain',
    color: '#EAFD9C',
    includes: [
      'Chatbot su GPT-4 / Claude / Gemini',
      'Knowledge base aziendale AI',
      'Analisi documenti con AI',
      'Workflow automation con LLM',
      'Dashboard predittive',
      'Fine-tuning modelli custom',
      'Integrazione con sistemi esistenti',
      'Formazione team',
    ],
    features: [
      'Chatbot intelligenti 24/7',
      'Analisi documenti automatica',
      'Predizione e analytics AI',
      'Content generation',
      'Computer vision',
      'Voice AI e transcription',
    ],
    process: [
      {
        step: 1,
        title: 'AI Readiness Assessment',
        description:
          "Analisi dei processi aziendali per identificare dove l'AI ha il maggiore impatto e il miglior ROI.",
      },
      {
        step: 2,
        title: 'Proof of Concept',
        description:
          'Sviluppo rapido di un prototipo funzionante per validare il valore della soluzione AI.',
      },
      {
        step: 3,
        title: 'Sviluppo e Integrazione',
        description:
          'Costruzione della soluzione completa con integrazione nei sistemi aziendali esistenti.',
      },
      {
        step: 4,
        title: 'Training e Ottimizzazione',
        description:
          'Fine-tuning del modello con i dati aziendali e ottimizzazione continua delle performance.',
      },
    ],
    faq: [
      {
        question: "Quale modello AI utilizzate? GPT-4, Claude o altri?",
        answer:
          "Dipende dal caso d'uso. Per chatbot conversazionali uso spesso GPT-4 o Claude. Per analisi documenti Anthropic Claude è eccellente. Per task custom posso fare fine-tuning di modelli open-source.",
      },
      {
        question: 'I dati aziendali sono al sicuro?',
        answer:
          "Assolutamente. Configuriamo sempre l'AI per non utilizzare i dati aziendali per il training dei modelli. Possiamo usare deployment privati on-premise o su cloud dedicato.",
      },
      {
        question: 'Un chatbot AI può davvero rispondere alle domande dei clienti?',
        answer:
          "Sì, se addestrato correttamente sulla tua knowledge base (manuali, FAQ, prezzi, policy) risponde al 80-90% delle domande. Le domande complesse vengono escalate a un umano.",
      },
      {
        question: "Quanto costa un'integrazione AI?",
        answer:
          "Un chatbot base parte da 2.000€. Soluzioni più complesse con RAG e integrazione CRM partono da 5.000€. I costi operativi mensili delle API AI sono generalmente molto contenuti.",
      },
      {
        question: 'Servono competenze tecniche per usare le soluzioni AI?',
        answer:
          'No. Costruisco interfacce intuitive che chiunque può usare. Include anche formazione del team e documentazione per il corretto utilizzo.',
      },
    ],
  },
  {
    id: 'automazione',
    slug: 'automazione',
    title: 'Automazione Aziendale AI',
    shortTitle: 'Automazione',
    description:
      'Elimina i task ripetitivi con workflow automatizzati: integra Make, Zapier, n8n e soluzioni RPA per connettere tutti i tuoi strumenti e risparmiare ore ogni giorno.',
    longDescription:
      "Quante ore al giorno la tua azienda spreca in attività manuali e ripetitive? Inserimento dati, invio email di follow-up, report settimanali, sincronizzazione tra sistemi? L'automazione aziendale elimina questi sprechi, riduce gli errori umani e libera il team per attività ad alto valore. Con Make, Zapier, n8n e soluzioni RPA custom, connetto tutti i tuoi strumenti.",
    icon: 'zap',
    color: '#046BD2',
    includes: [
      'Audit processi aziendali',
      'Workflow automation con Make/n8n',
      'Integrazione CRM e ERP',
      'Automazione email e comunicazioni',
      'Report automatizzati',
      'RPA per sistemi legacy',
      'Monitoraggio e alerting',
      'Documentazione workflow',
    ],
    features: [
      'Make / Zapier / n8n',
      'RPA con Python',
      'Integrazione CRM',
      'Email automation',
      'Report automatici',
      'Alert e notifiche',
    ],
    process: [
      {
        step: 1,
        title: 'Process Mapping',
        description:
          'Mappatura completa dei processi aziendali per identificare i colli di bottiglia e le opportunità di automazione.',
      },
      {
        step: 2,
        title: 'ROI Analysis',
        description:
          'Calcolo del risparmio di tempo e costi per ogni automazione proposta. Priorità basate sul ritorno.',
      },
      {
        step: 3,
        title: 'Build e Test',
        description:
          'Sviluppo dei workflow con test approfonditi per garantire affidabilità e gestione degli errori.',
      },
      {
        step: 4,
        title: 'Deploy e Monitoring',
        description:
          'Attivazione in produzione con monitoraggio H24 e alert in caso di anomalie.',
      },
    ],
    faq: [
      {
        question: 'Cosa posso automatizzare?',
        answer:
          "Praticamente qualsiasi processo ripetitivo: lead nurturing, fatturazione, onboarding clienti, sincronizzazione dati tra CRM e ERP, report settimanali, social media posting, email follow-up e molto altro.",
      },
      {
        question: 'Meglio Make, Zapier o n8n?',
        answer:
          "Dipende. Zapier è semplice e ideale per automazioni base. Make (ex Integromat) è più potente e flessibile. n8n è open-source e ideale per chi vuole hosting self-managed. Scelgo io il tool più adatto.",
      },
      {
        question: 'Cosa succede se un workflow va in errore?',
        answer:
          'Tutti i workflow che costruisco hanno gestione degli errori robusta: notifiche immediate, retry automatici e log dettagliati. In caso di problemi, sono avvisato prima di te.',
      },
      {
        question: 'Quanto si risparmia con le automazioni?',
        answer:
          "In media le aziende risparmiano 5-15 ore di lavoro settimanale per ogni workflow automatizzato. Un'automazione semplice si ripaga in 2-3 mesi.",
      },
      {
        question: 'Posso gestire i workflow da solo dopo che li avete configurati?',
        answer:
          'Sì, creo sempre documentazione dettagliata e formo il team. Make e n8n hanno interfacce visual intuitive. Offro anche supporto mensile per modifiche e nuovi workflow.',
      },
    ],
  },
  {
    id: 'ecommerce',
    slug: 'ecommerce',
    title: 'E-Commerce Avanzato',
    shortTitle: 'E-Commerce',
    description:
      'Negozi online che convertono: Shopify, WooCommerce o custom con AI per raccomandazioni prodotti, search intelligente e personalizzazione che aumenta il fatturato.',
    longDescription:
      "Un e-commerce moderno non è solo un catalogo prodotti online. È un ecosistema che attrae clienti, li guida all'acquisto e li fidelizza. Costruisco negozi online ad alta conversione con search intelligente, raccomandazioni AI personalizzate, checkout ottimizzato e integrazione con tutti i canali di vendita.",
    icon: 'shopping-cart',
    color: '#045CB4',
    includes: [
      'Setup Shopify / WooCommerce / Custom',
      'Design UI/UX orientato alla conversione',
      'Product catalog e gestione varianti',
      'Search intelligente con AI',
      'Raccomandazioni prodotti AI',
      'Checkout ottimizzato',
      'Integrazione magazzino e logistics',
      'SEO e-commerce avanzato',
      'Analytics e conversion tracking',
    ],
    features: [
      'Shopify / WooCommerce / Custom',
      'Search AI-powered',
      'Raccomandazioni personalizzate',
      'Checkout ottimizzato',
      'Omnichannel integration',
      'Analytics avanzate',
    ],
    process: [
      {
        step: 1,
        title: 'E-Commerce Strategy',
        description:
          'Analisi del mercato, dei competitor e definizione della strategia per massimizzare conversioni e revenue.',
      },
      {
        step: 2,
        title: 'Design e UX',
        description:
          "Design del negozio ottimizzato per la conversione: product page, carrello, checkout. Ogni elemento è testato per massimizzare l'acquisto.",
      },
      {
        step: 3,
        title: 'Sviluppo e Integrazioni',
        description:
          'Sviluppo della piattaforma con tutte le integrazioni: pagamenti, logistica, CRM, email marketing, analytics.',
      },
      {
        step: 4,
        title: 'Ottimizzazione e Crescita',
        description:
          'A/B testing, analisi del funnel, ottimizzazione SEO e-commerce. Crescita continua delle conversioni nel tempo.',
      },
    ],
    faq: [
      {
        question: 'Shopify o WooCommerce: quale scegliere?',
        answer:
          "Shopify è ideale per chi vuole semplicità e scalabilità senza gestire l'infrastruttura. WooCommerce è più flessibile e personalizzabile ma richiede più manutenzione. Per store grandi o con esigenze uniche, sviluppo soluzioni custom.",
      },
      {
        question: 'Come aumentate il tasso di conversione?',
        answer:
          "Con design UX orientato alla conversione, checkout in 1-click, social proof, urgency/scarcity, raccomandazioni AI personalizzate e ottimizzazione continua basata su dati reali.",
      },
      {
        question: 'Gestite anche i prodotti e il catalogo?',
        answer:
          "Posso configurare l'importazione massiva dei prodotti, gestire varianti, bundle e prodotti correlati. Posso anche integrare con il tuo ERP per sincronizzazione automatica stock.",
      },
      {
        question: 'Come funzionano le raccomandazioni AI?',
        answer:
          "L'AI analizza il comportamento di acquisto e navigazione per suggerire prodotti rilevanti (\"Potrebbe piacerti...\", \"Chi ha acquistato X ha anche preso Y\"). Aumenta il carrello medio del 15-30%.",
      },
      {
        question: 'Posso vendere anche su Amazon e Instagram?',
        answer:
          "Sì, integro il negozio con i principali marketplace (Amazon, eBay) e canali social (Instagram Shopping, TikTok Shop, Google Shopping) per una strategia omnichannel completa.",
      },
    ],
  },
];
