import { BadgeWrapper } from "./BadgeStyle";

export interface BadgeProps {
  // these names don't describe the status of the badge just for theme colors names
  $type: "success" | "warning" | "error";
  children: string;
}

const Badge = ({ $type, children }: BadgeProps) => {
  return (
    <BadgeWrapper $type={$type}>
      <span>{children}</span>
    </BadgeWrapper>
  );
};

export default Badge;
