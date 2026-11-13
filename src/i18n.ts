export type Locale = 'fr' | 'en';

export interface CopyBundle {
  nav: {
    services: string;
    tarifs: string;
    entreprises: string;
    contact: string;
    cta: string;
  };
  hero: {
    kicker: string;
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    tapHint: string;
  };
  sim: {
    headerTitle: string;
    dragHint: string;
    pickup: string;
    dropoff: string;
    distance: string;
    quote: string;
    countdown: string;
    co2: string;
    dispatchBtn: string;
    presetsLabel: string;
    vehicles: {
      moto: { label: string; spec: string };
      cargo: { label: string; spec: string };
      van: { label: string; spec: string };
    };
  };
  stats: Array<{
    value: string;
    numericTarget?: number;
    prefix?: string;
    suffix?: string;
    label: string;
    detail: string;
  }>;
  services: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: {
      moto: {
        num: string;
        title: string;
        desc: string;
        specs: string;
        action: string;
      };
      cargo: {
        num: string;
        title: string;
        desc: string;
        specs: string;
        action: string;
      };
      van: {
        num: string;
        title: string;
        desc: string;
        specs: string;
        action: string;
      };
      api: {
        num: string;
        title: string;
        desc: string;
        specs: string;
        copy: string;
        copied: string;
      };
    };
  };
  how: {
    eyebrow: string;
    title: string;
    subtitle: string;
    steps: Array<{
      num: string;
      title: string;
      desc: string;
      previewTitle: string;
      previewSubtitle: string;
      metrics: Array<{ label: string; val: string }>;
    }>;
  };
  proof: {
    eyebrow: string;
    title: string;
    subtitle: string;
    guarantees: Array<{ title: string; detail: string }>;
    testimonials: Array<{
      quote: string;
      author: string;
      role: string;
      company: string;
      outcome: string;
    }>;
  };
  contact: {
    eyebrow: string;
    title: string;
    subtitle: string;
    form: {
      nameLabel: string;
      namePlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      phoneLabel: string;
      phonePlaceholder: string;
      routeLabel: string;
      routePlaceholder: string;
      vehicleLabel: string;
      submit: string;
      successTitle: string;
      successBody: string;
      reset: string;
      errors: {
        name: string;
        email: string;
        phone: string;
        route: string;
      };
    };
  };
  footer: {
    tagline: string;
    newsletterTitle: string;
    newsletterPlaceholder: string;
    newsletterBtn: string;
    newsletterSuccess: string;
    newsletterError: string;
    linksTitle: string;
    legalTitle: string;
    legalItems: Array<{ id: 'mentions' | 'cgv' | 'rgpd'; label: string }>;
    standaloneLabel: string;
    copyright: string;
  };
  dispatchLabel: string;
  demoModal: {
    title: string;
    subtitle: string;
    steps: Array<{ time: string; event: string; detail: string }>;
    replay: string;
    close: string;
  };
  bookingModal: {
    title: string;
    subtitle: string;
    pickupLabel: string;
    dropoffLabel: string;
    vehicleLabel: string;
    emailLabel: string;
    confirm: string;
    confirmedTitle: string;
    confirmedBody: string;
  };
}

export const COPY: Record<Locale, CopyBundle> = {
  fr: {
    nav: {
      services: 'Services',
      tarifs: 'Tarifs',
      entreprises: 'Entreprises',
      contact: 'Contact',
      cta: 'Démarrer',
    },
    hero: {
      kicker: 'Paris · Lyon · Marseille · Réseau express 24/7',
      title: 'La logistique urbaine instantanée, expédiée en quelques secondes.',
      subtitle:
        'Coursiers B2B et B2C à la demande : motos électriques, vélos-cargos et utilitaires zéro émission déployés en moins de 35 minutes partout en France.',
      ctaPrimary: 'Commander un coursier',
      ctaSecondary: 'Voir la démo interactive',
      tapHint: 'Cliquez n’importe où sur l’écran pour tester le moteur Tap-to-Dispatch.',
    },
    sim: {
      headerTitle: 'Simulateur de course en direct · Paris',
      dragHint: 'Déplacez les points A et B sur la carte',
      pickup: 'Enlèvement (A)',
      dropoff: 'Livraison (B)',
      distance: 'Distance',
      quote: 'Tarif HT',
      countdown: 'Chrono livraison',
      co2: 'CO₂ économisé',
      dispatchBtn: 'Expédier ce trajet',
      presetsLabel: 'Trajets fréquents',
      vehicles: {
        moto: { label: 'Moto', spec: 'Max 15 kg · Ultra-rapide' },
        cargo: { label: 'Cargo', spec: 'Max 150 kg · Crit’Air 0' },
        van: { label: 'Van', spec: 'Max 1 200 kg · Palettes' },
      },
    },
    stats: [
      {
        value: '142 840+',
        numericTarget: 142840,
        suffix: '+',
        label: 'Livraisons réalisées',
        detail: 'Courses urbaines validées sur les 12 derniers mois',
      },
      {
        value: '< 35 min',
        label: 'Délai moyen porte-à-porte',
        detail: 'De la validation au dépôt sur Paris intra-muros',
      },
      {
        value: '480',
        numericTarget: 480,
        label: 'Coursiers actifs',
        detail: 'Flotte électrique et cargos mobilisables 7j/7',
      },
      {
        value: '99.4%',
        label: 'Satisfaction & SLA tenu',
        detail: 'Preuve photo et signature numérique à chaque remise',
      },
    ],
    services: {
      eyebrow: 'Capacités & Flotte',
      title: 'Un véhicule calibré pour chaque urgence urbaine.',
      subtitle:
        'Sélectionnez une catégorie pour ajuster instantanément votre simulateur ou lancer une demande directe.',
      items: {
        moto: {
          num: '01.',
          title: 'Coursier Moto & Scooter Express',
          desc: 'Plis juridiques, échantillons médicaux, pièces détachées et achats retail urgents livrés en point-à-point sans rupture de charge.',
          specs: 'Jusqu’à 15 kg · Arrivée enlèvement < 12 min · Paris & Petite Couronne',
          action: 'Simuler en Moto',
        },
        cargo: {
          num: '02.',
          title: 'Vélo-Cargo Électrique ZFE',
          desc: 'Logistique du dernier kilomètre silencieuse avec accès prioritaire aux zones piétonnes et centres historiques.',
          specs: 'Jusqu’à 150 kg · 100% Crit’Air 0 · Caisson sécurisé',
          action: 'Simuler en Cargo',
        },
        van: {
          num: '03.',
          title: 'Utilitaire & Fret B2B Planifié',
          desc: 'Transferts inter-boutiques, palettes événementielles et tournées régulières avec hayon et arrimage professionnel.',
          specs: 'Jusqu’à 1 200 kg · Volume 9 m³ · Multi-arrêts',
          action: 'Simuler en Van',
        },
        api: {
          num: '04.',
          title: 'API Temps Réel & Plugins E-Commerce',
          desc: 'Connectez Shopify, PrestaShop ou votre ERP en 15 minutes pour offrir la livraison express 35 min directement dans votre tunnel de commande.',
          specs: 'Webhooks temps réel · Devis instantané · Facturation consolidée',
          copy: 'Copier l’exemple',
          copied: 'Copié',
        },
      },
    },
    how: {
      eyebrow: 'Fonctionnement',
      title: 'De la demande à la signature en trois temps.',
      subtitle: 'Aucune friction administrative. Chaque étape est tracée à la seconde près.',
      steps: [
        {
          num: '01.',
          title: 'Commande en 3 clics',
          desc: 'Saisissez vos adresses d’enlèvement et de livraison, choisissez le gabarit et obtenez un tarif ferme garanti avant départ.',
          previewTitle: 'Calcul tarifaire & allocation flotte',
          previewSubtitle: 'Vérification des coursiers disponibles dans un rayon de 1,8 km',
          metrics: [
            { label: 'Temps de saisie moyen', val: '18 sec' },
            { label: 'Devis garanti', val: 'Prix fixe HT' },
            { label: 'Paiement', val: 'CB ou Facture J+30' },
          ],
        },
        {
          num: '02.',
          title: 'Suivi GPS & Dispatch instantané',
          desc: 'Notre moteur assigne le coursier le plus proche. Partagez le lien de suivi en direct avec votre destinataire.',
          previewTitle: 'Télémétrie coursier en route',
          previewSubtitle: 'Lien de suivi chiffré envoyé par SMS & Webhook',
          metrics: [
            { label: 'Assignation moyenne', val: '42 sec' },
            { label: 'Précision GPS', val: 'Rafraîchi / 3s' },
            { label: 'Contact direct', val: 'Ligne masquée' },
          ],
        },
        {
          num: '03.',
          title: 'Livré avec preuve horodatée',
          desc: 'Remise contre code PIN, signature sur smartphone et photo géolocalisée immédiatement archivée dans votre espace client.',
          previewTitle: 'Bordereau numérique certifié',
          previewSubtitle: 'Archivage automatique PDF + synchronisation ERP',
          metrics: [
            { label: 'Preuve de dépôt', val: 'Photo + Signature' },
            { label: 'Horodatage', val: 'Certifié UTC' },
            { label: 'Assurance incluse', val: 'Jusqu’à 50 000 €' },
          ],
        },
      ],
    },
    proof: {
      eyebrow: 'Confiance & Conformité',
      title: 'Adopté par les directions opérationnelles exigeantes.',
      subtitle: 'Des standards de sécurité et de ponctualité pensés pour les flux critiques.',
      guarantees: [
        { title: '100% Crit’Air 0 & ZFE', detail: 'Flotte décarbonée autorisée dans toutes les métropoles françaises.' },
        { title: 'Conformité RGPD & ISO 27001', detail: 'Données hébergées en France et liens de suivi anonymisés.' },
        { title: 'Assurance Ad Valorem 50 k€', detail: 'Couverture intégrale des marchandises sensibles et matériel médical.' },
        { title: 'Support Opérations Paris 24/7', detail: 'Un dispatcher humain joignable en moins de 30 secondes.' },
      ],
      testimonials: [
        {
          quote:
            'Avant Rapidmate, nos transferts de pièces entre nos trois boutiques parisiennes prenaient jusqu’à 3 heures. Aujourd’hui, 98% des réassorts arrivent sous 28 minutes avec preuve photo.',
          author: 'Camille Delacroix',
          role: 'Directrice des Opérations Retail',
          company: 'Maison Verrière Paris',
          outcome: 'Délai réduit de 3h à 28 min sur 1 400 transferts/mois',
        },
        {
          quote:
            'L’intégration API dans notre checkout PrestaShop a transformé notre taux de conversion sur Paris intra-muros sans alourdir notre équipe logistique.',
          author: 'Thomas Béranger',
          role: 'VP Supply Chain',
          company: 'Atelier Lumière Optique',
          outcome: '+22% de conversion checkout express en 90 jours',
        },
      ],
    },
    contact: {
      eyebrow: 'Devis & Compte Entreprise',
      title: 'Planifiez votre première course ou ouvrez un compte pro.',
      subtitle:
        'Réponse immédiate avec tarif préférentiel dès 15 courses par mois et facturation mensuelle consolidée.',
      form: {
        nameLabel: 'Nom complet ou Société',
        namePlaceholder: 'Ex : Camille Delacroix — Maison Verrière',
        emailLabel: 'Email professionnel',
        emailPlaceholder: 'operations@entreprise.fr',
        phoneLabel: 'Téléphone',
        phonePlaceholder: '+33 6 12 34 56 78',
        routeLabel: 'Trajet type ou besoin mensuel',
        routePlaceholder: 'Ex : Paris 8e → Paris 11e, ~40 courses/mois',
        vehicleLabel: 'Véhicule prioritaire',
        submit: 'Valider & Estimer ma prise en charge',
        successTitle: 'Demande transmise au dispatch Paris',
        successBody: 'Un conseiller opérations vous contacte sous 10 minutes avec votre grille tarifaire personnalisée.',
        reset: 'Envoyer une autre demande',
        errors: {
          name: 'Veuillez renseigner votre nom ou raison sociale (2 caractères min.).',
          email: 'Veuillez saisir une adresse email professionnelle valide.',
          phone: 'Veuillez saisir un numéro de téléphone valide (ex. +33 6 12 34 56 78).',
          route: 'Veuillez décrire brièvement votre trajet ou volume mensuel.',
        },
      },
    },
    footer: {
      tagline: 'Logistique urbaine express et zéro émission pour les entreprises en France.',
      newsletterTitle: 'Actualités flotte & ouvertures de zones',
      newsletterPlaceholder: 'vous@entreprise.fr',
      newsletterBtn: 'S’inscrire',
      newsletterSuccess: 'Inscription confirmée.',
      newsletterError: 'Email invalide.',
      linksTitle: 'Navigation',
      legalTitle: 'Informations légales',
      legalItems: [
        { id: 'mentions', label: 'Mentions légales' },
        { id: 'cgv', label: 'CGV / CGU' },
        { id: 'rgpd', label: 'Politique de confidentialité' },
      ],
      standaloneLabel: 'Version HTML autonome',
      copyright: '© 2026 Rapidmate SAS — RCS Paris · Tous droits réservés.',
    },
    dispatchLabel: 'Course envoyée',
    demoModal: {
      title: 'Démonstration du dispatch temps réel',
      subtitle: 'Observez l’orchestration complète d’une commande express entre Opéra et Station F.',
      steps: [
        { time: '00:00', event: 'Commande validée via API', detail: 'Devis verrouillé à 14,90 € HT · Moto Électrique' },
        { time: '00:38', event: 'Coursier #RM-409 assigné', detail: 'En approche rue Scribe (420 m du point d’enlèvement)' },
        { time: '06:15', event: 'Colis scanné & sécurisé', detail: 'Lien GPS temps réel transmis au destinataire' },
        { time: '24:40', event: 'Livré avec preuve horodatée', detail: 'Signature numérique + photo archivées' },
      ],
      replay: 'Relancer l’escadrille sur l’écran',
      close: 'Fermer',
    },
    bookingModal: {
      title: 'Expédier un coursier maintenant',
      subtitle: 'Confirmation immédiate avec suivi GPS et bordereau numérique.',
      pickupLabel: 'Adresse d’enlèvement',
      dropoffLabel: 'Adresse de livraison',
      vehicleLabel: 'Mode de transport',
      emailLabel: 'Email pour le reçu & suivi',
      confirm: 'Confirmer le dispatch immédiat',
      confirmedTitle: 'Coursier en cours d’attribution',
      confirmedBody: 'Votre simulation de course a été envoyée. Suivez le coursier sur votre écran.',
    },
  },
  en: {
    nav: {
      services: 'Services',
      tarifs: 'Pricing',
      entreprises: 'Enterprise',
      contact: 'Contact',
      cta: 'Get Started',
    },
    hero: {
      kicker: 'Paris · Lyon · Marseille · 24/7 Express Network',
      title: 'Instant urban logistics across France, dispatched in seconds.',
      subtitle:
        'On-demand B2B and B2C couriers: electric motorcycles, cargo bikes, and zero-emission vans arriving in under 35 minutes.',
      ctaPrimary: 'Command a Courier Now',
      ctaSecondary: 'Watch Interactive Demo',
      tapHint: 'Click or tap anywhere on the screen to trigger the Tap-to-Dispatch engine.',
    },
    sim: {
      headerTitle: 'Live Route Simulator · Paris',
      dragHint: 'Drag Pickup (A) & Dropoff (B) nodes',
      pickup: 'Pickup (A)',
      dropoff: 'Dropoff (B)',
      distance: 'Distance',
      quote: 'Live Quote',
      countdown: 'Delivery ETA',
      co2: 'CO₂ Saved',
      dispatchBtn: 'Dispatch This Route',
      presetsLabel: 'Quick routes',
      vehicles: {
        moto: { label: 'Moto', spec: 'Up to 15 kg · Fastest' },
        cargo: { label: 'Cargo', spec: 'Up to 150 kg · Zero-CO₂' },
        van: { label: 'Van', spec: 'Up to 1,200 kg · Pallets' },
      },
    },
    stats: [
      {
        value: '142,840+',
        numericTarget: 142840,
        suffix: '+',
        label: 'Deliveries completed',
        detail: 'Verified urban dispatches across the last 12 months',
      },
      {
        value: '< 35 min',
        label: 'Average door-to-door',
        detail: 'From booking confirmation to dropoff in central Paris',
      },
      {
        value: '480',
        numericTarget: 480,
        label: 'Active couriers',
        detail: 'Electric motorcycles, cargo bikes & utility vans ready 7/7',
      },
      {
        value: '99.4%',
        label: 'On-time SLA & CSAT',
        detail: 'Timestamped photo and digital signature on every dropoff',
      },
    ],
    services: {
      eyebrow: 'Fleet & Capabilities',
      title: 'Engineered vehicles for every urban delivery constraint.',
      subtitle:
        'Select any fleet tier to pre-configure the route simulator or trigger an immediate dispatch.',
      items: {
        moto: {
          num: '01.',
          title: 'Express Moto & Scooter Courier',
          desc: 'Urgent legal contracts, medical samples, spare parts, and luxury retail parcels delivered point-to-point without hubs.',
          specs: 'Up to 15 kg · Pickup < 12 min · Paris & Île-de-France',
          action: 'Simulate Moto',
        },
        cargo: {
          num: '02.',
          title: 'Eco-Cargo Bike',
          desc: 'Whisper-quiet zero-emission last-mile logistics with unrestricted access to pedestrian centers and ZFE zones.',
          specs: 'Up to 150 kg · 100% Crit’Air 0 · Lockable bay',
          action: 'Simulate Cargo',
        },
        van: {
          num: '03.',
          title: 'Van & Utility Freight',
          desc: 'Inter-store stock transfers, event gear, and scheduled multi-stop corporate runs with tail-lift capacity.',
          specs: 'Up to 1,200 kg · 9 m³ bay · Multi-stop routing',
          action: 'Simulate Van',
        },
        api: {
          num: '04.',
          title: 'API & E-Commerce Fulfillment',
          desc: 'Connect Shopify, PrestaShop, or your custom ERP in 15 minutes to offer sub-35-minute express delivery right at checkout.',
          specs: 'Real-time webhooks · Instant quotes · Consolidated billing',
          copy: 'Copy snippet',
          copied: 'Copied',
        },
      },
    },
    how: {
      eyebrow: 'Workflow',
      title: 'From dispatch to proof of delivery in three steps.',
      subtitle: 'Zero paperwork delays. Every stage is tracked down to the second.',
      steps: [
        {
          num: '01.',
          title: 'Request in 3 clicks',
          desc: 'Enter pickup and dropoff addresses, choose your vehicle tier, and lock in a transparent fixed quote before dispatch.',
          previewTitle: 'Instant Quote & Fleet Matching',
          previewSubtitle: 'Scanning verified couriers within a 1.8 km radius',
          metrics: [
            { label: 'Avg booking time', val: '18 sec' },
            { label: 'Quote lock', val: 'Fixed excl. VAT' },
            { label: 'Settlement', val: 'Card or Net-30' },
          ],
        },
        {
          num: '02.',
          title: 'Live GPS Tracking & Instant Dispatch',
          desc: 'Our routing engine assigns the nearest available rider. Share a live tracking link with your recipient automatically.',
          previewTitle: 'Live Courier Telemetry',
          previewSubtitle: 'Encrypted tracking link pushed via SMS & Webhook',
          metrics: [
            { label: 'Avg assignment', val: '42 sec' },
            { label: 'GPS refresh', val: 'Every 3s' },
            { label: 'Rider contact', val: 'Masked bridge' },
          ],
        },
        {
          num: '03.',
          title: 'Delivered with Proof of Delivery',
          desc: 'Verified via PIN code, glass signature, and geo-tagged photo stored instantly in your operations portal.',
          previewTitle: 'Certified Digital Waybill',
          previewSubtitle: 'Auto-archived PDF + ERP webhook sync',
          metrics: [
            { label: 'Dropoff proof', val: 'Photo + Sign' },
            { label: 'Timestamp', val: 'UTC Certified' },
            { label: 'Cargo cover', val: 'Up to €50,000' },
          ],
        },
      ],
    },
    proof: {
      eyebrow: 'Trust & Compliance',
      title: 'Trusted by Parisian brands with zero margin for delay.',
      subtitle: 'Built to meet strict French enterprise compliance, security, and environmental mandates.',
      guarantees: [
        { title: '100% Crit’Air 0 & ZFE Ready', detail: 'Zero-emission access across restricted French city centers.' },
        { title: 'GDPR & ISO 27001 Aligned', detail: 'Data hosted in France with anonymized recipient tracking URLs.' },
        { title: '€50,000 Cargo Insurance', detail: 'Comprehensive protection for high-value retail and medical freight.' },
        { title: '24/7 Paris Dispatch Desk', detail: 'Human operations specialists reachable in under 30 seconds.' },
      ],
      testimonials: [
        {
          quote:
            'Before Rapidmate, stock transfers between our three Paris boutiques took up to 3 hours. Today, 98% of restocks arrive in under 28 minutes with photo confirmation.',
          author: 'Camille Delacroix',
          role: 'Head of Retail Operations',
          company: 'Maison Verrière Paris',
          outcome: 'Reduced transfer time from 3h to 28 min across 1,400 runs/mo',
        },
        {
          quote:
            'Wiring Rapidmate’s API into our PrestaShop checkout lifted express delivery conversion across central Paris without adding dispatch overhead.',
          author: 'Thomas Béranger',
          role: 'VP Supply Chain',
          company: 'Atelier Lumière Optique',
          outcome: '+22% express checkout conversion in 90 days',
        },
      ],
    },
    contact: {
      eyebrow: 'Enterprise & Instant Quote',
      title: 'Book an urgent courier or open a corporate account.',
      subtitle:
        'Preferential volume rates starting at 15 monthly dispatches with consolidated Net-30 invoicing.',
      form: {
        nameLabel: 'Full Name or Company',
        namePlaceholder: 'e.g. Camille Delacroix — Maison Verrière',
        emailLabel: 'Work Email',
        emailPlaceholder: 'operations@company.fr',
        phoneLabel: 'Phone Number',
        phonePlaceholder: '+33 6 12 34 56 78',
        routeLabel: 'Typical route or monthly volume',
        routePlaceholder: 'e.g. Paris 8e → Paris 11e, ~40 dispatches/mo',
        vehicleLabel: 'Primary Vehicle',
        submit: 'Validate & Request Dispatch',
        successTitle: 'Request received by Paris Dispatch',
        successBody: 'An operations specialist will reach out within 10 minutes with your tailored rate card.',
        reset: 'Submit another request',
        errors: {
          name: 'Please enter your name or company (at least 2 characters).',
          email: 'Please enter a valid work email address.',
          phone: 'Please enter a valid phone number (e.g. +33 6 12 34 56 78).',
          route: 'Please describe your route or estimated monthly volume.',
        },
      },
    },
    footer: {
      tagline: 'Express zero-emission urban logistics for high-velocity teams across France.',
      newsletterTitle: 'Fleet updates & new city launches',
      newsletterPlaceholder: 'you@company.fr',
      newsletterBtn: 'Subscribe',
      newsletterSuccess: 'Subscribed successfully.',
      newsletterError: 'Invalid email address.',
      linksTitle: 'Platform',
      legalTitle: 'French Legal Notices',
      legalItems: [
        { id: 'mentions', label: 'Mentions légales' },
        { id: 'cgv', label: 'CGV / Terms' },
        { id: 'rgpd', label: 'Privacy (RGPD)' },
      ],
      standaloneLabel: 'Standalone HTML File',
      copyright: '© 2026 Rapidmate SAS — RCS Paris · All rights reserved.',
    },
    dispatchLabel: 'Order Dispatched',
    demoModal: {
      title: 'Real-Time Dispatch Walkthrough',
      subtitle: 'Watch a full express mission unfold from Opéra to Station F.',
      steps: [
        { time: '00:00', event: 'Quote locked via API', detail: 'Fixed fare €14.90 excl. VAT · Electric Moto' },
        { time: '00:38', event: 'Courier #RM-409 assigned', detail: 'En route on Rue Scribe (420 m from pickup)' },
        { time: '06:15', event: 'Parcel scanned & sealed', detail: 'Live GPS tracking URL pushed to recipient' },
        { time: '24:40', event: 'Delivered with Proof', detail: 'Digital signature + geo-tagged photo archived' },
      ],
      replay: 'Launch Fleet Burst on Screen',
      close: 'Close',
    },
    bookingModal: {
      title: 'Command a Courier Now',
      subtitle: 'Instant route allocation with live GPS tracking and digital proof.',
      pickupLabel: 'Pickup Address',
      dropoffLabel: 'Dropoff Address',
      vehicleLabel: 'Vehicle Tier',
      emailLabel: 'Receipt & Tracking Email',
      confirm: 'Confirm Instant Dispatch',
      confirmedTitle: 'Courier En Route',
      confirmedBody: 'Your express dispatch has been simulated and sent to the Paris grid.',
    },
  },
};
