import { MongoClient, ServerApiVersion } from "mongodb";
import "dotenv/config";
import { MONGODB_URI } from "../config/dbUri.js";

class DBProvider {
  static instance = null
  constructor() {
    if (DBProvider.instance) {
      return DBProvider.instance
    }
    console.log("Instanciando DBProvider")
    this.mongoClient = new MongoClient(MONGODB_URI, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
      }
    })
    this.dbName = process.env.MONGODB_NAME
    this.db = null
    DBProvider.instance = this
  }
  async connect() {
    if (!this.db) {
      console.log("Conectando a la DB")
      await this.mongoClient.connect()
      await this.mongoClient.db("admin").command({ ping: 1 })
      console.log("Ping exitoso, conectado a la DB.")
      this.db = this.mongoClient.db(this.dbName)
    }
  }
  static async getInstance() {
    if (!DBProvider.instance) {
      const provider = new DBProvider()
      await provider.connect()
    }
    return DBProvider.instance
  }
  getDB() {
    if (!this.db) {
      throw new Error(
        "Se debe obtener una instancia del DBProvider desde getInstance!!!"
      )
    }
    return this.db
  }
}

async function getDB() {
  return (await DBProvider.getInstance()).getDB()
}

export default getDB
