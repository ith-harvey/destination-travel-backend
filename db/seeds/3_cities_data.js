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
          city_lng: '4.895'
        },
        {
          id: 2,
          city_name: 'Brussels',
          city_description: 'Had a hard time getting around, cabs were expensive but the city was goregous.',
          city_lat: '50.85',
          city_lng: '4.351'
        },
        {
          id: 3,
          city_name: 'Cologne',
          city_description: 'food was excellent! Really enjoyed the mueseums Cologne had to offer.',
          city_lat: '50.93',
          city_lng: '6.960'
        }
      ]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('cities_id_seq', (SELECT MAX(id) FROM cities));"
      )
    })
}
