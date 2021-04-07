import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { ChangeEvent } from "react";

interface HeaderProps {
  tab: number;
  handleTabChange: (event: ChangeEvent<{}>, value: number) => void;
}

export default function Header({ tab, handleTabChange }: HeaderProps) {
  return (
    <Tabs
      value={tab}
      onChange={handleTabChange}
      centered
      style={{ marginBottom: 30 }}
    >
      <Tab label="Basic" />
      <Tab label="Advanced" />
    </Tabs>
  );
}
