exports.seed = function(knex, Promise) {
  return knex('cities').del()
    .then(function () {
      return knex('cities').insert([
        //52.37,
        // city_lng: 4.895
        {
          id: 1,
          city_name: 'Amsterdam',
          city_description: 'loved it, really high energy city, great public transportation and a short trip to the airport.',
          city_lat: '52.37',
          city_lng: '4.895',
          city_place_id: 'ChIJVXealLU_xkcRja_At0z9AGY'
        },
        {
          id: 2,
          city_name: 'Brussels',
          city_description: 'Had a hard time getting around, cabs were expensive but the city was goregous.',
          city_lat: '50.85',
          city_lng: '4.351',
          city_place_id: 'ChIJZ2jHc-2kw0cRpwJzeGY6i8E'
        },
        {
          id: 3,
          city_name: 'Dehli',
          city_description: 'food was excellent! Really enjoyed the mueseums Dehli had to offer.',
          city_lat: '28.7041',
          city_lng: '77.1025',
          city_place_id: 'ChIJL_P_CXMEDTkRw0ZdG-0GVvw'
        },
        {
          id: 4,
          city_name: 'Mumbai',
          city_description: 'The dancing was amazing!',
          city_lat: '19.0760',
          city_lng: '72.8777',
          city_place_id: 'ChIJwe1EZjDG5zsRaYxkjY_tpF0'
        },
        {
          id: 5,
          city_name: 'Sydney',
          city_description: 'Loved the surf and the people were truly outgoing.',
          city_lat: '-33.8688197',
          city_lng: '151.2093',
          city_place_id: 'ChIJP5iLHkCuEmsRwMwyFmh9AQU'
        },
        {
          id: 6,
          city_name: 'Hong Kong',
          city_description: 'Loved the surf and the people were truly outgoing.',
          city_lat: '22.3964',
          city_lng: '114.1095',
          city_place_id: 'ChIJD5gyo-3iAzQRfMnq27qzivA'
        },
      ]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('cities_id_seq', (SELECT MAX(id) FROM cities));"
      )
    })
}
