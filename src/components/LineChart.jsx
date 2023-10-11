import React, { useEffect, useState } from "react";
import { ResponsiveLine } from "@nivo/line";
import axios from "axios";

const LineChart = () => {
  const [lineChartData, setLineChartData] = useState([]);

  useEffect(() => {
    // Fetch data from your API endpoint
    axios
      .get("http://localhost:4000/admin/products/details/line-chart")
      .then((response) => {
        console.log("Line chart data:", response.data)
        const data = response.data.map((item) => ({
          x: new Date(item.createdAt).toISOString(), // Format the date as ISO string
          y: parseFloat(item.product.bidAmount), // Ensure bidAmount is parsed as a float
        }));

        setLineChartData([
          {
            id: "bidAmount",
            data,
          },
        ]);
      })
      .catch((error) => {
        console.error("Error fetching line chart data: ", error);
      });
  }, []);

  return (
    <div style={{ height: "400px" }}>
      <ResponsiveLine
        data={lineChartData}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: "time", format: "%Y-%m-%dT%H:%M:%S.%LZ" }}
        xFormat="time:%Y-%m-%d"
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          format: "%b %d",
          tickValues: "every 1 day",
          tickSize: 5,
          tickPadding: 5,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          legend: "Bid Amount",
          legendOffset: -40,
          legendPosition: "middle",
        }}
        enableGridX={false}
        enableGridY={false}
        pointSize={8}
        pointBorderWidth={2}
        enablePointLabel={true}
        useMesh={true}
        colors={{ scheme: "nivo" }}
      />
    </div>
  );
};

export default LineChart;
