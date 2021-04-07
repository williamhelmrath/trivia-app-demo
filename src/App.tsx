import { ChangeEvent, useState } from "react";
import BasicTrivia from "./components/basic/BasicTrivia";
import AdvancedTrivia from "./components/advanced/AdvancedTrivia";
import Header from "./components/Header";

function App() {
  const [tab, setTab] = useState(0);

  const handleTabChange = (event: ChangeEvent<{}>, newValue: number) =>
    setTab(newValue);

  return (
    <div className="App">
      <Header tab={tab} handleTabChange={handleTabChange} />
      {tab === 0 ? <BasicTrivia /> : <AdvancedTrivia />}
    </div>
  );
}

export default App;
