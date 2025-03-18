"use client";

import { useState, useEffect } from "react";
import styles from "./styles.module.css";

interface Fornecedor {
  id_fornecedor: number;
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
}

const Fornecedores = () => {
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
  const [pesquisa, setPesquisa] = useState("");
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 10;

  useEffect(() => {
    fetch("http://ceteia.guanambi.ifbaiano.edu.br:15050/api/fornecedor")
      .then((response) => response.json())
      .then((data) => {
        console.log("Resposta da API:", data);

        if (Array.isArray(data)) {
          setFornecedores(data);
        } else if (data && Array.isArray(data.fornecedores)) {
          setFornecedores(data.fornecedores);
        } else {
          console.error("Erro: API não retornou um array esperado", data);
          setFornecedores([]);
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar fornecedores:", error);
        setFornecedores([]);
      });
  }, []);

  const fornecedoresFiltrados = fornecedores.filter((fornecedor) =>
    Object.values(fornecedor).some((valor) =>
      valor?.toString().toLowerCase().includes(pesquisa.toLowerCase())
    )
  );

  const inicio = (paginaAtual - 1) * itensPorPagina;
  const fim = inicio + itensPorPagina;
  const fornecedoresPaginados = fornecedoresFiltrados.slice(inicio, fim);
  const totalPaginas = Math.ceil(fornecedoresFiltrados.length / itensPorPagina);

  return (
    <div className={styles.container}>
      <h1>Fornecedores</h1>

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
              <th>ID Fornecedor</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Endereço</th>
            </tr>
          </thead>
          <tbody>
            {fornecedoresPaginados.length > 0 ? (
              fornecedoresPaginados.map((fornecedor) => (
                <tr key={fornecedor.id_fornecedor}>
                  <td>{fornecedor.id_fornecedor}</td>
                  <td>{fornecedor.nome}</td>
                  <td>{fornecedor.email}</td>
                  <td>{fornecedor.telefone}</td>
                  <td>{fornecedor.endereco}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} style={{ textAlign: "center", padding: "10px" }}>
                  Nenhum fornecedor encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {fornecedoresFiltrados.length > 0 && (
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

export default Fornecedores;
