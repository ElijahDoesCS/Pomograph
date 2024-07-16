import Timer from "./components/timer/Timer";
import Tasks from "./components/tasks/Tasks";
import Header from "./components/header/Header";
import { ThemeProvider, useTheme } from "./contexts/Theme";

function App() {
  const { theme, themeStyles } = useTheme();

  return (
    <>
      {/*bg-red-500*/}
      <div
        className="h-screen w-full flex [bla] flex-col items-center"
        style={{ backgroundColor: themeStyles[theme].mainColor }}
      >
        <Header />
        <Timer />
        <Tasks />
      </div>
    </>
  );
}

export default App;
