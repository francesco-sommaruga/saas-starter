import ThemeSwitchButton from "@/components/ThemeSwitchButton";
import { Card } from "@/components/ui/card";
import ThemeSwitch from "@/components/theme/ThemeSwitch";

const AccountSettingsPage = () => {
  return (
    <Card className="p-6 border border-foreground/30">
      <h1 className="font-semibold text-xl pb-4">Account Settings</h1>
      <ThemeSwitch />
    </Card>
  );
};

export default AccountSettingsPage;
