export interface NewsItem {
  id: number
  title: string
  date: string
  category: 'Company News' | 'Safety' | 'Compliance' | 'HR' | 'Operations'
  preview: string
  content: string
  hasAttachment: boolean
  attachmentName?: string
  isNew: boolean
}

export const newsItems: NewsItem[] = [
  {
    id: 1,
    title: 'New Columbus Terminal Now Open',
    date: '2026-02-28',
    category: 'Company News',
    preview: 'Kaplan Trucking is proud to announce the opening of our newest terminal facility in Columbus, Ohio.',
    content: `Kaplan Trucking is proud to announce the opening of our newest terminal facility in Columbus, Ohio, located at 4850 Freight Way, Columbus, OH 43228. This state-of-the-art facility features 24 dock doors, a driver lounge, maintenance bay, and dedicated agent office space. The terminal will be fully operational starting March 10, 2026. All agents with loads routed through central Ohio should update their routing guides accordingly. Contact Terminal Manager Rick Dawson at (614) 555-0184 for questions.`,
    hasAttachment: true,
    attachmentName: 'Columbus_Terminal_Map.pdf',
    isNew: true,
  },
  {
    id: 2,
    title: 'Q1 2026 Rate Adjustment Notice',
    date: '2026-02-24',
    category: 'Operations',
    preview: 'Effective March 1, 2026, fuel surcharge tables and linehaul rates have been updated to reflect current market conditions.',
    content: `Effective March 1, 2026, fuel surcharge tables and linehaul rates have been updated to reflect current market conditions. The DOE national average diesel price has been recalculated and the updated surcharge schedule is attached. Linehaul rates on select lanes in the Ohio Valley corridor have been adjusted upward by 2.4%. All active rate confirmations will be reissued by the Settlements team by end of day Friday, February 27. Please review your updated rate sheets in the portal and direct any questions to the Settlements department.`,
    hasAttachment: true,
    attachmentName: 'Q1_2026_Rate_Schedule.pdf',
    isNew: true,
  },
  {
    id: 3,
    title: 'FMCSA Hours of Service Compliance Reminder',
    date: '2026-02-18',
    category: 'Compliance',
    preview: 'A reminder regarding updated HOS regulations and ELD compliance requirements effective this quarter.',
    content: `This is a reminder that all drivers must maintain full compliance with current FMCSA Hours of Service regulations. Recent audits have identified a small number of violations related to the 30-minute break requirement and 14-hour driving window. All agents are responsible for ensuring their drivers understand the following: the 11-hour driving limit, 14-hour on-duty window, mandatory 30-minute break after 8 cumulative hours of driving, and 60/70-hour weekly limits. ELD data is being monitored and any patterns of non-compliance will trigger a remedial review. Please have all drivers review the attached compliance guide.`,
    hasAttachment: true,
    attachmentName: 'HOS_Compliance_Guide_2026.pdf',
    isNew: false,
  },
  {
    id: 4,
    title: 'Winter Weather Safety Alert - Ice and Snow Procedures',
    date: '2026-02-10',
    category: 'Safety',
    preview: 'With continued winter conditions across the Ohio Valley, all drivers must follow mandatory chain and tire check procedures.',
    content: `With continued winter weather conditions across the Ohio Valley and mid-Atlantic regions, all drivers must adhere to Kaplan Trucking's winter operations procedures. This includes mandatory pre-trip tire inspections, chain carry requirements for routes through WV mountain passes, and reduced speed protocols when road conditions deteriorate. Drivers should check road conditions via 511 systems before departing and report any weather-related delays immediately to dispatch. Terminals in Wheeling and Pittsburgh have chain-up areas available. Remember: if conditions are unsafe, pull over and wait. No load is worth a life.`,
    hasAttachment: false,
    isNew: false,
  },
  {
    id: 5,
    title: 'Driver Recruitment Bonus Program Extended',
    date: '2026-02-03',
    category: 'HR',
    preview: 'The agent driver recruitment bonus has been extended through Q2 2026 with increased payout tiers.',
    content: `Due to the success of our driver recruitment program, Kaplan Trucking is extending the agent referral bonus through June 30, 2026. Agents who refer qualified CDL-A drivers will receive the following bonuses: $1,500 after the driver completes 30 days, an additional $1,000 after 90 days, and a final $500 after 6 months of active service. Drivers must pass all DOT requirements, maintain a clean MVR, and have a minimum of 2 years OTR experience. Submit referrals through the portal or contact the HR department directly. The top referring agent each quarter will also receive a recognition award.`,
    hasAttachment: true,
    attachmentName: 'Referral_Bonus_Form.pdf',
    isNew: false,
  },
  {
    id: 6,
    title: 'Transflo Scanning Process Update',
    date: '2026-01-22',
    category: 'Operations',
    preview: 'Updated procedures for submitting paperwork through Transflo, including new cover sheet requirements.',
    content: `Effective February 1, 2026, all load documentation submitted through Transflo must use the updated Kaplan cover sheet (version 3.2). The new cover sheet includes a QR code that enables automated routing to the correct settlement queue. Please discard any old cover sheets and download the current version from the Document Library. Scans that do not include the updated cover sheet may experience processing delays of 24-48 hours. Drivers should scan all documents within 24 hours of delivery. The Transflo app on smartphones remains the preferred method, but terminal scanning stations are also available at all Kaplan locations.`,
    hasAttachment: true,
    attachmentName: 'Transflo_Cover_Sheet_v3.2.pdf',
    isNew: false,
  },
  {
    id: 7,
    title: 'Annual DOT Inspection Preparation',
    date: '2026-01-15',
    category: 'Compliance',
    preview: 'Prepare your fleet for the upcoming CVSA International Roadcheck scheduled for May 2026.',
    content: `The Commercial Vehicle Safety Alliance (CVSA) has announced the 2026 International Roadcheck will take place May 5-7, 2026. During this 72-hour period, CVSA-certified inspectors across North America will conduct Level I inspections on commercial vehicles. Agents should ensure all equipment is in top mechanical condition well before this date. Focus areas typically include brake systems, tires, lighting, cargo securement, and driver credentials. Kaplan's Safety department will be conducting pre-Roadcheck inspections at all terminals during April. Schedule your equipment through the portal or contact your terminal manager.`,
    hasAttachment: false,
    isNew: false,
  },
  {
    id: 8,
    title: 'Memorial Day Holiday Schedule',
    date: '2026-01-08',
    category: 'Company News',
    preview: 'Kaplan corporate offices and terminal administrative functions will observe modified hours for the Memorial Day holiday.',
    content: `Kaplan Trucking corporate offices will be closed Monday, May 25, 2026, in observance of Memorial Day. Terminal yards will remain open for drop and hook operations, but administrative offices, settlements processing, and IT support will be unavailable. Dispatch will operate on a skeleton crew from 6:00 AM to 6:00 PM EST. All settlement inquiries received over the holiday weekend will be addressed starting Tuesday, May 26. Agents should plan accordingly for any time-sensitive paperwork or payment needs. We appreciate the hard work of all our agents and drivers, and wish everyone a safe holiday weekend.`,
    hasAttachment: false,
    isNew: false,
  },
]
