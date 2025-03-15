'use client'
import { useState } from 'react';
import styles from './styles.module.css';

export default function Classificacao() {
  const [formData, setFormData] = useState({
      id_produto: '',
      id_cliente: '',
      nota: '',
      comentario: '',
      data_classificacao: new Date().toISOString().split('T')[0]
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
      const { name, value } = event.target;
      setFormData((prevData) => ({
          ...prevData,
          [name]: value
      }));
  };

  const validateForm = () => {
      let newErrors = {};
      if (!formData.id_produto) newErrors.id_produto = "O ID do produto é obrigatório.";
      if (!formData.id_cliente) newErrors.id_cliente = "O ID do cliente é obrigatório.";
      if (!formData.nota) newErrors.nota = "A nota é obrigatória.";
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
      event.preventDefault();
      if (!validateForm()) return;

      try {
          const response = await fetch('http://ceteia.guanambi.ifbaiano.edu.br:15050/api/classificacao', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(formData)
          });

          const data = await response.json();
          console.log("Resposta da API:", data);

          if (response.ok) {
              alert('Classificação enviada com sucesso!');
              setFormData({
                  id_produto: '',
                  id_cliente: '',
                  nota: '',
                  comentario: '',
                  data_classificacao: new Date().toISOString().split('T')[0]
              });
              setErrors({});
          } else {
              alert(`Erro: ${data.error || "Erro ao enviar a classificação."}`);
          }
      } catch (error) {
          console.error("Erro ao conectar-se ao servidor:", error);
          alert("Erro ao conectar-se ao servidor.");
      }
  };

  return (
      <main className={styles.container}>
          <h1 className={styles.title}>Classificação de Produtos</h1>

          <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                  <label className={styles.label}>ID do Produto:</label>
                  <input 
                      type="number" 
                      name="id_produto" 
                      value={formData.id_produto} 
                      onChange={handleChange} 
                      className={styles.input} 
                      required 
                  />
                  {errors.id_produto && <p className={styles.error}>{errors.id_produto}</p>}
              </div>

              <div className={styles.formGroup}>
                  <label className={styles.label}>ID do Cliente:</label>
                  <input 
                      type="number" 
                      name="id_cliente" 
                      value={formData.id_cliente} 
                      onChange={handleChange} 
                      className={styles.input} 
                      required 
                  />
                  {errors.id_cliente && <p className={styles.error}>{errors.id_cliente}</p>}
              </div>

              <div className={styles.formGroup}>
                  <label className={styles.label}>Nota:</label>
                  <select 
                      name="nota" 
                      value={formData.nota} 
                      onChange={handleChange} 
                      className={styles.input} 
                      required
                  >
                      <option value="">Selecione</option>
                      <option value="1">1 - Péssimo</option>
                      <option value="2">2 - Ruim</option>
                      <option value="3">3 - Regular</option>
                      <option value="4">4 - Bom</option>
                      <option value="5">5 - Excelente</option>
                  </select>
                  {errors.nota && <p className={styles.error}>{errors.nota}</p>}
              </div>

              <div className={styles.formGroup}>
                  <label className={styles.label}>Comentário:</label>
                  <textarea 
                      name="comentario" 
                      value={formData.comentario} 
                      onChange={handleChange} 
                      className={styles.input} 
                      rows={3} 
                  />
              </div>

              <button type="submit" className={styles.button}>Enviar Classificação</button>
          </form>
      </main>
  );
}