import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthAppRouter } from "@/app/auth/routes/AuthAppRouter";
import { JournalAppRouter } from "@/app/journalApp/routes/JournalAppRouter";
import { GlobalProvider } from "@/store/context";
import { CheckingAuth } from "@/shared/components";
import { useCheckAuth } from "@/shared/hooks";

export const AppRouter: React.FC = () => {
  const status = useCheckAuth();
  if (status === "checking") return <CheckingAuth />;
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          {status === "authenticated" ? (
            <Route path="/*" element={<JournalAppRouter />} />
          ) : (
            <Route path="/auth/*" element={<AuthAppRouter />} />
          )}

          <Route path="*" element={<Navigate replace to={"auth/login"} />} />
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
};
