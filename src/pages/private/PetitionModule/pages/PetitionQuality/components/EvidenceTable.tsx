import React, { useMemo } from "react";
import { useTable, Column } from "react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Chip,
} from "@mui/material";
import {
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";
import { EvidenceData } from "../data/claimsData";

interface EvidenceTableProps {
  data: EvidenceData[];
}

const EvidenceTable: React.FC<EvidenceTableProps> = ({ data }) => {
  const columns = useMemo<Column<EvidenceData>[]>(
    () => [
      {
        Header: "Document",
        accessor: "document",
        Cell: ({ value }) => (
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {value}
          </Typography>
        ),
      },
      {
        Header: "Quality",
        accessor: "quality",
        Cell: ({ value }) => (
          <Chip
            icon={value === "good" ? <CheckCircleIcon /> : <CancelIcon />}
            label={value === "good" ? "Good" : "Bad"}
            color={value === "good" ? "success" : "error"}
            size="small"
            sx={{ fontWeight: 600 }}
          />
        ),
      },
      {
        Header: "AI Feedback",
        accessor: "aiFeedback",
        Cell: ({ value }) => (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ maxWidth: 300 }}
          >
            {value}
          </Typography>
        ),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <TableContainer
      component={Paper}
      sx={{ boxShadow: "none", border: "1px solid #e0e0e0" }}
    >
      <Table {...getTableProps()} size="small">
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TableCell
                  {...column.getHeaderProps()}
                  sx={{
                    backgroundColor: "#f5f5f5",
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    color: "text.primary",
                  }}
                >
                  {column.render("Header")}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <TableRow {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <TableCell {...cell.getCellProps()} sx={{ py: 1.5 }}>
                    {cell.render("Cell")}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EvidenceTable;
