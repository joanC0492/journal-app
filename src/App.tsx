import { AppRouter } from "./routes/AppRouter";
import { AppTheme } from "./theme";

export const App: React.FC = () => {
  return (
    <div className="App">
      <AppTheme>
        <AppRouter />
      </AppTheme>
    </div>
  );
};
