export interface Brand {
  id: string
  name: string
  shortName: string
  logo: string
  logoWhite: string
  colors: {
    primary: string
    primaryHover: string
    primaryPressed: string
    primaryLight: string
    primaryLighter: string
  }
}

export const brands: Record<string, Brand> = {
  kaplan: {
    id: 'kaplan',
    name: 'Kaplan Trucking Company',
    shortName: 'Kaplan',
    logo: '/logos/kaplan-logo.png',
    logoWhite: '/logos/kaplan-logo-white.png',
    colors: {
      primary: '#2d5016',
      primaryHover: '#1e3610',
      primaryPressed: '#254412',
      primaryLight: '#e8f3e0',
      primaryLighter: '#f5faf1',
    },
  },
  horizon: {
    id: 'horizon',
    name: 'Horizon Transport',
    shortName: 'Horizon',
    logo: '/logos/horizon-logo-white.png',
    logoWhite: '/logos/horizon-logo-white.png',
    colors: {
      primary: '#1a5276',
      primaryHover: '#154360',
      primaryPressed: '#11374d',
      primaryLight: '#d6eaf8',
      primaryLighter: '#eaf2f8',
    },
  },
  eastern: {
    id: 'eastern',
    name: 'Eastern Freight Carriers',
    shortName: 'Eastern',
    logo: '/logos/eastern-logo-white.png',
    logoWhite: '/logos/eastern-logo-white.png',
    colors: {
      primary: '#922b21',
      primaryHover: '#7b241c',
      primaryPressed: '#641e17',
      primaryLight: '#f5b7b1',
      primaryLighter: '#fdedec',
    },
  },
  trx: {
    id: 'trx',
    name: 'TRx Logistics',
    shortName: 'TRx',
    logo: '/logos/trx-logo-white.png',
    logoWhite: '/logos/trx-logo-white.png',
    colors: {
      primary: '#6c3483',
      primaryHover: '#5b2c6f',
      primaryPressed: '#4a235a',
      primaryLight: '#d7bde2',
      primaryLighter: '#f4ecf7',
    },
  },
  bessemer: {
    id: 'bessemer',
    name: 'Bessemer System',
    shortName: 'Bessemer',
    logo: '/logos/bessemer-logo-white.png',
    logoWhite: '/logos/bessemer-logo-white.png',
    colors: {
      primary: '#2c3e50',
      primaryHover: '#1a252f',
      primaryPressed: '#121a21',
      primaryLight: '#d5d8dc',
      primaryLighter: '#eaecee',
    },
  },
}

export const brandIds = Object.keys(brands) as (keyof typeof brands)[]
export const defaultBrand = brands.kaplan
