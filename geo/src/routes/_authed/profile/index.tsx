/**
 * Profile Page
 */

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authed/profile/")({
  component: ProfileIndex,
})

function ProfileIndex() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="grid auto-rows-min gap-4 md:grid-cols-[minmax(0,1fr)_300px]">
        <div className="order-2 rounded-xl bg-muted/50 md:order-1">
          Profile 1
        </div>
        <div className="order-1 md:order-2 p-4">
          <div className="aspect-square rounded-xl bg-muted/50">
            Picture
          </div>
          <div className="bg-muted/50 mt-4 p-4">
            Information
          </div>
        </div>
      </div>
    </div>
  );
}
