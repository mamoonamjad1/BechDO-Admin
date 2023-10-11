import React, { useEffect, useState } from "react";
import { ResponsiveBar } from "@nivo/bar";
import axios from "axios";

const BarChart = () => {
  const [barData, setBarData] = useState([]);

  useEffect(() => {
    // Fetch data from your API
    axios
      .get("http://localhost:4000/admin/orders/get")
      .then((response) => {
        // Process the data as needed
        const data = response.data;
        setBarData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div style={{ height: "400px" }}>
      <ResponsiveBar
        data={barData}
        keys={["key1", "key2", "key3"]} // Replace with your data keys
        indexBy="index" // Replace with your data index
        margin={{ top: 50, right: 60, bottom: 50, left: 60 }}
        padding={0.3}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
        }}
        enableLabel={false}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 20,
          },
        ]}
      />
    </div>
  );
};

export default BarChart;
