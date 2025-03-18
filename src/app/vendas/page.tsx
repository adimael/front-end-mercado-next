"use client";

import { useState, useEffect } from "react";
import styles from "./styles.module.css";

interface Venda {
  id_venda: number;
  id_cliente: number;
  data_venda: string;
  valor_total: number;
}

const Vendas = () => {
  const [vendas, setVendas] = useState<Venda[]>([]);
  const [pesquisa, setPesquisa] = useState("");
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 10;

  useEffect(() => {
    fetch("http://ceteia.guanambi.ifbaiano.edu.br:15050/api/venda")
      .then((response) => response.json())
      .then((data) => {
        console.log("Resposta da API:", data);

        if (Array.isArray(data)) {
          setVendas(data);
        } else if (data && Array.isArray(data.vendas)) {
          setVendas(data.vendas);
        } else {
          console.error("Erro: API não retornou um array esperado", data);
          setVendas([]);
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar vendas:", error);
        setVendas([]);
      });
  }, []);

  const vendasFiltradas = vendas.filter((venda) =>
    Object.values(venda).some((valor) =>
      valor?.toString().toLowerCase().includes(pesquisa.toLowerCase())
    )
  );

  const inicio = (paginaAtual - 1) * itensPorPagina;
  const fim = inicio + itensPorPagina;
  const vendasPaginadas = vendasFiltradas.slice(inicio, fim);
  const totalPaginas = Math.ceil(vendasFiltradas.length / itensPorPagina);

  return (
    <div className={styles.container}>
      <h1>Vendas</h1>

      <input
        type="text"
        placeholder="Pesquisar..."
        value={pesquisa}
        onChange={(e) => setPesquisa(e.target.value)}
        className={styles.inputPesquisa}
      />

      <div className={styles["tabela-container"]}>
        <table className={styles.tabela}>
          <thead>
            <tr>
              <th>ID Venda</th>
              <th>ID Cliente</th>
              <th>Data da Venda</th>
              <th>Valor Total</th>
            </tr>
          </thead>
          <tbody>
            {vendasPaginadas.length > 0 ? (
              vendasPaginadas.map((venda) => (
                <tr key={venda.id_venda}>
                  <td>{venda.id_venda}</td>
                  <td>{venda.id_cliente}</td>
                  <td>{new Date(venda.data_venda).toLocaleDateString("pt-BR")}</td>
                  <td>R$ {Number(venda.valor_total).toFixed(2)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} style={{ textAlign: "center", padding: "10px" }}>
                  Nenhuma venda encontrada.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {vendasFiltradas.length > 0 && (
        <div className={styles.paginacao}>
          <button
            onClick={() => setPaginaAtual(paginaAtual - 1)}
            disabled={paginaAtual === 1}
          >
            Anterior
          </button>
          <span>
            Página {paginaAtual} de {totalPaginas}
          </span>
          <button
            onClick={() => setPaginaAtual(paginaAtual + 1)}
            disabled={paginaAtual === totalPaginas}
          >
            Próxima
          </button>
        </div>
      )}
    </div>
  );
};

export default Vendas;
