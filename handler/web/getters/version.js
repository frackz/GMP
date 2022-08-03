module.exports = {
    route: '/gmp/version',
    async execute(req, res, db, config) {
        res.send('1.0')
    }
}