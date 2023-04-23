import Header from "./components/Header";

export const metadata = {
  title: "NextJS 13",
  description: "Welcome to the restaurant page",
};

//layout only applies to the pages in the restaurant/[slug] folder
//children arguments are the JSX of the page we are currently on
//params are the props automatically passed to the page
export default function RestaurantLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  return (
    <main>
      <Header name={params.slug} />
      <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
        {children}
      </div>
    </main>
  );
}
