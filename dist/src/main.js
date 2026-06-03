"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cookie_parser_1 = __importDefault(require("cookie-parser")); // <-- change this
const path_1 = require("path");
const common_1 = require("@nestjs/common");
let SafeExceptionsFilter = class SafeExceptionsFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        console.error("CRITICAL EXCEPTION CAUGHT:", exception);
        let status = 500;
        let message = "Internal server error";
        if (exception && typeof exception.getStatus === "function") {
            status = exception.getStatus();
        }
        if (exception && exception.message) {
            message = exception.message;
        }
        response.status(status).json({
            statusCode: status,
            message: message,
            error: exception && exception.name ? exception.name : "Error",
        });
    }
};
SafeExceptionsFilter = __decorate([
    (0, common_1.Catch)()
], SafeExceptionsFilter);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalFilters(new SafeExceptionsFilter());
    // Serve static assets from uploads folder
    app.useStaticAssets((0, path_1.join)(process.cwd(), 'uploads'), {
        prefix: '/uploads',
    });
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