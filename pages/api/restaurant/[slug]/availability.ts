import { NextApiRequest, NextApiResponse } from "next";
import { times } from "@/data";
import { PrismaClient } from "@prisma/client";
import { table } from "console";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { slug, day, time, partySize } = req.query as {
    slug: string;
    day: string;
    time: string;
    partySize: string;
  };

  if (!day || !time || !partySize) {
    return res.status(400).json({
      errorMessage: "Please fill all the fields",
    });
  }

  

  //the return has an entry for each searchable time on each date, and a "tables" array with each booking 
  //we need to use that to filter out the tables that are already booked

  searchTimesWithTables.forEach(t =>{
    t.tables = t.tables.filter(table => {
      if(bookingTablesObj[t.date.toISOString()]){
        if(bookingTablesObj[t.date.toISOString()][table.id]) return false
      }
      return true
    })
  })

  //append a filter at the end of this to filter out when restaurant is closed
  const availabilities = searchTimesWithTables.map(t =>{
    const sumSeats = t.tables.reduce((sum, table) => {
      return sum + table.seats
    }, 0)

    return {
      time: t.time,
      available: sumSeats >= parseInt(partySize)
    }
  }).filter(availability => {
    const timeIsAfterOpening = new Date(`${day}T${availability.time}`) >= new Date(`${day}T${restaurant.open_time}`)
    const timeIsBeforeClosing = new Date(`${day}T${availability.time}`) <= new Date(`${day}T${restaurant.close_time}`)
    return timeIsAfterOpening && timeIsBeforeClosing
  })

  //return an array rather than an {object}
  return res.status(200).json(availabilities);
}

//http://localhost:3000/api/restaurant/coconut-lagoon-ottawa/availability?day=2021-10-10&time=18:00:00.000Z&partySize=2
