import styles from "./styles.module.css";
import { ChangeEventHandler, ReactNode } from "react";

interface InputProps {
  type?: "text" | "password" | "email" | "number";
  value: string;
  placeholder?: string;
  name?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  variant?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  icon?: ReactNode;
}

export default function Page({
  type = "text",
  value,
  placeholder = "",
  name = "",
  onChange,
  variant = "primary",
  size = "medium",
  disabled = false,
  icon
}: InputProps) {
  return (
    <div style={{ position: "relative", width: "100%" }}>
      {icon && <span style={{ position: "absolute", top: "50%", left: "10px", transform: "translateY(-50%)" }}>{icon}</span>}
      <input
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        className={`${styles.input} ${styles[variant]} ${styles[size]} ${disabled ? styles.disabled : ""}`}
        disabled={disabled}
      />
    </div>
  );
}
