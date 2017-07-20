exports.seed = function(knex, Promise) {
  return knex('trips_cities').del()
    .then(function () {
      return knex('trips_cities').insert([
        {
          id: 1,
          trip_id: 1,
          city_id: 1
        },
        {
          id: 2,
          trip_id: 1,
          city_id: 2
        },
        {
          id: 3,
          trip_id: 2,
          city_id: 3
        },
        {
          id: 4,
          trip_id: 2,
          city_id: 4
        },
        {
          id: 5,
          trip_id: 2,
          city_id: 5
        },
        {
          id: 6,
          trip_id: 3,
          city_id: 6
        }
      ]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('trips_cities_id_seq', (SELECT MAX(id) FROM trips_cities));"
      )
    })
}
