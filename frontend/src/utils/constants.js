
export const anonPages = [
    { name: 'Far away', to: '/', icon: '' },
    { name: 'Find a flight', to: '/flights', icon: '' },
];

export const customerPages = [
    ...anonPages,
    { name: 'Account', to: '/account', icon: '' },
    { name: 'Bookings', to: '/bookings', icon: '' },
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

export const sessionStorageItems =
{
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    airports: 'airports',
    countries: 'countries',
    airlines: 'airlines'
}
