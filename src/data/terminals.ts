export interface Terminal {
  id: number
  code: string
  name: string
  address: string
  city: string
  state: string
  zip: string
  phone: string
  manager: string
  email: string
  hours: string
}

export const terminals: Terminal[] = [
  {
    id: 1,
    code: 'CLE-01',
    name: 'Cleveland Main Terminal',
    address: '8200 Hub Parkway',
    city: 'Cleveland',
    state: 'OH',
    zip: '44125',
    phone: '(216) 555-0140',
    manager: 'Gary Stinson',
    email: 'gstinson@kaplantrucking.com',
    hours: 'Mon-Fri 6:00 AM - 10:00 PM, Sat 7:00 AM - 3:00 PM',
  },
  {
    id: 2,
    code: 'AKR-01',
    name: 'Akron Terminal',
    address: '1455 Triplett Blvd',
    city: 'Akron',
    state: 'OH',
    zip: '44306',
    phone: '(330) 555-0172',
    manager: 'Denise Kowalski',
    email: 'dkowalski@kaplantrucking.com',
    hours: 'Mon-Fri 6:00 AM - 9:00 PM, Sat 8:00 AM - 2:00 PM',
  },
  {
    id: 3,
    code: 'PIT-01',
    name: 'Pittsburgh Terminal',
    address: '3700 Neville Road',
    city: 'Pittsburgh',
    state: 'PA',
    zip: '15225',
    phone: '(412) 555-0198',
    manager: 'Tom Braddock',
    email: 'tbraddock@kaplantrucking.com',
    hours: 'Mon-Fri 5:30 AM - 10:00 PM, Sat 7:00 AM - 4:00 PM',
  },
  {
    id: 4,
    code: 'COL-01',
    name: 'Columbus Terminal',
    address: '4850 Freight Way',
    city: 'Columbus',
    state: 'OH',
    zip: '43228',
    phone: '(614) 555-0184',
    manager: 'Rick Dawson',
    email: 'rdawson@kaplantrucking.com',
    hours: 'Mon-Fri 6:00 AM - 10:00 PM, Sat 7:00 AM - 3:00 PM',
  },
  {
    id: 5,
    code: 'WHL-01',
    name: 'Wheeling Terminal',
    address: '120 Commerce Drive',
    city: 'Wheeling',
    state: 'WV',
    zip: '26003',
    phone: '(304) 555-0156',
    manager: 'Janet Hess',
    email: 'jhess@kaplantrucking.com',
    hours: 'Mon-Fri 6:00 AM - 8:00 PM',
  },
  {
    id: 6,
    code: 'CAN-01',
    name: 'Canton Terminal',
    address: '2980 Navarre Road SW',
    city: 'Canton',
    state: 'OH',
    zip: '44706',
    phone: '(330) 555-0133',
    manager: 'Steve Milhoan',
    email: 'smilhoan@kaplantrucking.com',
    hours: 'Mon-Fri 6:00 AM - 9:00 PM, Sat 8:00 AM - 1:00 PM',
  },
  {
    id: 7,
    code: 'IND-01',
    name: 'Indianapolis Terminal',
    address: '5520 W Raymond Street',
    city: 'Indianapolis',
    state: 'IN',
    zip: '46241',
    phone: '(317) 555-0211',
    manager: 'Marcus Trent',
    email: 'mtrent@kaplantrucking.com',
    hours: 'Mon-Fri 5:00 AM - 10:00 PM, Sat 6:00 AM - 4:00 PM',
  },
  {
    id: 8,
    code: 'YNG-01',
    name: 'Youngstown Terminal',
    address: '755 Salt Springs Road',
    city: 'Youngstown',
    state: 'OH',
    zip: '44509',
    phone: '(330) 555-0167',
    manager: 'Patricia Novak',
    email: 'pnovak@kaplantrucking.com',
    hours: 'Mon-Fri 6:00 AM - 8:00 PM, Sat 8:00 AM - 12:00 PM',
  },
]
