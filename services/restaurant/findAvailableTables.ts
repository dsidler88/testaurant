//extract logic

import { times } from "@/data";
import { PrismaClient } from "@prisma/client";
import { NextApiResponse } from "next";

const prisma = new PrismaClient();
export const findAvailableTables = async ({
  time,
  day,
  res,
  slug,
}: {
  time: string;
  day: string;
  res: NextApiResponse;
  slug: string;
}) => {
  //searches the array based on the time in the query, and returns the searchTimes
  //from the same object
  const searchTimes = times.find((item) => {
    return item.time === time;
  })?.searchTimes;

  //if it can't find the searchTimes, it will return an error
  if (!searchTimes) {
    return res.status(400).json({
      errorMessage: "Please fill all the fields",
    });
  }

  const formattedSearchTimes = searchTimes.map((time) => {
    const trimmedTime = time.slice(0, -5); // Remove the last 5 characters (".000Z")
    return new Date(trimmedTime);
  });

  //console.log(new Date(`${day}T${formattedSearchTimes[0]}:00`));

  const bookings = await prisma.booking.findMany({
    where: {
      booking_time: {
        gte: new Date(`${day}T${searchTimes[0]}`),
        lte: new Date(`${day}T${searchTimes[searchTimes.length - 1]}`),
      },
    },
    select: {
      number_of_people: true,
      booking_time: true,
      tables: true,
    },
  });

  //example of the object
  //   "booking1": {
  //     1: true,

  //   },
  const bookingTablesObj: { [key: string]: { [key: number]: true } } = {};

  bookings.forEach((booking) => {
    bookingTablesObj[booking.booking_time.toISOString()] =
      booking.tables.reduce((obj, table) => {
        return {
          ...obj,
          [table.table_id]: true,
        };
      }, {});
  });

  //added open time and close time later when we did availaibiltiy
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      tables: true,
      open_time: true,
      close_time: true,
    },
  });

  if (!restaurant) {
    return res.status(400).json({
      errorMessage: "Please fill all the fields",
    });
  }

  const tables = restaurant.tables;

  const searchTimesWithTables = searchTimes.map((searchTime) => {
    return {
      date: new Date(`${day}T${searchTime}`),
      time: searchTime,
      tables,
    };
  });
  return searchTimesWithTables;
};
