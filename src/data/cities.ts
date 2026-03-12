export interface City {
  name: string;
  slug: string;
  region: string;
  population?: string;
  description: string;
}

export const CITIES: City[] = [
  {
    name: 'Milano',
    slug: 'milano',
    region: 'Lombardia',
    population: '1.4 milioni',
    description: 'la capitale economica e digitale d\'Italia',
  },
  {
    name: 'Roma',
    slug: 'roma',
    region: 'Lazio',
    population: '2.8 milioni',
    description: 'il mercato più grande d\'Italia con migliaia di aziende in crescita',
  },
  {
    name: 'Torino',
    slug: 'torino',
    region: 'Piemonte',
    population: '850 mila',
    description: 'hub tecnologico e automotive in forte crescita digitale',
  },
  {
    name: 'Napoli',
    slug: 'napoli',
    region: 'Campania',
    population: '950 mila',
    description: 'città in rapida trasformazione digitale con un ecosistema startup vivace',
  },
  {
    name: 'Firenze',
    slug: 'firenze',
    region: 'Toscana',
    population: '370 mila',
    description: 'centro del fashion, del turismo e del lusso italiano',
  },
  {
    name: 'Bologna',
    slug: 'bologna',
    region: 'Emilia-Romagna',
    population: '400 mila',
    description: 'polo logistico, universitario e manifatturiero del nord Italia',
  },
  {
    name: 'Brescia',
    slug: 'brescia',
    region: 'Lombardia',
    population: '200 mila',
    description: 'cuore industriale e manifatturiero della Lombardia orientale',
  },
  {
    name: 'Genova',
    slug: 'genova',
    region: 'Liguria',
    population: '580 mila',
    description: 'porto e hub logistico del Mediterraneo in trasformazione digitale',
  },
  {
    name: 'Bari',
    slug: 'bari',
    region: 'Puglia',
    population: '320 mila',
    description: 'principale centro economico e digitale del Sud Italia',
  },
  {
    name: 'Palermo',
    slug: 'palermo',
    region: 'Sicilia',
    population: '650 mila',
    description: 'capitale siciliana con un ecosistema imprenditoriale in crescita',
  },
  {
    name: 'Bergamo',
    slug: 'bergamo',
    region: 'Lombardia',
    population: '120 mila',
    description: 'città manifatturiera e commerciale della Lombardia con molte PMI',
  },
  {
    name: 'Monza',
    slug: 'monza',
    region: 'Lombardia',
    population: '123 mila',
    description: 'città dove ho il mio studio, cuore della Brianza produttiva',
  },
  {
    name: 'Como',
    slug: 'como',
    region: 'Lombardia',
    population: '85 mila',
    description: 'polo del lusso, del design e del turismo internazionale',
  },
  {
    name: 'Varese',
    slug: 'varese',
    region: 'Lombardia',
    population: '80 mila',
    description: 'città industriale e commerciale a due passi da Milano',
  },
  {
    name: 'Padova',
    slug: 'padova',
    region: 'Veneto',
    population: '210 mila',
    description: 'centro universitario e industriale del Veneto',
  },
  {
    name: 'Verona',
    slug: 'verona',
    region: 'Veneto',
    population: '260 mila',
    description: 'hub commerciale, fiera e logistico del nord-est',
  },
  {
    name: 'Venezia',
    slug: 'venezia',
    region: 'Veneto',
    population: '250 mila',
    description: 'capitale del turismo internazionale con crescente ecosistema tech',
  },
  {
    name: 'Trieste',
    slug: 'trieste',
    region: 'Friuli-Venezia Giulia',
    population: '200 mila',
    description: 'porto adriatico e polo scientifico internazionale',
  },
  {
    name: 'Perugia',
    slug: 'perugia',
    region: 'Umbria',
    population: '165 mila',
    description: 'città universitaria e centro dell\'Umbria in crescita digitale',
  },
  {
    name: 'Cagliari',
    slug: 'cagliari',
    region: 'Sardegna',
    population: '155 mila',
    description: 'capitale sarda con un ecosistema startup emergente e vivace',
  },
];

export function getCityBySlug(slug: string): City | undefined {
  return CITIES.find((city) => city.slug === slug);
}
