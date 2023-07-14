import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//typing this is necessary so handler knows what to expect from the query
  const { slug, day, time, partySize } = req.query as {
    slug: string;
    day: string;
    time: string;
    partySize: string;
  };


  const {
    bookerEmail,
    bookerPhone,
    bookerFirstName,
    bookerLastName,
    bookerOccasion,
    bookerRequest,
  } = req.body;


  const restaurant = await prisma.restaurant.findUnique({
    where:{
        slug
    }
  })

  if(!restaurant){
    return res.status(400).json({
      errorMessage: "invalid data",
    });
  }

  if (
    new Date(`${day}T${time}`) < new Date(`${day}T${restaurant.open_time}`) ||
    new Date(`${day}T${time}`) > new Date(`${day}T${restaurant.close_time}`)
  ) {
    return res.status(400).json({
      errorMessage: "Restaurant is not open at that time",
    });
  }

  return res.json({
    slug, day, time, partySize
  })
}

//http://localhost:3000/api/restaurant/coconut-lagoon-ottawa/reserve?day=2021-10-10&time=18:00:00.000Z&partySize=2
