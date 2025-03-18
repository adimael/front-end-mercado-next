"use client";

import { useState, useEffect } from "react";
import styles from "./styles.module.css";

interface Local {
  id_local: number;
  nome: string;
  endereco: string;
}

const Locais = () => {
  const [locais, setLocais] = useState<Local[]>([]);
  const [pesquisa, setPesquisa] = useState("");
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 5;

  useEffect(() => {
    fetch("http://ceteia.guanambi.ifbaiano.edu.br:15050/api/local")
      .then((response) => response.json())
      .then((data) => {
        console.log("Resposta da API:", data);

        if (Array.isArray(data)) {
          setLocais(data);
        } else if (data && Array.isArray(data.locais)) {
          setLocais(data.locais);
        } else {
          console.error("Erro: API não retornou um array esperado", data);
          setLocais([]);
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar locais:", error);
        setLocais([]);
      });
  }, []);

  const locaisFiltrados = locais.filter((local) =>
    Object.values(local).some((valor) =>
      valor?.toString().toLowerCase().includes(pesquisa.toLowerCase())
    )
  );

  const inicio = (paginaAtual - 1) * itensPorPagina;
  const fim = inicio + itensPorPagina;
  const locaisPaginados = locaisFiltrados.slice(inicio, fim);
  const totalPaginas = Math.ceil(locaisFiltrados.length / itensPorPagina);

  return (
    <div className={styles.container}>
      <h1>Locais</h1>

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
              <th>ID Local</th>
              <th>Nome</th>
              <th>Endereço</th>
            </tr>
          </thead>
          <tbody>
            {locaisPaginados.length > 0 ? (
              locaisPaginados.map((local) => (
                <tr key={local.id_local}>
                  <td>{local.id_local}</td>
                  <td>{local.nome}</td>
                  <td>{local.endereco}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} style={{ textAlign: "center", padding: "10px" }}>
                  Nenhum local encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {locaisFiltrados.length > 0 && (
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

export default Locais;
