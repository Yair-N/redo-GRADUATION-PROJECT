
export const anonPages = [
    { name: 'Far away', to: '/', icon: '' },
    // { name: 'Places', to: '/Places', icon: '' },
    { name: 'Find a flight', to: '/flights', icon: '' },
    // { name: 'About', to: 'test', icon: '' }
];

export const customerPages = [
    ...anonPages,
    { name: 'Account', to: '/account', icon: '' },
    { name: 'Bookings', to: '/bookings', icon: '' },

    //noah.smith@example.com
];

export const airlinePages = [
    ...anonPages,
    { name: 'Account', to: '/account', icon: '' },
    { name: 'Bookings', to: '/bookings', icon: '' },
    { name: 'Dashboard', to: '/airline', icon: '' },

];

export const adminPages = [
    ...anonPages,
    { name: 'Account', to: '/account', icon: '' },
    { name: 'Bookings', to: '/bookings', icon: '' },
    { name: 'Dashboard', to: '/admin', icon: '' },
];

export const sessionStorageItems = ['accessToken', 'refreshToken', 'airports', 'countries', 'airlines']