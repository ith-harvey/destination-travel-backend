exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        {
          id: 1,
          first_name: 'Krystal',
          last_name: 'Parish',
          email: 'email@gmail.com',
          password: '$2a$12$C9AYYmcLVGYlGoO4vSZTPud9ArJwbGRsJ6TUsNULzR48z8fOnTXbS',
        },
        {
          id: 2,
          first_name: 'Ian',
          last_name: 'Harvey',
          email: 'ian@gmail.com',
          password: '$2a$10$CUMnhk8C2o04wqxLunwO6.f32F.GJ1AzdgQ8RiIdEMxN22JetcS/u',
        },
        {
          id: 3,
          fb_user_id: '10214080538506964',
          first_name: 'Mike',
          last_name: 'Hathaway',
          email: 'ekim0293@gmail.com',
          password: null,
        },
        {
          id: 4,
          fb_user_id: '10155528821061369',
          first_name: 'Krystal',
          last_name: 'Parrish',
          email: 'kpmagnolia@gmail.com',
          password: null,
        }

      ]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));"
      )
    })
}
