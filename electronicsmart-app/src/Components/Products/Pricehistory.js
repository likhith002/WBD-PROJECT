import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import { useState, useEffect } from "react";
import ShowChartIcon from "@mui/icons-material/ShowChart";

export function DisplayPriceHistory(props) {
  let [click, setclick] = useState(false);
  let [data, setData] = useState([]);
  useEffect(() => {
    if (click) {
      fetch(`http://localhost:3002/price?product_id=${props.product_id}`)
        .then((res) => res.json())
        .then((d) => {
          console.log(d[0].data);
          setData(d[0].data);
        });
    }
  }, [click]);
  console.log(props.product_id);
  return (
    <div id="_button_disp_graph">
      <button
        id="_graph_data"
        onClick={() => {
          setclick(!click);
        }}
      >
        <ShowChartIcon /> PRICE GRAPH
      </button>
      <br />
      <Pricehistory data={data} />
    </div>
  );
}

export function Pricehistory(props) {
  if (props.data.length) {
    return (
      <div>
        <LineChart
          width={800}
          height={300}
          data={props.data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          {/* <Tooltip /> */}
          <Line type="monotone" dataKey="price" stroke="#e2461f" />
        </LineChart>
      </div>
    );
  } else return <></>;
}
