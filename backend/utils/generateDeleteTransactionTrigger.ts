import { Transaction } from "../../interfaces";

const generateDeleteTranasctionTrigger = (
  table: string,
  direction: Transaction["direction"],
  type: Transaction["type"],
  name?: string
) => {
  const triggerName = name || `delete_${table}_transactions`;
  return `
    CREATE TRIGGER IF NOT EXISTS ${triggerName}
    AFTER DELETE ON ${table}
    FOR EACH ROW
    BEGIN
      DELETE FROM transactions
      WHERE product_id = OLD.id AND direction = '${direction}' AND type = '${type}';
    END;
    `;
};

export default generateDeleteTranasctionTrigger;
