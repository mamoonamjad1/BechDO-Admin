import React, { useEffect, useState } from "react";
import { ResponsiveBar } from "@nivo/bar";
import axios from "axios";

const BarChart = () => {
  const [barData, setBarData] = useState([]);

  useEffect(() => {
    // Fetch data from your API
    axios
      .get("http://localhost:4000/admin/products/chart")
      .then((response) => {
        // Process the data as needed
        console.log("Bar chart data:", response.data);

        // Count the number of products for each category
        const categoryCounts = {};
        response.data.forEach((item) => {
          const category = item.category.name;
          categoryCounts[category] = (categoryCounts[category] || 0) + 1;
        });

        // Create processed data with counts as values and dynamic colors
        const data = Object.entries(categoryCounts).map(([category, count], index) => ({
          product: category,
          value: count,
          color: `hsl(${(index * 60) % 360}, 70%, 50%)`, // Adjust the color logic
        }));

        setBarData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div style={{ height: "400px" }}>
      <div style={{ fontSize: "18px", textAlign: "center", margin: "10px" }}>
        Bar Chart: Product Counts by Category
      </div>
      <ResponsiveBar
        data={barData}
        keys={["value"]}
        indexBy="product"
        margin={{ top: 50, right: 60, bottom: 80, left: 60 }}
        padding={0.3}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Category",
          legendPosition: "middle",
          legendOffset: 45,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Product Count",
          legendPosition: "middle",
          legendOffset: -40,
        }}
        enableLabel={true}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: "color", modifiers: [["darker", 1]] }}
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
