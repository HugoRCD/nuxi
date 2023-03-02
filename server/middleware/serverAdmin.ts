import { H3Event } from "h3";

export default eventHandler(async (event) => {
});

async function protectAdminRoute(event: H3Event) {
  const protectedRoutes = ["/api/admin"];
}
