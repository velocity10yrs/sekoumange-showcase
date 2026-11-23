import React, { useEffect } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import japanGeoJson from "../public/japan.lv0.geo.json"; // Adjust the path if stored elsewhere

const LocationMap = () => {
  useEffect(() => {
    // Register the GeoJSON map with ECharts
    echarts.registerMap("japan", japanGeoJson);
  }, []);
  //console.log(japanGeoJson);

  const getOption = () => ({
    tooltip: {
      trigger: "item",
      formatter: "{b}: {c}", // Show the name and value
    },
    visualMap: {
      min: 0,
      max: 100,
      left: "left",
      top: "bottom",
      text: ["High", "Low"],
      calculable: true,
      inRange: {
        color: ["#ace", "#cea"], // Gradient color range
      },
    },
    series: [
      {
        name: "Japan Map",
        type: "map",
        map: "japan", // Use the map name registered with echarts
        label: {
          show: true, // Show region names
        },
        data: [
          { name: "Tokyo", value: 90 },
          { name: "Osaka", value: 75 },
          { name: "Hokkaido", value: 50 },
          { name: "Kyoto", value: 30 },
          { name: "Okinawa", value: 10 },
        ],
        regions: [
            {
              name: "japan",
              value: 90, // Sample value
            },
          ],
      },
    ],
  });

  return (
    <div style={{ width: "25em", height: "25em", margin:"auto auto",textAlign:"center",alignItems:"center", }}>
      <ReactECharts
        option={getOption()}
        style={{ height: "100%", width: "100%"}}
      />
    </div>
  );
};

export default LocationMap;
