import DaoMongoDb from "../../../dao/DaoMongoDb.js"
import usersModel from "../../../dao/models/Users.js"

export default class UsersRepositoryMongoDb extends DaoMongoDb {
    constructor() {
        super(usersModel)
    }

    async save ( addUser ) {
        const result = await this.collection.create(addUser)
        return result
    }

    async findUser ( mail ) {
        const result = await this.collection.findOne({mail: mail})
        return result
    }

    async restorePassword ( mail, password ) {
        const result = await this.collection.updateOne({mail: mail}, {$set: {password: password}})
        return result;
    }
}