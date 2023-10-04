import { BadgeWrapper } from "./Badge.styled";

export interface BadgeProps {
  type: "success" | "warning" | "error";
  children: string;
}

const Badge = ({ type, children }: BadgeProps) => {
  return (
    <BadgeWrapper $type={type}>
      <span>{children}</span>
    </BadgeWrapper>
  );
};

export default Badge;
