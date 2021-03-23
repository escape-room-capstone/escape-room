const { expect } = require("chai");
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");
const Sequelize = require("sequelize");
const { STRING } = Sequelize;
const config = {
  logging: false,
};
const conn = new Sequelize(
  process.env.DATABASE_URL || `postgres://localhost:5432/escape_room`,
  config
);
if (process.env.LOGGING) {
  delete config.logging;
}

const User = conn.define("user", {
  username: STRING,
  password: STRING,
});

// bcrypt User.addHook with 10 salt rounds
User.addHook('beforeSave', async function(user) {
  if(user._changed.has("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
})

const syncAndSeed = async () => {
  await conn.sync({ force: true });
  const credentials = [
    { username: "steve", password: "123" },
    { username: "vanessa", password: "123" },
    { username: "kate", password: "123" },
  ];
  const [steve, vanessa, kate] = await Promise.all(
    credentials.map((credential) => User.create(credential))
  );
  return {
    users: {
      steve,
      vanessa,
      kate,
    },
  };
};

// User.authenticate method
User.authenticate = async function ({ username, password }) {
  const user = await User.findOne({
    where: { username },
  });
  // this gets slower because of the 10 salt rounds
  if (user && await bcrypt.compare(password, user.password)) {
    return jwt.sign({ id: user.id }, process.env.JWT);
  }
  const error = Error("bad credentials");
  error.status = 401;
  throw error;
};

// User.byToken method
User.byToken = async function (token) {
  try {
    const { id } = await jwt.verify(token, process.env.JWT);
    const user = await User.findByPk(id);
    if(user) {
        return user;
    }
    const error = Error("bad credentials");
    error.status = 401;
    throw error;
  } catch (ex) {
    const error = Error("bad credentials");
    error.status = 401;
    throw error;
  }
};

describe("Models", () => {
  let seed;
  beforeEach(async () => (seed = await syncAndSeed()));
  describe("seeded data", () => {
    it("there are 3 users", () => {
      expect(Object.keys(seed.users).length).to.equal(3);
    });
  });
  describe("User update", () => {
    describe("change username", () => {
      it("does not change the password", async () => {
        const password = seed.users.steve.password;
        const steve = seed.users.steve
        steve.username = "Steeve"
        await steve.save()
        expect(steve.password).to.equal(password)
      })
    })
  })
  describe("User.authenticate", () => {
    describe("correct credentials", () => {
      it("returns a token", async () => {
        const token = await User.authenticate({
          username: "steve",
          password: "123",
        });
        expect(token).to.be.ok;
        console.log(token);
      });
    });
    describe("incorrect credentials", () => {
      it("throws an error", async () => {
        try {
          await User.authenticate({ username: "steve", password: "321" });
        } catch (error) {
          expect(error.status).to.equal(401);
          expect(error.message).to.equal("bad credentials");
        }
      });
    });
    describe("User.byToken", () => {
      describe("with a valid token", () => {
        it("returns a user", async () => {
          const token = await jwt.sign(
            { id: seed.users.steve.id },
            process.env.JWT
          );
          const user = await User.byToken(token);
          expect(user.username).to.equal("steve");
        });
      });
      describe("with an invalid token", () => {
        it("throws a 401", async () => {
          try {
            const token = await jwt.sign(
              { id: seed.users.steve.id },
              "invalidToken"
            );
            const user = await User.byToken(token);
            throw "noooo";
          } catch (error) {
            expect(error.status).to.equal(401);
            expect(error.message).to.equal("bad credentials");
          }
        });
      });
      describe("with a valid token but no associated user", () => {
        it("throws a 401", async () => {
          try {
            const token = await jwt.sign(
              { id: 99 },
              process.env.JWT
            );
            const user = await User.byToken(token);
            throw "noooo";
          } catch (error) {
            expect(error.status).to.equal(401);
            expect(error.message).to.equal("bad credentials");
          }
        });
      });
    });
  });
});
