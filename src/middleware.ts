import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

export default createMiddleware(routing);

export const config = {
  // "/" нужно указать явно, иначе корень не редиректит на дефолтную локаль
  matcher: ["/", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
