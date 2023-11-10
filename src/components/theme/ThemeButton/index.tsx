import { getTheme } from "../actions";
import ThemeButtonClient from "./ThemeButtonClient";

const ThemeButton = async () => {
  const theme = await getTheme();
  return <ThemeButtonClient theme={theme} />;
};

export default ThemeButton;
