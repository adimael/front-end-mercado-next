"use client";

import styles from "./styles.module.css";

export default function Home() {
  return (
    <main className={styles.container}>
      <section className={styles.hero}>
        <h1>Bem-vindo ao Sistema de Gestão</h1>
        <p>Gerencie seus clientes, fornecedores, produtos e vendas de forma eficiente.</p>
      </section>
    </main>
  );
}
