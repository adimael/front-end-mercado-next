"use client";

import { useState, useEffect } from "react";
import styles from "./styles.module.css";

interface Compra {
  id_compra: number;
  id_fornecedor: number;
  data_compra: string;
  valor_total: number;
}

const Compras = () => {
  const [compras, setCompras] = useState<Compra[]>([]);
  const [pesquisa, setPesquisa] = useState("");
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 10;

  useEffect(() => {
    fetch("http://ceteia.guanambi.ifbaiano.edu.br:15050/api/compras")
      .then((response) => response.json())
      .then((data) => {
        console.log("Resposta da API:", data); // 🔍 Verificar a resposta

        if (Array.isArray(data)) {
          setCompras(data);
        } else if (data && Array.isArray(data.compras)) {
          setCompras(data.compras); // Se os dados estiverem dentro de `data.compras`
        } else {
          console.error("Erro: API não retornou um array esperado", data);
          setCompras([]);
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar compras:", error);
        setCompras([]);
      });
  }, []);

  const comprasFiltradas = compras.filter((compra) =>
    Object.values(compra).some((valor) =>
      valor?.toString().toLowerCase().includes(pesquisa.toLowerCase())
    )
  );

  const inicio = (paginaAtual - 1) * itensPorPagina;
  const fim = inicio + itensPorPagina;
  const comprasPaginadas = comprasFiltradas.slice(inicio, fim);
  const totalPaginas = Math.ceil(comprasFiltradas.length / itensPorPagina);

  return (
    <div className={styles.container}>
      <h1>Compras</h1>

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
              <th>ID Compra</th>
              <th>ID Fornecedor</th>
              <th>Data da Compra</th>
              <th>Valor Total</th>
            </tr>
          </thead>
          <tbody>
            {comprasPaginadas.length > 0 ? (
              comprasPaginadas.map((compra) => (
                <tr key={compra.id_compra}>
                  <td>{compra.id_compra}</td>
                  <td>{compra.id_fornecedor}</td>
                  <td>{new Date(compra.data_compra).toLocaleDateString("pt-BR")}</td>
                  <td>R$ {Number(compra.valor_total).toFixed(2)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} style={{ textAlign: "center", padding: "10px" }}>
                  Nenhuma compra encontrada.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {comprasFiltradas.length > 0 && (
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

export default Compras;
