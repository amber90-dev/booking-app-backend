"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("dotenv/config");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./src/users/user.entity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: [user_entity_1.User],
    synchronize: true,
    logging: false
});
exports.default = exports.AppDataSource;
//# sourceMappingURL=ormconfig.js.map