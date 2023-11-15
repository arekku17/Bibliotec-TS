export { default } from "next-auth/middleware"


export const config = { matcher: ["/", "/prestamos/:path*", "/registro/:path*", "/servicios/:path*"] }