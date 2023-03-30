import { useMemo } from "react";
import { Column } from "react-table";

export const useColumns = <T extends Object>(data: Column<T>[]): Column<T>[] => {
  const columns = useMemo<Column<T>[]>(
    () => data,
    []
  );

  return columns;
}
