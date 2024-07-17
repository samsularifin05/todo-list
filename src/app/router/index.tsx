import { NotFoundError } from "@/pages";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/admin",
    lazy: async () => {
      const AppShell = await import("../../shared/ui/theme/app-shell");
      return { Component: AppShell.default };
    },
    errorElement: <NotFoundError />,
    children: [
      {
        index: true,
        path: "todolist",
        lazy: async () => ({
          Component: (await import("../../pages/admin/todoList/todoList.tsx"))
            .default
        })
      }
    ]
  },
  {
    path: "/",
    lazy: async () => ({
      Component: (await import("../../pages/admin/auth/login/ui")).default
    })
  },
  {
    path: "/register",
    lazy: async () => ({
      Component: (await import("../../pages/admin/auth/register/ui")).default
    })
  },

  {
    path: "*",
    lazy: async () => ({
      Component: (await import("../../pages/errors/not-found-error")).default
    })
  }
]);

export default router;
