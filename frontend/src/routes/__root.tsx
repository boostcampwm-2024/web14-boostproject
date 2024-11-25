import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { RootHeader } from "@/shared/components/RootHeader";
import { RootSideBar } from "@/shared/components/RootSideBar";
import { UserProvider } from "@/app/provider/UserProvider";
import type { Auth } from "@/shared/lib/auth";

export const Route = createRootRouteWithContext<{ auth: Auth }>()({
  component: () => (
    <UserProvider>
      <RootLayout>
        <RootHeader />
        <RootSideBar />
        <Outlet />
      </RootLayout>
    </UserProvider>
  ),
});

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`h-h-full layout ml-auto mr-auto grid max-h-[834px] w-full max-w-[520px]`}
    >
      {children}
    </div>
  );
}

export { RootLayout };
