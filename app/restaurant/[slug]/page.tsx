import Header from "./components/Header";
import RestaurantNavBar from "./components/RestaurantNavBar";
import Title from "./components/Title";
import Rating from "./components/Rating";
import Description from "./components/Description";
import Images from "./components/Images";
import Reviews from "./components/Reviews";
import { PrismaClient, Review } from "@prisma/client";
import { notFound } from "next/navigation";
import ReservationCard from "./components/ReservationCard";

//server component so we can get data directly from DB
const prisma = new PrismaClient();

interface Restaurant {
  id: number;
  name: string;
  images: string[];
  description: string;
  open_time: string;
  close_time: string;
  slug: string;
  reviews: Review[];
}

//slug is unique to each restaurant
//since slug is unique, we can use it to fetch the restaurant from the DB
//must return promise of type Restaurant
const fetchRestaurantBySlug = async (slug: string): Promise<Restaurant> => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    //only select these fields
    select: {
      id: true,
      name: true,
      images: true,
      description: true,
      slug: true,
      reviews: true,
      open_time: true,
      close_time: true,
    },
  });

  //type could also be null if restaurant doesn't exist
  //throw new Error(message) pulls up error.tsx, not-found.tsx is for 404
  if (!restaurant) notFound();
  return restaurant;
};

//dynamic route. when /restaurant/[ANYTHING] is called, this component is called with the ANYTHING as a prop

export default async function RestaurantDetails({
  params,
}: {
  params: { slug: string };
}) {
  //props is an object with a key of "slug"
  //Next KNOWS because of the [slug] in the path
  const restaurant = await fetchRestaurantBySlug(params.slug);
  //console.log(restaurant);
  return (
    <>
      <div className="bg-white w-[70%] rounded p-3 shadow">
        <RestaurantNavBar slug={restaurant.slug} />
        <Title name={restaurant.name} />
        <Rating reviews={restaurant.reviews} />
        <Description description={restaurant.description} />
        <Images images={restaurant.images} />
        <Reviews reviews={restaurant.reviews} />
      </div>
      <div className="w-[27%] relative first-letter:text-reg">
        <ReservationCard
          openTime={restaurant.open_time}
          closeTime={restaurant.close_time}
        />
      </div>
    </>
  );
}
