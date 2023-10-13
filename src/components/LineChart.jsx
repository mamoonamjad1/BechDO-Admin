import React, { useEffect, useState } from "react";
import { ResponsiveLine } from "@nivo/line";
import axios from "axios";

const LineChart = ({ darkMode }) => {
  const [lineChartData, setLineChartData] = useState([]);

  const getTheme = (isDarkMode) => {
    const commonTheme = {
      axis: {
        legend: {
          text: {
            fontSize: "12px",
            fill: isDarkMode ? "white" : "black",
          },
        },
      },
    };

    return {
      light: {
        ...commonTheme,
        background: "white",
      },
      dark: {
        ...commonTheme,
        background: "black",
      },
    }[isDarkMode ? "dark" : "light"];
  };

  useEffect(() => {
    // Fetch data from your API endpoint
    axios
      .get("http://localhost:4000/admin/products/chart")
      .then((response) => {
        console.log("Line chart data:", response.data);

        const categoriesCount = {}; // Create an object to store category counts
        const categoryNames = {}; // Create an object to store category names

        // Count products per category and store category names
        response.data.forEach((product) => {
          const categoryId = product.category._id;

          if (!categoriesCount[categoryId]) {
            categoriesCount[categoryId] = 1;
            categoryNames[categoryId] = product.category.name; // Store category name
          } else {
            categoriesCount[categoryId] += 1;
          }
        });

        // Convert the categoriesCount object into an array of data points with category names
        const data = Object.entries(categoriesCount).map(([categoryId, count]) => ({
          x: categoryNames[categoryId], // Use category name as x
          y: count,
        }));

        setLineChartData([
          {
            id: "Product Count",
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
        xScale={{
          type: "point",
        }}
        xFormat={(e) => e} // Format the x-axis labels
        yScale={{
          type: "linear",
          min: 0,
          max: "auto",
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickRotation: 0,
          legend: "Category Name", // X-axis label
          legendPosition: "middle",
          legendOffset: 36,
          style: {
            fontSize: "12px",
            fill: darkMode ? "white" : "black",
          },
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          legend: "Product Count", // Y-axis label
          legendOffset: -40,
          legendPosition: "middle",
          style: {
            fontSize: "12px",
            fill: darkMode ? "white" : "black",
          },
        }}
        enableGridX={false}
        enableGridY={true}
        pointSize={8}
        pointBorderWidth={2}
        enablePointLabel={true}
        useMesh={true}
        colors={{ scheme: "nivo" }}
        theme={getTheme(darkMode)}
      />
    </div>
  );
};

export default LineChart;
