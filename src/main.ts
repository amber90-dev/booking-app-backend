import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "./app.module";
import cookieParser from "cookie-parser"; // <-- change this

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  // Trust proxy is required for secure cookies behind Nginx/Load Balancer
  app.set('trust proxy', 1);

  app.enableCors({
    origin: (origin: string, callback: (err: Error | null, allow?: boolean) => void) => {
       // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      // trusting all origins for now to fix deployment issues, or restrict to domain
      callback(null, true); 
    },
    credentials: true,
  });
  app.use(cookieParser());
  await app.listen(process.env.PORT || 3000);
  console.log(`API running on port ${process.env.PORT || 3000}`);
}
bootstrap();
