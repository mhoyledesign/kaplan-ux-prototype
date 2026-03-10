export interface LibraryItem {
  id: number
  title: string
  description: string
  type: 'PDF' | 'Video' | 'Training'
  category: 'Safety' | 'Policy' | 'Operations' | 'Compliance'
  date: string
  fileSize?: string
  duration?: string
}

export const libraryItems: LibraryItem[] = [
  {
    id: 1,
    title: 'Safety Policy Manual',
    description: 'Complete Kaplan Trucking safety policy manual covering all operational safety procedures, incident reporting, and driver responsibilities.',
    type: 'PDF',
    category: 'Safety',
    date: '2026-01-15',
    fileSize: '2.4 MB',
  },
  {
    id: 2,
    title: 'Personal Conveyance Rules & Guidelines',
    description: 'FMCSA personal conveyance policy guide including permitted uses, documentation requirements, and ELD recording procedures.',
    type: 'PDF',
    category: 'Compliance',
    date: '2025-11-20',
    fileSize: '840 KB',
  },
  {
    id: 3,
    title: 'Transflo Cover Sheet (v3.2)',
    description: 'Current version of the Kaplan Trucking Transflo cover sheet with QR code for automated settlement routing. Print and include with all scanned documents.',
    type: 'PDF',
    category: 'Operations',
    date: '2026-02-01',
    fileSize: '156 KB',
  },
  {
    id: 4,
    title: 'Preventive Maintenance (PM) Requirements',
    description: 'Detailed PM schedule and requirements for all equipment operating under Kaplan authority, including inspection intervals and documentation.',
    type: 'PDF',
    category: 'Operations',
    date: '2025-10-08',
    fileSize: '1.1 MB',
  },
  {
    id: 5,
    title: 'Cargo Securement Best Practices',
    description: 'Video training covering proper cargo securement techniques for flatbed, van, and specialized loads per FMCSA regulations.',
    type: 'Video',
    category: 'Safety',
    date: '2025-09-12',
    duration: '22 min',
  },
  {
    id: 6,
    title: 'ELD Compliance & Daily Log Training',
    description: 'Step-by-step video walkthrough of ELD operation, daily log editing, duty status changes, and common compliance mistakes to avoid.',
    type: 'Video',
    category: 'Compliance',
    date: '2025-12-05',
    duration: '18 min',
  },
  {
    id: 7,
    title: 'Pre-Trip & Post-Trip Inspection Walkthrough',
    description: 'Comprehensive video demonstrating the full DOT-compliant pre-trip and post-trip inspection process for tractor-trailers.',
    type: 'Video',
    category: 'Safety',
    date: '2025-08-22',
    duration: '31 min',
  },
  {
    id: 8,
    title: 'New Agent Onboarding Course',
    description: 'Complete training course for new agents covering Kaplan systems, portal navigation, settlement processes, and operational procedures.',
    type: 'Training',
    category: 'Operations',
    date: '2026-01-10',
    duration: '2 hr 15 min',
  },
  {
    id: 9,
    title: 'Hazmat Endorsement Refresher',
    description: 'Required annual refresher training for drivers with hazmat endorsement covering placarding, shipping papers, and emergency response.',
    type: 'Training',
    category: 'Compliance',
    date: '2026-02-14',
    duration: '1 hr 45 min',
  },
  {
    id: 10,
    title: 'Drug & Alcohol Policy',
    description: 'Kaplan Trucking substance abuse policy including DOT testing requirements, random testing procedures, and return-to-duty protocols.',
    type: 'PDF',
    category: 'Policy',
    date: '2025-07-01',
    fileSize: '620 KB',
  },
  {
    id: 11,
    title: 'Agent Operating Agreement Template',
    description: 'Standard independent contractor operating agreement template for Kaplan Trucking agents. For reference only; contact HR for execution copies.',
    type: 'PDF',
    category: 'Policy',
    date: '2025-06-15',
    fileSize: '490 KB',
  },
  {
    id: 12,
    title: 'Winter Driving Safety Course',
    description: 'Seasonal training module covering winter driving techniques, chain installation, black ice awareness, and emergency procedures for cold weather.',
    type: 'Training',
    category: 'Safety',
    date: '2025-11-01',
    duration: '55 min',
  },
]
