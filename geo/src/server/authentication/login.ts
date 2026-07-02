/**
 * Login
 */

import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { isAPIError } from "better-auth/api";

import { auth } from "~/_betterauth/auth";
import { loginSchema } from "./schema";

const loginFn = createServerFn({ method: "POST" })
  .validator(loginSchema)
  .handler(async ({ data }) => {
    try {
      const response = await auth.api.signInEmail({
        body: {
          email: data.username,
          password: data.password,
        },
        headers: await getRequestHeaders(),
      });
      console.debug("BETTER-AUTH Login Response: ", response);
    } catch (error) {
      // BETTER-AUTH Error
      if (isAPIError(error)) {
        console.error("BetterAuth Error Status: ", error.status);
        console.error("BetterAuth Error Message: ", error.message);
        return { error: error.message };
      }

      // General Error
      throw error;
    }

    throw redirect({ to: "/main" })
  });

export {
  loginFn
};
