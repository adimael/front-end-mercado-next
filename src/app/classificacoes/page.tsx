"use client";

import { useState } from "react";
import styles from "./styles.module.css";

interface Classificacao {
  id: number;
  idCliente: number;
  idProduto: number;
  nota: number;
  comentario: string;
  data: string;
}

const classificacoes: Classificacao[] = [
  { id: 1, idCliente: 101, idProduto: 5001, nota: 4, comentario: "Ótimo produto!", data: "2024-03-10" },
  { id: 2, idCliente: 102, idProduto: 5002, nota: 5, comentario: "Excelente!", data: "2024-03-12" },
  { id: 3, idCliente: 103, idProduto: 5003, nota: 3, comentario: "Bom, mas poderia melhorar.", data: "2024-03-15" },
  { id: 4, idCliente: 104, idProduto: 5004, nota: 2, comentario: "Não gostei muito.", data: "2024-03-18" },
  { id: 5, idCliente: 105, idProduto: 5005, nota: 5, comentario: "Perfeito!", data: "2024-03-20" },
  { id: 6, idCliente: 106, idProduto: 5006, nota: 4, comentario: "Muito bom.", data: "2024-03-22" },
  { id: 7, idCliente: 107, idProduto: 5007, nota: 1, comentario: "Péssima experiência.", data: "2024-03-25" },
];

const Classificacoes = () => {
  const [pesquisa, setPesquisa] = useState("");
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 10;

  const classificacoesFiltradas = classificacoes.filter((c) =>
    Object.values(c).some((valor) =>
      valor.toString().toLowerCase().includes(pesquisa.toLowerCase())
    )
  );

  const inicio = (paginaAtual - 1) * itensPorPagina;
  const fim = inicio + itensPorPagina;
  const classificacoesPaginadas = classificacoesFiltradas.slice(inicio, fim);

  const totalPaginas = Math.ceil(classificacoesFiltradas.length / itensPorPagina);

  return (
    <div className={styles.container}>
      <h1>Classificações</h1>

      {/* Campo de pesquisa */}
      <input
        type="text"
        placeholder="Pesquisar..."
        value={pesquisa}
        onChange={(e) => setPesquisa(e.target.value)}
        className={styles.inputPesquisa}
      />

      {/* Tabela */}
      <table className={styles.tabela}>
        <thead>
          <tr>
            <th>ID</th>
            <th>ID Cliente</th>
            <th>ID Produto</th>
            <th>Nota</th>
            <th>Comentário</th>
            <th>Data da Classificação</th>
          </tr>
        </thead>
        <tbody>
          {classificacoesPaginadas.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.idCliente}</td>
              <td>{c.idProduto}</td>
              <td>{c.nota}</td>
              <td>{c.comentario}</td>
              <td>{c.data}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginação */}
      <div className={styles.paginacao}>
        <button onClick={() => setPaginaAtual(paginaAtual - 1)} disabled={paginaAtual === 1}>
          Anterior
        </button>
        <span>
          Página {paginaAtual} de {totalPaginas}
        </span>
        <button onClick={() => setPaginaAtual(paginaAtual + 1)} disabled={paginaAtual === totalPaginas}>
          Próxima
        </button>
      </div>
    </div>
  );
};

export default Classificacoes;
