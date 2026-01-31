import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import cookieParser from "cookie-parser"; // <-- change this

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ["http://localhost:5173"],
    credentials: true,
  });
  app.use(cookieParser());
  await app.listen(3000);
  console.log("API on http://localhost:3000");
}
bootstrap();
