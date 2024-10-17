import Header from "./Components/Header";
import NavBar from "./Components/NavBar";
import MatrixControls from "./Components/MatrixControls";
import QuestionInfo from "./Components/QuestionInfo";
import QuestionName from "./Components/QuestionName";
import ResponseProps from "./Components/ResponseProps";
import ColWidth from "./Components/ColWidth";
import MatrixSingle from "./Components/MatrixSingle";

export default function MyApp() {
  return (
    <>
      <Header />
      <NavBar />
      <MatrixControls />
      <QuestionInfo />
      <QuestionName />
      <ResponseProps />
      <ColWidth />
      <MatrixSingle />
    </>
  );
}
