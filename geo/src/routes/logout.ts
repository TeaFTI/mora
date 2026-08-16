import { createFileRoute } from "@tanstack/react-router";

import { logoutFn } from "~/server/authentication/logout";

export const Route = createFileRoute("/logout")({
  loader: async () => {
    const result = await logoutFn()

    if (result?.error) {
      throw new Error(result.error)
    }
  },
})
