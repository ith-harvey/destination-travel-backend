exports.seed = function(knex, Promise) {
  return knex('markers').del()
    .then(function () {
      return knex('markers').insert([

        {
          id: 1,
          city_id: 1,
          marker_name: 'Vinkeles',
          marker_description: 'loved it, really great italian with an excellent atmosphere',
          marker_lat: '52.369',
          marker_lng: '4.884',
          marker_place_id: 'ChIJg8bf-sIJxkcR9mc7li6y48E'
        },
        {
          id: 2,
          city_id: 1,
          marker_name: 'Restaurant Zaza\'s',
          marker_description: 'food was kind of mediocre...',
          marker_lat: '52.3561921',
          marker_lng: '4.8920938999999635',
          marker_place_id: 'ChIJY_IxVu0JxkcRi3NPxcHUO4o'
        },
        {
          id: 3,
          city_id: 1,
          marker_name: 'Hotel Okura Amesterdam',
          marker_description: 'had a great stay, I loved this place. The pillows were perfect!',
          marker_lat: '52.348763',
          marker_lng: '4.89388299999996',
          marker_place_id: 'ChIJMzqLEIsJxkcRp0BQroIzgGc'
        },
        {
          id: 4,
          city_id: 8,
          marker_name: 'Los Nardos',
          marker_description: 'had a great stay, I loved this place. The pillows were perfect!',
          marker_lat: '23.1347',
          marker_lng: '-82.3582',
          marker_place_id: 'ChIJpRzei7B5zYgRAtzsYjssOhM'
        },
        {
          id: 5,
          city_id: 8,
          marker_name: 'Hotel Santa Isabel Boutique',
          marker_description: 'had a great stay, I loved this place. The pillows were perfect!',
          marker_lat: '23.1402',
          marker_lng: '-82.3487',
          marker_place_id: 'ChIJdZBmSmB3zYgRnyE-DAZAX0w'
        },
        {
          id: 6,
          city_id: 7,
          marker_name: 'Reykjavik Lights by Keahotels',
          marker_description: 'had a great stay, I loved this place. The pillows were perfect!',
          marker_lat: '64.1395',
          marker_lng: '-21.8822',
          marker_place_id: 'ChIJF12rqr901kgRr-rNAybiMbI'
        }
      ]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('markers_id_seq', (SELECT MAX(id) FROM markers));"
      )
    })
}
