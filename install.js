module.exports = {
  /**
   * Install function run in we.js project install.
   *
   * @param  {Object}   we    we.js object
   * @param  {Function} done  callback
   */
  install: function install (we, done) {
    we.log.info('Starting project install...');

    const fns = [];

    let u;

    fns.push(function registerUser1(done) {
      const user1 = {
        username: 'admin',
        email: 'teste@example.com',
        password: '123', // change after install
        displayName: 'Administrator',
        active: true,
        roles: ['administrator']
      };

      we.log.info('I will create the user: ', user1);

      we.db.models.user.findOrCreate({
        where: { email: user1.email },
        defaults: user1
      })
      .spread( (user)=> {
        u = user;
        we.log.info('New User with id: ', user.id);
        // install we-plugin-auth for use password
        if (!we.db.models.password) {
          done();
          return null;
        }
        // set the password
        return we.db.models.password.create({
          userId: user.id,
          password: user1.password,
          confirmPassword: user1.password
        })
        .then( ()=> {
          done();
          return null;
        });
      })
      .catch(done);
    });

    we.utils.async.series(fns, done);
  }
};
