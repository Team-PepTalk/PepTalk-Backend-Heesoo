"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeORMConfig = void 0;
const user_entity_1 = require("../users/entities/user.entity");
exports.typeORMConfig = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'Peptalk',
    entities: [__dirname + '/../**/*.entity.{js,ts}', user_entity_1.User],
    synchronize: true,
};
//# sourceMappingURL=typeorm.config.js.map