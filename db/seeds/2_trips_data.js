exports.seed = function(knex, Promise) {
  return knex('trips').del()
    .then(function () {
      return knex('trips').insert([
        {
          id: 1,
          user_id: 2,
          trip_name: 'Trip through Southern Europe',
          trip_description: 'Going with Sam, Spencer and Rob. All about adventure baby.'
        },
        {
          id: 2,
          user_id: 2,
          trip_name: 'Trip to Australia and India',
          trip_description: 'Meeting up with my friends in Australia, Sammy then headed to india to meet up with Stefan.'
        },
        {
          id: 3,
          user_id: 2,
          trip_name: 'Trip through China and Taiwan',
          trip_description: 'All by myself. Dont wanna be..'
        }
      ]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('trips_id_seq', (SELECT MAX(id) FROM trips));"
      )
    })
}
