import { createBrowserRouter, Navigate } from "react-router-dom";
import { MyNotes } from "./pages/MyNotes/MyNotes";
import { CreateNote } from "./pages/CreateNote/CreateNote";
import { EditNote } from "./pages/EditNote/EditNote";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MyNotes />,
  },
  {
    path: "/createNote",
    element: <CreateNote />,
  },
  {
    path: "/editNote/:id",
    element: <EditNote />,
  },
]);
/* Quick fix for netlify */

export default router;
