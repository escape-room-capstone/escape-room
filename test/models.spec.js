const { expect } = require('chai')
const Sequelize = require('sequelize')
const { STRING } = Sequelize;
const conn = new Sequelize(process.env.DATABASE_URL || `postgres://localhost:5432/escape_room`)

const User = conn.define('user', {
    username: STRING,
    password: STRING
});

const syncAndSeed = async() => {
    await conn.sync({ force: true });
    const credentials = [
        { username: 'steve', password: '123' },
        { username: 'vanessa', password: '123' },
        { username: 'kate', password: '123' },
    ];
    const [steve, vanessa, kate] = await Promise.all(
        credentials.map( credential => User.create(credential))
    );
    return {
        users: {
            steve,
            vanessa,
            kate
        }
    }
}

describe("Models", () => {
    let seed;
    beforeEach(async()=> seed = await syncAndSeed())
    describe("seeded data", ()=> {
        it("there are 3 users", ()=> {
            expect(Object.keys(seed.users).length).to.equal(3)
        })
    })
})