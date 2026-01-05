import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import BusList from "../component/BusList";
import { useFetchBuses } from "../Api/fetchApi";
import notFound from "../assets/notFound.webp";

import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { Badge } from "antd";
import { FloatButton } from "antd";
import { Empty } from "antd";

export default function Bus() {
  const [searchRoute, setSearchRoute] = useState({ from: "", to: "" });
  const [orderBus, setOrderBus] = useState("");
  const { data: buses, isLoading, error } = useFetchBuses();

  if (isLoading) {
    return (
      <Typography variant="h4" sx={{ textAlign: "center", marginTop: "40px" }}>
        Loading...
      </Typography>
    );
  }
  if (error) {
    return (
      <Typography variant="h4" className="text-center text-red-600">
        Bus Not Found!
      </Typography>
    );
  }

  const filteredBuses = buses.filter(({ from, to }) => {
    const searchFrom = searchRoute.from.toLowerCase();
    const searchTo = searchRoute.to.toLowerCase();
    return (
      from.toLowerCase().includes(searchFrom) &&
      to.toLowerCase().includes(searchTo)
    );
  });

  let sortedBuses = [...filteredBuses];
  if (orderBus === "busTypeAC") {
    sortedBuses.sort((a, b) => a.busType.localeCompare(b.busType));
  } else if (orderBus === "busTypeNonAC") {
    sortedBuses.sort((a, b) => b.busType.localeCompare(a.busType));
  } else if (orderBus === "price") {
    sortedBuses.sort((a, b) => a.price - b.price);
  }

  const handleSwap = () => {
    setSearchRoute({ from: searchRoute.to, to: searchRoute.from });
  };

  return (
    <div className="py-8 bg-blue w-screen min-h-screen dark:bg-gray">
      <div className="grid place-items-center bg-white shadow-xl py-6 text-center w-screen dark:bg-dark-card">
        <div className="*:mr-3">
          <Typography
            variant="h5"
            className="text-center text-gray-600 dark:text-white"
          >
            Search Your Route
          </Typography>

          <input
            type="text"
            name="from"
            placeholder="From"
            value={searchRoute.from}
            onChange={(e) =>
              setSearchRoute({ ...searchRoute, from: e.target.value })
            }
            className="border border-gray rounded-sm p-2 mt-3 dark:border-gray-400 dark:bg-gray dark:text-white"
          />
          <SwapHorizIcon
            onClick={handleSwap}
            sx={{
              bgcolor: "var(--color-green)",
              color: "white",
              borderRadius: "50%",
              padding: "2px",
              fontSize: "35px",
              cursor: "pointer",
            }}
          />
          <input
            type="text"
            name="to"
            placeholder="To"
            value={searchRoute.to}
            onChange={(e) =>
              setSearchRoute({ ...searchRoute, to: e.target.value })
            }
            className="border border-gray rounded-sm p-2 mt-3 dark:border-gray-400 dark:bg-gray dark:text-white"
          />
          <select
            name="orderBus"
            value={orderBus}
            onChange={(e) => setOrderBus(e.target.value)}
            className="border border-gray rounded-sm py-2.5 px-4 mt-3 w-66 dark:border-gray-400 dark:bg-gray dark:text-white"
          >
            <option value="">Sort Bus Type or Price</option>
            <option value="busTypeAC">AC</option>
            <option value="busTypeNonAC">Non-AC</option>
            <option value="price">Price</option>
          </select>
        </div>
      </div>

      <Typography
        variant="h4"
        className="text-center text-gray-500 flex justify-center dark:text-white"
        sx={{ marginTop: "25px" }}
      >
        {sortedBuses.length === 0 ? (
          <Empty
            image={notFound}
            styles={{
              image: {
                height: 400,
              },
            }}
            description={
              <p className="text-xl dark:text-white">No Buses Available!</p>
            }
          />
        ) : (
          " Available Buses"
        )}
      </Typography>

      <Container maxWidth="xl">
        <div className="grid grid-cols-1 place-items-center gap-y-10 mt-8 px-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sortedBuses.map((bus) =>
            bus.seatsAvailable - bus.bookedSeats.length === 0 ? (
              <Badge.Ribbon
                text="BOOKED"
                color="#247881"
                style={{ fontSize: "16px", paddingBlock: "3px" }}
                key={bus.id}
              >
                <BusList bus={bus} />
              </Badge.Ribbon>
            ) : (
              <BusList bus={bus} key={bus.id} />
            )
          )}
        </div>
      </Container>

      <Outlet />
      <FloatButton.BackTop style={{ height: "55px", width: "55px" }} />
    </div>
  );
}

//   const filterBuses = useMemo(() => {
//     return buses.filter(({ from, to }) => {
//       const searchFrom = searchRoute.from.toLowerCase();
//       const searchTo = searchRoute.to.toLowerCase();
//       return (
//         from.toLowerCase().includes(searchFrom) &&
//         to.toLowerCase().includes(searchTo)
//       );
//     });
//   }, [buses, searchRoute]);

//   const orderBusData = useMemo(() => {
//     const sortData = [...filterBuses];
//     if (orderBus === "busType") {
//       sortData.sort((a, b) => a.busType.localeCompare(b.busType));
//     } else if (orderBus === "price") {
//       sortData.sort((a, b) => a.price - b.price);
//     }
//     return sortData;
//   }, [filterBuses, orderBus]);

//   const filterBusData = useMemo(() => {
//     const searchFrom = searchRoute.from.toLowerCase();
//     const searchTo = searchRoute.to.toLowerCase();
//     console.log(buses);
//     let filterBuses = buses.filter(
//       ({ from, to }) =>
//         from.toLowerCase().includes(searchFrom) &&
//         to.toLowerCase().includes(searchTo)
//     );

//     if (orderBus === "busType") {
//       filterBuses.sort((a, b) => a.busType.localeCompare(b.busType));
//     } else if (orderBus === "price") {
//       filterBuses.sort((a, b) => a.price - b.price);
//     }
//     return filterBuses;
//   }, [buses, searchRoute, orderBus]);
