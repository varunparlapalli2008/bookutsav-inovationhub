// Futuristic Event Platform - Mock Data Management

const MOCK_EVENTS = [
  {
    id: 'evt_1',
    title: 'Neon Nights Cyber Concert',
    category: 'Concert',
    location: 'Neo Tokyo Arena',
    date: '2026-08-15',
    time: '21:00',
    price: 150,
    vipPrice: 300,
    image: 'assets/images/neon_concert.png',
    description: 'Experience the ultimate futuristic music festival with holographic displays and pure synthwave energy.',
    organizer: 'CyberBeats Corp'
  },
  {
    id: 'evt_2',
    title: 'Quantum Tech Summit',
    category: 'Tech',
    location: 'Silicon Valley Convention Center',
    date: '2026-09-10',
    time: '09:00',
    price: 499,
    vipPrice: 999,
    image: 'assets/images/tech_summit.png',
    description: 'Dive into the latest in Quantum Computing, AI, and Neural Interfaces at this premier tech summit.',
    organizer: 'FutureTech'
  },
  {
    id: 'evt_3',
    title: 'VR Gaming Championship',
    category: 'Gaming',
    location: 'Virtual Arena (Global)',
    date: '2026-07-20',
    time: '18:00',
    price: 50,
    vipPrice: 120,
    image: 'assets/images/vr_gaming.png',
    description: 'The world\'s largest fully immersive VR eSports tournament. Watch the pros battle in zero-g environments.',
    organizer: 'eSports BookUtsav'
  },
  {
    id: 'evt_4',
    title: 'Galactic Dance Festival',
    category: 'Dance',
    location: 'Starlight Pavilion',
    date: '2026-10-05',
    time: '20:00',
    price: 80,
    vipPrice: 150,
    image: 'assets/images/galactic_dance.png',
    description: 'A multi-stage dance festival featuring zero-gravity dance floors and interstellar DJs.',
    organizer: 'Rhythm Horizons'
  },
  {
    id: 'evt_5',
    title: 'Acoustic Under the Stars',
    category: 'Music',
    location: 'Grand Canyon Observatory',
    date: '2026-08-01',
    time: '19:30',
    price: 120,
    vipPrice: 200,
    image: 'https://images.unsplash.com/photo-1516280440502-127e78d6df23?q=80&w=800&auto=format&fit=crop',
    description: 'A serene acoustic musical experience set against a backdrop of real-time astronomical projections.',
    organizer: 'Stellar Sounds'
  },
  {
    id: 'evt_6',
    title: 'Future Auto Show',
    category: 'Tech',
    location: 'Dubai Expo Center',
    date: '2026-11-12',
    time: '10:00',
    price: 250,
    vipPrice: 500,
    image: 'assets/images/auto_show.png',
    description: 'Showcasing the next generation of hover vehicles, hyperloops, and autonomous transport.',
    organizer: 'Global Transport Init'
  }
];

class DataManager {
  constructor() {
    this.initStorage();
  }

  initStorage() {
    // Initialize mock events if not present or if version changed
    const MOCK_VERSION = 'v4';
    if (!localStorage.getItem('events') || localStorage.getItem('mockVersion') !== MOCK_VERSION) {
      localStorage.setItem('events', JSON.stringify(MOCK_EVENTS));
      localStorage.setItem('mockVersion', MOCK_VERSION);
    }
    
    // Initialize user bookings
    if (!localStorage.getItem('bookings')) {
      localStorage.setItem('bookings', JSON.stringify([]));
    }
    
    // Initialize active user (mock login)
    if (!localStorage.getItem('currentUser')) {
      // Empty initially
    }
  }

  getEvents() {
    return JSON.parse(localStorage.getItem('events')) || [];
  }

  getEventById(id) {
    const events = this.getEvents();
    return events.find(e => e.id === id);
  }

  addEvent(eventData) {
    const events = this.getEvents();
    eventData.id = 'evt_' + Date.now();
    events.push(eventData);
    localStorage.setItem('events', JSON.stringify(events));
    return eventData;
  }

  getBookings() {
    return JSON.parse(localStorage.getItem('bookings')) || [];
  }

  addBooking(bookingData) {
    const bookings = this.getBookings();
    bookingData.id = 'bkg_' + Date.now();
    bookingData.bookingDate = new Date().toISOString();
    bookings.push(bookingData);
    localStorage.setItem('bookings', JSON.stringify(bookings));
    return bookingData;
  }
}

window.dataManager = new DataManager();
