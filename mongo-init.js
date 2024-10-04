db.createUser({
    user: 'spoofyUser',
    pwd: 'spoofyPassword',
    roles: [
      {
        role: 'readWrite',
        db: 'spoofy-database'
      }
    ]
  });