"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("dotenv/config");
const ormconfig_1 = require("../ormconfig");
const user_entity_1 = require("./users/user.entity");
const bcrypt = __importStar(require("bcrypt"));
async function run() {
    await ormconfig_1.AppDataSource.initialize();
    const repo = ormconfig_1.AppDataSource.getRepository(user_entity_1.User);
    const username = process.env.SEED_SUPERADMIN_USERNAME || 'superadmin';
    const email = process.env.SEED_SUPERADMIN_EMAIL || 'superadmin@example.com';
    const password = process.env.SEED_SUPERADMIN_PASSWORD || 'supersecret';
    let user = await repo.findOne({ where: { username } });
    if (!user) {
        user = repo.create({
            username,
            email,
            passwordHash: await bcrypt.hash(password, 12),
            role: 'superadmin'
        });
        await repo.save(user);
        console.log('Seeded superadmin:', username);
    }
    else {
        console.log('Superadmin already exists:', username);
    }
    await ormconfig_1.AppDataSource.destroy();
}
run().catch(e => { console.error(e); process.exit(1); });
//# sourceMappingURL=seed.js.map