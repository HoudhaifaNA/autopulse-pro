import { useState } from "react";

const useSortableField = (defaultOrderBy: string) => {
  const [orderBy, setOrderBy] = useState(defaultOrderBy);

  const toggleOrderBy = (field: string) => {
    setOrderBy((prevOrderBy) => {
      if (prevOrderBy === field) {
        const isDescending = field.startsWith("-");
        return isDescending ? field : `-${field}`;
      }

      return field;
    });
  };

  return [orderBy, toggleOrderBy] as const;
};

export default useSortableField;
