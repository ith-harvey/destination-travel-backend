exports.seed = function(knex, Promise) {
  return knex('markers').del()
    .then(function () {
      return knex('markers').insert([
        //52.37,
        // city_lng: 4.895
        {
          id: 1,
          city_id: 1,
          marker_name: 'Vinkeles',
          marker_description: 'loved it, really great italian with an excellent atmosphere',
          marker_lat: '52.369',
          marker_lng: '4.884'
        },
        {
          id: 2,
          city_id: 1,
          marker_name: 'Restaurant Zaza\'s',
          marker_description: 'food was kind of mediocre...',
          marker_lat: '52.3561921',
          marker_lng: '4.8920938999999635'
        },
        {
          id: 3,
          city_id: 1,
          marker_name: 'Hotel Okura Amesterdam',
          marker_description: 'had a great stay, I loved this place. The pillows were perfect!',
          marker_lat: '52.348763',
          marker_lng: '4.89388299999996'
        }
      ]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('markers_id_seq', (SELECT MAX(id) FROM markers));"
      )
    })
}
