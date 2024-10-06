"use client";
import { api } from "@/trpc/react";
import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import ClipLoader from "react-spinners/ClipLoader";

const DisplayDarkpoolChart = () => {
  const { data } = api.option.getDarkpoolOrders.useQuery({
    ticker: "O:TSLA210903C00700000",
    limit: 1000,
    order: "desc",
  });

  if (!data || !data.results) {
    return (
      <div className="flex h-full w-full items-center">
        <ClipLoader
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  // Define column definitions for AG Grid
  const columnDefs = [
    {
      headerName: "Participant Timestamp",
      field: "participant_timestamp",
      sortable: true,
      filter: true,
      valueFormatter: (params) =>
        new Date(params.value / 1000).toLocaleString(),
    },
    { headerName: "Price", field: "price", sortable: true, filter: true },
    {
      headerName: "Sequence Number",
      field: "sequence_number",
      sortable: true,
      filter: true,
    },
    {
      headerName: "SIP Timestamp",
      field: "sip_timestamp",
      sortable: true,
      filter: true,
      valueFormatter: (params) =>
        new Date(params.value / 1000).toLocaleString(),
    },
    {
      headerName: "Value (Price * Size)",
      valueGetter: (params) => params.data.price * params.data.size,
      sortable: true,
      filter: true,
    },
    { headerName: "Size", field: "size", sortable: true, filter: true },
  ];

  return (
    <div className="ag-theme-alpine h-full w-full">
      <AgGridReact
        rowData={data.results} // Pass the data into AG Grid
        columnDefs={columnDefs} // Column definitions
        pagination={true} // Enable pagination
        paginationPageSize={20} // Set the page size
      />
    </div>
  );
};

export default DisplayDarkpoolChart;
