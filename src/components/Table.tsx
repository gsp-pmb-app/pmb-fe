import React from "react";

export interface TableColumn<T> {
  key: keyof T | string;
  label: string;
  render?: (row: T) => React.ReactNode;
  className?: string;
}

interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  emptyText?: string;
}
function Table<T>({
  columns,
  data,
  emptyText = "Data tidak tersedia",
}: TableProps<T>) {
  return (
    <div className="relative w-full overflow-x-auto rounded-lg border border-gray-200 bg-white">
      {/* ✅ INI KUNCI UTAMA */}
      <div className="min-w-max">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className={`
                    px-3 py-3 text-left font-medium text-gray-700
                    whitespace-nowrap sm:px-4
                    ${col.className || ""}
                  `}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-3 py-6 text-center text-gray-500 sm:px-4"
                >
                  {emptyText}
                </td>
              </tr>
            ) : (
              data.map((row, idx) => (
                <tr
                  key={idx}
                  className="border-t border-gray-100 hover:bg-gray-50 transition"
                >
                  {columns.map((col) => (
                    <td
                      key={String(col.key)}
                      className={`
                        px-3 py-3 text-gray-900
                        whitespace-nowrap sm:px-4
                        ${col.className || ""}
                      `}
                    >
                      {col.render ? col.render(row) : (row as any)[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
