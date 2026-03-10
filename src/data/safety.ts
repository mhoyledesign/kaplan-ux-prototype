export interface SafetyDoc {
  id: number
  title: string
  description: string
  date: string
  type: 'PDF'
}

export interface InspectionStation {
  id: number
  name: string
  address: string
  city: string
  state: string
  phone: string
  hours: string
}

export interface ClinicLocation {
  id: number
  name: string
  address: string
  city: string
  state: string
  phone: string
  hours: string
  services: string
}

export const safetyDocs: SafetyDoc[] = [
  {
    id: 1,
    title: 'Kaplan Safety Policy Manual',
    description: 'Complete company safety policy including driver responsibilities, incident reporting procedures, and disciplinary guidelines.',
    date: '2026-01-15',
    type: 'PDF',
  },
  {
    id: 2,
    title: 'Accident Reporting Procedures',
    description: 'Step-by-step instructions for reporting accidents and incidents, including required documentation, photos, and contact information.',
    date: '2025-11-08',
    type: 'PDF',
  },
  {
    id: 3,
    title: 'Cargo Securement Standards',
    description: 'FMCSA-compliant cargo securement requirements for flatbed, van, and specialized loads. Includes tie-down calculations and diagrams.',
    date: '2025-09-20',
    type: 'PDF',
  },
  {
    id: 4,
    title: 'Hazardous Materials Handling Guide',
    description: 'Procedures for transporting hazardous materials including placarding requirements, shipping paper protocols, and emergency response.',
    date: '2025-08-14',
    type: 'PDF',
  },
  {
    id: 5,
    title: 'Winter Operations Procedures',
    description: 'Cold weather driving protocols, chain requirements by state, tire inspection guidelines, and emergency kit contents.',
    date: '2025-10-28',
    type: 'PDF',
  },
  {
    id: 6,
    title: 'Fatigue Management & Wellness Guide',
    description: 'Guidelines for managing driver fatigue, recognizing warning signs, rest area best practices, and health and wellness resources.',
    date: '2025-07-10',
    type: 'PDF',
  },
]

export const inspectionStations: InspectionStation[] = [
  {
    id: 1,
    name: 'Ohio Turnpike - Eastgate Service Plaza',
    address: 'Mile Marker 218, Ohio Turnpike',
    city: 'Youngstown',
    state: 'OH',
    phone: '(330) 555-0290',
    hours: 'Mon-Fri 6:00 AM - 10:00 PM, Sat-Sun 8:00 AM - 6:00 PM',
  },
  {
    id: 2,
    name: 'OSHP Berea Weigh Station',
    address: 'I-71 Southbound, Mile Marker 234',
    city: 'Berea',
    state: 'OH',
    phone: '(440) 555-0311',
    hours: 'Mon-Fri 6:00 AM - 12:00 AM',
  },
  {
    id: 3,
    name: 'PennDOT Washington Inspection Station',
    address: 'I-70 Eastbound, Mile Marker 18',
    city: 'Washington',
    state: 'PA',
    phone: '(724) 555-0244',
    hours: 'Mon-Fri 7:00 AM - 11:00 PM, Sat 8:00 AM - 4:00 PM',
  },
  {
    id: 4,
    name: 'PennDOT Zelienople Weigh Station',
    address: 'I-79 Northbound, Mile Marker 83',
    city: 'Zelienople',
    state: 'PA',
    phone: '(724) 555-0268',
    hours: 'Mon-Fri 6:00 AM - 10:00 PM',
  },
  {
    id: 5,
    name: 'WV DOT Wheeling Inspection Facility',
    address: 'I-70 Westbound, Mile Marker 4',
    city: 'Wheeling',
    state: 'WV',
    phone: '(304) 555-0187',
    hours: 'Mon-Fri 7:00 AM - 9:00 PM',
  },
  {
    id: 6,
    name: 'WV DOT Charleston Scale',
    address: 'I-77 Northbound, Mile Marker 99',
    city: 'Charleston',
    state: 'WV',
    phone: '(304) 555-0223',
    hours: 'Mon-Fri 6:00 AM - 10:00 PM, Sat 8:00 AM - 4:00 PM',
  },
  {
    id: 7,
    name: 'INDOT Greenfield Weigh Station',
    address: 'I-70 Eastbound, Mile Marker 96',
    city: 'Greenfield',
    state: 'IN',
    phone: '(317) 555-0340',
    hours: 'Mon-Fri 6:00 AM - 11:00 PM',
  },
  {
    id: 8,
    name: 'OSHP Lodi Weigh Station',
    address: 'I-71 Southbound at SR 83',
    city: 'Lodi',
    state: 'OH',
    phone: '(330) 555-0355',
    hours: 'Mon-Sat 6:00 AM - 10:00 PM',
  },
]

export const clinicLocations: ClinicLocation[] = [
  {
    id: 1,
    name: 'Concentra Urgent Care - Cleveland',
    address: '5765 Canal Road',
    city: 'Cleveland',
    state: 'OH',
    phone: '(216) 555-0410',
    hours: 'Mon-Fri 8:00 AM - 5:00 PM',
    services: 'DOT physicals, drug & alcohol testing, random testing, return-to-duty evaluations',
  },
  {
    id: 2,
    name: 'WorkHealth - Akron',
    address: '1200 E Waterloo Road',
    city: 'Akron',
    state: 'OH',
    phone: '(330) 555-0425',
    hours: 'Mon-Fri 7:30 AM - 5:30 PM, Sat 8:00 AM - 12:00 PM',
    services: 'DOT physicals, drug screening, respirator fit testing, hearing tests',
  },
  {
    id: 3,
    name: 'MedExpress - Pittsburgh',
    address: '4224 Clairton Blvd',
    city: 'Pittsburgh',
    state: 'PA',
    phone: '(412) 555-0438',
    hours: 'Mon-Fri 8:00 AM - 8:00 PM, Sat-Sun 9:00 AM - 5:00 PM',
    services: 'DOT physicals, drug & alcohol testing, walk-in urgent care, X-ray',
  },
  {
    id: 4,
    name: 'OhioHealth Occupational Medicine - Columbus',
    address: '3780 Corporate Drive',
    city: 'Columbus',
    state: 'OH',
    phone: '(614) 555-0451',
    hours: 'Mon-Fri 7:00 AM - 6:00 PM',
    services: 'DOT physicals, drug & alcohol testing, pre-employment screenings, wellness exams',
  },
  {
    id: 5,
    name: 'Patient First - Wheeling',
    address: '200 Medical Park',
    city: 'Wheeling',
    state: 'WV',
    phone: '(304) 555-0462',
    hours: 'Mon-Fri 8:00 AM - 5:00 PM',
    services: 'DOT physicals, drug testing, basic occupational health services',
  },
  {
    id: 6,
    name: 'Concentra Urgent Care - Indianapolis',
    address: '7035 E 21st Street',
    city: 'Indianapolis',
    state: 'IN',
    phone: '(317) 555-0478',
    hours: 'Mon-Fri 8:00 AM - 5:00 PM, Sat 9:00 AM - 1:00 PM',
    services: 'DOT physicals, drug & alcohol testing, random testing, physical therapy, return-to-duty evaluations',
  },
]
