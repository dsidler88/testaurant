import { Item } from "@prisma/client";
import MenuCard from "./MenuCard";

//item is a type from Prisma. You can find it by looking at the schema.prisma file
//or hovering over where you pass it. in the fetchRestaurantMenu function in page.tsx
export function Menu({ menu }: { menu: Item[] }) {
  return (
    <main className="bg-white mt-5">
      <div>
        <div className="mt-4 pb-1 mb-1">
          <h1 className="font-bold text-4xl">Menu</h1>
        </div>
        {menu.length ? (
          <div className="flex flex-wrap justify-between">
            {/* Iterate over each Item[] and render a MenuCard. Modify MenuCard to accept item*/}
            {menu.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap justify-between">
            {/* if there is no menu provided*/}
            <p>This Restaurant does not have a menu</p>
          </div>
        )}
      </div>
    </main>
  );
}
