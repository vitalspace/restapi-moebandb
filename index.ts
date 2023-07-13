import { serve } from "bun";
import { Moeban } from "@bunland/moeban";

// Model
const users = new Moeban("example.json", "users");

// Server and EndPoints!!
serve({
  async fetch(request) {
    const { url, method } = request;
    const { pathname } = new URL(url);

    if (pathname === "/api/users" && method === "GET") {
      return new Response(JSON.stringify(await users.find()), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-control-allow-origin": "*",
        },
      });
    }

    if (pathname === "/api/createuser" && method === "POST") {
      const body: object = await request.json();
      const usersList = await users.find();
      //@ts-ignore
      const id = usersList.length + 1;
      await users.write({ id, ...body });
      return new Response(JSON.stringify(await users.find()), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-control-allow-origin": "*",
        },
      });
    }

    if (pathname === "/api/finduser" && method === "POST") {
      type User = { id: string };
      const body: User = await request.json();
      const user = await users.findOne("id", body.id);
      return new Response(JSON.stringify(user), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-control-allow-origin": "*",
        },
      });
    }

    if (pathname === "/api/deleteuser" && method === "DELETE") {
      type User = { id: string };
      const body: User = await request.json();

      try {
        await users.removeOne("id", body.id);
        return new Response(
          JSON.stringify({ message: `The user ${body.id} was removed` }),
          {
            status: 200,
            headers: {
              "Content-Type": "application/json",
              "Access-control-allow-origin": "*",
            },
          }
        );
      } catch (error) {
        return new Response(
          JSON.stringify({
            message: `We cannot delete the user because it does not exist or was found.`,
          })
        );
      }
    }
    return new Response(`404!`);
  },
  port: 3000,
});
