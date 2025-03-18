"use client";

import { useState, useEffect } from "react";
import styles from "./styles.module.css";

interface Cliente {
  id_cliente: number;
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
  data_nascimento: string;
}

const Clientes = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [pesquisa, setPesquisa] = useState("");
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 10;

  useEffect(() => {
    fetch("http://ceteia.guanambi.ifbaiano.edu.br:15050/api/clientes")
      .then((response) => response.json())
      .then((data) => {
        console.log("Resposta da API:", data); // 🟢 Veja o formato da resposta

        // Se a API retorna um objeto com os clientes dentro de `data`
        if (Array.isArray(data)) {
          setClientes(data);
        } else if (data && Array.isArray(data.clientes)) {
          setClientes(data.clientes); // Se os clientes estão dentro de `data.clientes`
        } else {
          console.error("Erro: API não retornou um array esperado", data);
          setClientes([]);
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar clientes:", error);
        setClientes([]);
      });
  }, []);

  const clientesFiltrados = clientes.filter((cliente) =>
    Object.values(cliente).some((valor) =>
      valor?.toString().toLowerCase().includes(pesquisa.toLowerCase())
    )
  );

  const inicio = (paginaAtual - 1) * itensPorPagina;
  const fim = inicio + itensPorPagina;
  const clientesPaginados = clientesFiltrados.slice(inicio, fim);
  const totalPaginas = Math.ceil(clientesFiltrados.length / itensPorPagina);

  return (
    <div className={styles.container}>
      <h1>Clientes</h1>

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
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Endereço</th>
              <th>Data de Nascimento</th>
            </tr>
          </thead>
          <tbody>
            {clientesPaginados.length > 0 ? (
              clientesPaginados.map((cliente) => (
                <tr key={cliente.id_cliente}>
                  <td>{cliente.id_cliente}</td>
                  <td>{cliente.nome}</td>
                  <td>{cliente.email}</td>
                  <td>{cliente.telefone}</td>
                  <td>{cliente.endereco}</td>
                  <td>{new Date(cliente.data_nascimento).toLocaleDateString("pt-BR")}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} style={{ textAlign: "center", padding: "10px" }}>
                  Nenhum cliente encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {clientesFiltrados.length > 0 && (
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

export default Clientes;
