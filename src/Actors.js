import React, { useState } from "react";
import { CSVLink } from "react-csv";
import "./buttonStyles.css";
import { Tooltip } from "react-tippy";
import "react-tippy/dist/tippy.css";



const Actors = ({ Actors }) => {
  const [sortConfig, setSortConfig] = useState({
    key: "",
    direction: "",
  });

  const handleSort = (key) => {
    let direction = "asc";

    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    setSortConfig({ key, direction });
  };

  const tableCellStyle = {
    border: "1px solid black",
    padding: "8px",
  };

  const columnConfig = [
    { key: "userId", title: "UserId", tooltip: "Account Unique Id" },
    {
      key: "clientId",
      title: "ClientId",
      tooltip:
        "Client Id, Linked to Channel/Device/Account, can be changed after ‘New Client’ operation",
    },
    {
      key: "appInstallationId",
      title: "AppInstallationId",
      tooltip: "Edge Channel Unique Id",
    },
    {
      key: "channel",
      title: "Channel",
      tooltip: "Edge Channel, e.x. Canary, Dev, Beta, Stable",
    },
    {
      key: "edgeVersion",
      title: "EdgeVersion",
      tooltip: "Edge Client Version",
    },
    { key: "platform", title: "Platform", tooltip: "Edge Installed Device" },
    {
      key: "correlationId",
      title: "CorrelationId",
      tooltip: "Service Log Unique Id for Operation",
    },
    {
      key: "activityIds",
      title: "ActivityIds",
      tooltip: "A list of Entity Id",
    },
    {
      key: "operationType",
      title: "OperationType",
      tooltip: "Request Type from Edge Client",
    },
    {
      key: "timestamp",
      title: "Timestamp",
      tooltip: "Last Modified Time by Sync Service",
    },
  ];

  const sortedActors = [...Actors].sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (typeof aValue === "string" && typeof bValue === "string") {
      return aValue.localeCompare(bValue);
    } else {
      return aValue - bValue;
    }
  });

  if (sortConfig.direction === "desc") {
    sortedActors.reverse();
  }

  const csvData = sortedActors.map((actorsItem) => {
    const csvItem = {};
    columnConfig.forEach((column) => {
      csvItem[column.title] = actorsItem[column.key];
    });
    return csvItem;
  });

  const jsonData = JSON.stringify(Actors, null, 2);
  const jsonBlob = new Blob([jsonData], { type: "application/json" });
  const jsonUrl = URL.createObjectURL(jsonBlob);

  return (
    <div className="table-container" style={{ width: "500px" }}>
      <table style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {columnConfig.map((column) => (
              <th key={column.key} style={tableCellStyle}>
                <Tooltip title={column.tooltip}>
                  <button
                    className="button"
                    onClick={() => handleSort(column.key)}
                  >
                    {column.title}
                    {sortConfig.key === column.key && (
                      <span>
                        {sortConfig.direction === "asc" ? "\u2303" : "\u2304"}
                      </span>
                    )}
                  </button>
                </Tooltip>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedActors.map((actorsItem, index) => (
            <tr key={index}>
              {columnConfig.map((column) => (
                <td key={column.key} style={tableCellStyle}>
                  {actorsItem[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: "10px" }}>
        <CSVLink data={csvData} filename="actors_data.csv">
          Download CSV
        </CSVLink>
      </div>
      <div style={{ marginTop: "10px" }}>
        <a href={jsonUrl} download="actors_data.json">
          Download JSON
        </a>
      </div>
    </div>
  );
};

export default Actors;