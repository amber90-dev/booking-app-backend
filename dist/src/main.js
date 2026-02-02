"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cookie_parser_1 = __importDefault(require("cookie-parser")); // <-- change this
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    // Trust proxy is required for secure cookies behind Nginx/Load Balancer
    app.set('trust proxy', 1);
    app.enableCors({
        origin: (origin, callback) => {
            // Allow requests with no origin (like mobile apps or curl requests)
            if (!origin)
                return callback(null, true);
            // trusting all origins for now to fix deployment issues, or restrict to domain
            callback(null, true);
        },
        credentials: true,
    });
    app.use((0, cookie_parser_1.default)());
    await app.listen(process.env.PORT || 3000);
    console.log(`API running on port ${process.env.PORT || 3000}`);
}
bootstrap();
//# sourceMappingURL=main.js.map