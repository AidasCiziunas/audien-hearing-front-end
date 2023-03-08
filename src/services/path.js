const baseURL = process.env.VUE_APP_API_DOMAIN,
    carLocationPath = 'cars/getCarLocation',
    flightLocationPath = 'msfflights/getLocation',
    hotelLocationPath = 'hotels/getLocation',
    villasLocationPath = 'villas/getLocation',
    activitiesLocationPath = 'activity/getActivityLocation',
    frontPaths = [
        { title: 'HOME', url: '/', slug: 'f' },
        { title: 'FLIGHTS', url: '/flights', slug: 'f1' },
        { title: 'CARS', url: '/cars', slug: 'f2' },
        { title: 'HOTELS', url: '/hotels', slug: 'f3' },
        { title: 'CRUISE', url: '/cruise', slug: 'f4' },
        { title: 'ACTIVITY', url: '/activity', slug: 'f5' },
        { title: 'VACATION', url: '/vacation', slug: 'f6' },
        { title: 'MY TRIPS', url: '/my_trips', slug: 'f7' }
    ],
    backendPaths = [
        { title: 'B HOME', url: '/', slug: 'b' },
        { title: 'B FLIGHTS', url: '/backend/flights', slug: 'b1' },
        { title: 'B CARS', url: '/backend/cars', slug: 'b2' },
        { title: 'B HOTELS', url: '/backend/hotels', slug: 'b3' },
        { title: 'B CRUISE', url: '/backend/cruise', slug: 'b4' },
        { title: 'B ACTIVITY', url: '/backend/activity', slug: 'b5' },
        { title: 'B VACATION', url: '/backend/vacation', slug: 'b6' },
        { title: 'B MY TRIPS', url: '/backend/my_trips', slug: 'b7' }
    ];

export default {
    baseURL,
    carLocationPath,
    flightLocationPath,
    hotelLocationPath,
    villasLocationPath,
    activitiesLocationPath,
    frontPaths,
    backendPaths
};
