"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./styles.module.css";

const Navbar = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: "Home", href: "/" },
    { name: "Add Classificação", href: "/classificacao" },
    { name: "Add Cliente", href: "/cliente" },
    { name: "Compra", href: "/compra" },
    { name: "Fornecedor", href: "/fornecedor" },
    { name: "Local", href: "/local" },
    { name: "Add Produto", href: "/produto" },
    { name: "Venda", href: "/venda" },
  ];

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <h1 className={styles.logo}>Sistema de Gestão</h1>

        {/* Botão do menu hamburguer */}
        <button className={styles.menuButton} onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>

        {/* Links de navegação */}
        <ul className={`${styles.navList} ${menuOpen ? styles.open : ""}`}>
          {links.map((link) => (
            <li key={link.href} className={pathname === link.href ? styles.active : ""}>
              <Link href={link.href}>{link.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

