import ThemeSetterClient from "./ThemeSetterClient";
import { getTheme } from "../actions";

const ThemeSetter = async () => {
  const theme = await getTheme();

  return <ThemeSetterClient theme={theme} />;
};

export default ThemeSetter;
