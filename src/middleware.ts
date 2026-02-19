export { auth as middleware } from "@/auth";

export const config = {
  matcher: [
    // Match all paths except static files, images, and API routes
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
