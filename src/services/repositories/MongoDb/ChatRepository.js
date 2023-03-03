import DaoMongoDb from "../../../dao/DaoMongoDb.js";
import chatModel from "../../../dao/models/Chat.js";

export default class ChatRepositoryMongoDb extends DaoMongoDb {
    constructor() {
        super(chatModel)
    }

    async save ( add ) {
        await this.collection.create(add)
    }
}