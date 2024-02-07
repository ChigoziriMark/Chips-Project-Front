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
    { key: "firstName", title: "First Name", tooltip: "Actor First Name" },
    {
      key: "lastName",
      title: "Last Name",
      tooltip:
        "Actor Last Name",
    },
    {
      key: "ratings",
      title: "Ratings",
      tooltip: "Average Rating Credits in movies, series etc",
    },
    {
      key: "placeOfBirth",
      title: "Place of Birth",
      tooltip: "Place of Birth",
    },
    {
      key: "dateOfBirth",
      title: "Date Of Birth",
      tooltip: "Date of Birth",
    },
    { key: "gender", title: "Gender", tooltip: "Gender" },
    {
      key: "age",
      title: "Age",
      tooltip: "Age",
    },
    {
      key: "biography",
      title: "Biography",
      tooltip: "Biography",
    },
    {
      key: "featuresIn",
      title: "Features in ",
      tooltip: "Movies featured in",
    },

    {
      key: "productionCredits",
      title: "Production Credits",
      tooltip: "Production Credits in movies, series etc",
    },
    {
      key: "crewCredits",
      title: "Crew  Credits",
      tooltip: "Crew Credits in movies, series etc",
    },
    {
      key: "writingCredits",
      title: "Writing Credits",
      tooltip: "Writing Credits in movies, series etc",
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