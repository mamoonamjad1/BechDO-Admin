import React, { useEffect, useState } from "react";
import { ResponsivePie } from "@nivo/pie";
import axios from "axios";

const PieChart = () => {
  // State to store processed data for the pie chart
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    // Fetch data from the server when the component mounts
    axios
      .get("http://localhost:4000/admin/products/chart")
      .then((res) => {
        // Define distinct colors for each category
        const distinctColors = ["#FF5733", "#33FF57", "#5733FF", "#FF33A1", "#33A1FF"];

        // Count the number of products for each category
        const categoryCounts = {};
        res.data.forEach((order) => {
          const category = order.category.name;
          categoryCounts[category] = (categoryCounts[category] || 0) + 1;
        });

        // Create processed data with counts as values and assigned colors
        const processedData = Object.entries(categoryCounts).map(([category, count], index) => ({
          id: index.toString(), // Using index as id since id should be unique
          label: category,
          value: count,
          color: distinctColors[index % distinctColors.length],
        }));

        // Set the processed data to update the state
        setOrderData(processedData);
      })
      .catch((err) => {
        console.error("Error fetching order data: ", err);
      });
  }, []); // Empty dependency array means this effect runs once after the initial render

  return (
    <div style={{ height: "400px" }}>
      {/* ResponsivePie component from @nivo/pie library */}
      <ResponsivePie
        data={orderData} // Pass the processed data to the pie chart
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        enableArcLabels={true} // Enable hover labels
        arcLabel={(arc) => `${arc.label}`} // Customize label content
        arcLabelTextColor={{ from: "color", modifiers: [["darker", 2]] }} // Customize label text color
        arcLabelComponent={({ datum, label }) => (
          // Customize label rendering on hover
          <g transform={`translate(${datum.x + 8},${datum.y - 8})`}>
            <text
              dominantBaseline="middle"
              textAnchor="start"
              style={{
                fill: datum.color,
                fontSize: 12,
              }}
            >
              {label}
            </text>
          </g>
        )}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: 0,
            translateY: 56,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: "#999",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#000",
                },
                
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default PieChart;
