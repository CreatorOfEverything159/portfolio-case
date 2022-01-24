const db = require('../db')

class PersonController {
    async createPerson(req, res) {
        const {
            fio,
            Pic,
            lvl_ed,
            Contacts,
            Stazh,
            School,
            Dolzhnost,
            Obrazovanie,
            Kvalific,
            Publications,
            Projects,
            Stud_Succ,
            Prilozh,
            Spec
        } = req.body

        const newPerson = await db.query("INSERT INTO persons (fio, Pic, lvl_ed, Contacts, Stazh, School, Dolzhnost, Obrazovanie, Kvalific, Publications, Projects, Stud_Succ, Prilozh, Spec) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *", [fio, Pic, lvl_ed, Contacts, Stazh, School, Dolzhnost, Obrazovanie, Kvalific, Publications, Projects, Stud_Succ, Prilozh, Spec])

        res.json(newPerson.rows[0])
    }

    async getPeople(req, res) {
        const people = await db.query("SELECT * FROM persons")
        res.json(people.rows)
    }

    async getOnePerson(req, res) {
        const id = req.params.id
        const person = await db.query("SELECT * FROM persons where id = $1", [id])
        res.json(person.rows[0])
    }

    async updatePerson(req, res) {
        const {
            id,
            fio,
            Pic,
            lvl_ed,
            Contacts,
            Stazh,
            School,
            Dolzhnost,
            Obrazovanie,
            Kvalific,
            Publications,
            Projects,
            Stud_Succ,
            Prilozh,
            Spec
        } = req.body

        const updPerson = await db.query(`UPDATE persons set fio = $1, Pic = $2, lvl_ed = $3, Contacts = $4, Stazh = $5, School = $6, Dolzhnost = $7, Obrazovanie = $8, Kvalific = $9, Publications = $10, Projects = $11, Stud_Succ = $12, Prilozh = $13, Spec = $14 where id = $15 RETURNING *`, [fio, Pic, lvl_ed, Contacts, Stazh, School, Dolzhnost, Obrazovanie, Kvalific, Publications, Projects, Stud_Succ, Prilozh, Spec, id])
        res.json(updPerson.rows[0])
    }

    async deletePerson(req, res) {
        const id = req.params.id
        const person = await db.query("DELETE FROM persons where id = $1", [id])
        res.json(person.rows[0])
    }

    async findPeople(req, res) {
        const { whatFind, whereFind } = req.body
        const find = await db.query(`SELECT * FROM persons where ${whereFind} ILIKE '%${whatFind}%'`)
        res.json(find.rows)
    }
}

module.exports = new PersonController()
