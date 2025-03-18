'use client';
import { useState } from 'react';
import styles from './styles.module.css';
import Button from '../components/button/Button';
import Input from '../components/input/Input';

export default function Venda() {
    const [formData, setFormData] = useState({
        id_produto: '',
        nome: '',
        descricao: '',
        preco: '',
        quantidade_estoque: '',
        id_fornecedor: ''
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

        if (!formData.nome) newErrors.nome = "O nome do produto é obrigatório.";
        if (!formData.descricao) newErrors.descricao = "A descrição é obrigatória.";
        if (!formData.preco) newErrors.preco = "O preço é obrigatório.";
        if (!formData.quantidade_estoque) newErrors.quantidade_estoque = "A quantidade é obrigatória.";
        if (!formData.id_fornecedor) newErrors.id_fornecedor = "O ID do fornecedor é obrigatório.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateForm()) return;

        // Convertendo valores corretamente
        const formattedData = {
            id_produto: formData.id_produto ? parseInt(formData.id_produto) : undefined,
            nome: formData.nome,
            descricao: formData.descricao,
            preco: parseFloat(formData.preco),
            quantidade_estoque: parseInt(formData.quantidade_estoque),
            id_fornecedor: parseInt(formData.id_fornecedor)
        };

        console.log("Dados formatados para envio:", JSON.stringify(formattedData, null, 2));

        console.log("Dados que estão sendo enviados:", formattedData);

        try {
            const response = await fetch('http://ceteia.guanambi.ifbaiano.edu.br:15050/api/produto', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formattedData)
            });

            const data = await response.json();

            if (response.ok) {
                alert("Venda registrada com sucesso!");
                setFormData({ id_produto: '', nome: '', descricao: '', preco: '', quantidade_estoque: '', id_fornecedor: '' });
                setErrors({});
            } else {
                console.error("Erro na API:", data);
                alert(`Erro: ${data.error || "Erro ao registrar a venda"}`);
            }
        } catch (error) {
            console.error("Erro ao enviar requisição:", error);
            alert("Erro ao conectar-se ao servidor.");
        }
    };

    return (
        <>
            <div className={styles.container1}>
                <p className={styles.title}>Registro de Venda</p>
            </div>
            <div className={styles.divForm}>
                <form onSubmit={handleSubmit}>
                    <div className={styles.divFormClient}>
                        <p className={styles.pForm}>Nome do Produto:</p>
                        <Input type="text" name="nome" placeholder="Digite o nome do produto..." value={formData.nome} onChange={handleChange} />
                        {errors.nome && <p className={styles.error}>{errors.nome}</p>}
                    </div>

                    <div className={styles.divFormClient}>
                        <p className={styles.pForm}>Descrição:</p>
                        <Input type="text" name="descricao" placeholder="Digite a descrição..." value={formData.descricao} onChange={handleChange} />
                        {errors.descricao && <p className={styles.error}>{errors.descricao}</p>}
                    </div>

                    <div className={styles.divFormClient}>
                        <p className={styles.pForm}>Preço:</p>
                        <Input type="number" name="preco" placeholder="Digite o preço..." value={formData.preco} onChange={handleChange} />
                        {errors.preco && <p className={styles.error}>{errors.preco}</p>}
                    </div>

                    <div className={styles.divFormClient}>
                        <p className={styles.pForm}>Quantidade:</p>
                        <Input type="number" name="quantidade_estoque" placeholder="Digite a quantidade..." value={formData.quantidade_estoque} onChange={handleChange} />
                        {errors.quantidade_estoque && <p className={styles.error}>{errors.quantidade_estoque}</p>}
                    </div>

                    <div className={styles.divFormClient}>
                        <p className={styles.pForm}>ID do Fornecedor:</p>
                        <Input type="number" name="id_fornecedor" placeholder="Digite o ID do fornecedor..." value={formData.id_fornecedor} onChange={handleChange} />
                        {errors.id_fornecedor && <p className={styles.error}>{errors.id_fornecedor}</p>}
                    </div>

                    <div className={styles.divButton}>
                        <Button text='Cadastrar produto' type="submit" />
                    </div>
                </form>
            </div>
        </>
    );
}
