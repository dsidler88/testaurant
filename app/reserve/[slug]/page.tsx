import Form from "./components/Form";
import Header from "./components/Header";

export const metadata = {
  title: "Reserve a table at Testaurant",
  description: "This is the page where you reserve a table",
};

export default function Reserve() {
  return (
    <div className="border-t h-screen">
      <div className="py-9 w-3/5 m-auto">
        <Header />
        <Form />
      </div>
    </div>
  );
}
