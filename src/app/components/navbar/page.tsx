"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./styles.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faCaretDown } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  const links = [
    { name: "Home", href: "/" },
    {
      name: "Classificação",
      submenu: [
        { name: "Adicionar", href: "/classificacao" },
        { name: "Visualizar", href: "/classificacoes" },
      ],
    },
    {
      name: "Cliente",
      submenu: [
        { name: "Adicionar", href: "/cliente" },
        { name: "Visualizar", href: "/clientes" },
      ],
    },
    {
      name: "Compra",
      submenu: [
        { name: "Adicionar", href: "/compra" },
        { name: "Visualizar", href: "/compras" },
      ],
    },
    {
      name: "Fornecedor",
      submenu: [
        { name: "Adicionar", href: "/fornecedor" },
        { name: "Visualizar", href: "/fornecedores" },
      ],
    },
    {
      name: "Local",
      submenu: [
        { name: "Adicionar", href: "/local" },
        { name: "Visualizar", href: "/locais" },
      ],
    },
    {
      name: "Produto",
      submenu: [
        { name: "Adicionar", href: "/produto" },
        { name: "Visualizar", href: "/produtos" },
      ],
    },
    {
      name: "Venda",
      submenu: [
        { name: "Adicionar", href: "/venda" },
        { name: "Visualizar", href: "/vendas" },
      ],
    },
  ];

  const toggleDropdown = (name: string) => {
    setDropdownOpen(dropdownOpen === name ? null : name);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <h1 className={styles.logo}>Sistema de Gestão</h1>

        {/* Botão do menu hambúrguer */}
        <button className={styles.menuButton} onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>

        {/* Links de navegação */}
        <ul className={`${styles.navList} ${menuOpen ? styles.open : ""}`}>
          {links.map((link) => (
            <li
              key={link.name}
              className={pathname === link.href ? styles.active : ""}
              onMouseEnter={() => link.submenu && setDropdownOpen(link.name)}
              onMouseLeave={() => setDropdownOpen(null)}
            >
              <div
                className={styles.dropdownToggle}
                onClick={() => link.submenu && toggleDropdown(link.name)}
              >
                {link.href ? (
                  <Link href={link.href}>{link.name}</Link>
                ) : (
                  <>
                    {link.name}
                    {link.submenu && (
                      <FontAwesomeIcon
                        icon={dropdownOpen === link.name ? faCaretDown : faCaretRight}
                        className={styles.dropdownIcon}
                      />
                    )}
                  </>
                )}
              </div>

              {/* Menu Dropdown */}
              {link.submenu && dropdownOpen === link.name && (
                <ul className={styles.dropdownMenu}>
                  {link.submenu.map((sub) => (
                    <li key={sub.href}>
                      <Link href={sub.href}>{sub.name}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
