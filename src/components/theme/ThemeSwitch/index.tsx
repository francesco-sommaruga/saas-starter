import { getTheme } from "../actions";
import ThemeSwitchClient from "./ThemeSwitchClient";

const ThemeSwitch = async () => {
  const theme = await getTheme();
  return <ThemeSwitchClient theme={theme} />;
};

export default ThemeSwitch;
