"use client";

import { useState, useEffect } from "react";
import styles from "./styles.module.css";

interface Produto {
  id_produto: number;
  nome: string;
  descricao: string;
  preco: number;
  quantidade_estoque: number;
  id_fornecedor: number;
}

const Produtos = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [pesquisa, setPesquisa] = useState("");
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 10;

  useEffect(() => {
    fetch("http://ceteia.guanambi.ifbaiano.edu.br:15050/api/produto")
      .then((response) => response.json())
      .then((data) => {
        console.log("Resposta da API:", data);

        if (Array.isArray(data)) {
          setProdutos(data);
        } else if (data && Array.isArray(data.produtos)) {
          setProdutos(data.produtos);
        } else {
          console.error("Erro: API não retornou um array esperado", data);
          setProdutos([]);
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar produtos:", error);
        setProdutos([]);
      });
  }, []);

  const produtosFiltrados = produtos.filter((produto) =>
    Object.values(produto).some((valor) =>
      valor?.toString().toLowerCase().includes(pesquisa.toLowerCase())
    )
  );

  const inicio = (paginaAtual - 1) * itensPorPagina;
  const fim = inicio + itensPorPagina;
  const produtosPaginados = produtosFiltrados.slice(inicio, fim);
  const totalPaginas = Math.ceil(produtosFiltrados.length / itensPorPagina);

  return (
    <div className={styles.container}>
      <h1>Produtos</h1>

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
              <th>ID Produto</th>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Preço</th>
              <th>Qtd. Estoque</th>
              <th>ID Fornecedor</th>
            </tr>
          </thead>
          <tbody>
            {produtosPaginados.length > 0 ? (
              produtosPaginados.map((produto) => (
                <tr key={produto.id_produto}>
                  <td>{produto.id_produto}</td>
                  <td>{produto.nome}</td>
                  <td>{produto.descricao}</td>
                  <td>R$ {Number(produto.preco).toFixed(2)}</td>
                  <td>{produto.quantidade_estoque}</td>
                  <td>{produto.id_fornecedor}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} style={{ textAlign: "center", padding: "10px" }}>
                  Nenhum produto encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {produtosFiltrados.length > 0 && (
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

export default Produtos;
