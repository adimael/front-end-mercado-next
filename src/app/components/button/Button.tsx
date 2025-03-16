import styles from "./styles.module.css";
import { ReactNode } from "react";

interface ButtonProps {
  text: string;
  variant?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
  onClick?: () => void;
  disabled?: boolean;
  icon?: ReactNode;
}

export default function Button({
  text,
  variant = "primary",
  size = "medium",
  onClick,
  disabled = false,
  icon
}: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${styles[size]} ${disabled ? styles.disabled : styles[variant]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {text}
    </button>
  );
}
