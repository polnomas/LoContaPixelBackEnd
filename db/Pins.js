class Pins {
    static instance = null
    constructor(db){
        if (Pins.instance) return Pins.instance
        console.log("Obteniendo pins")
        this.collection = db.collection('pins')
        Pins.instance = this
    }
    async readAll() {
        return this.collection.find().toArray()
    }
    async createNew(data) {
        if (!data || !data.x || !data.y || !data.description || !data.publicId) {
            throw new Error('Faltan atributos mínimos')
        }
        return this.collection.insertOne(data)
    }
}

export default Pins