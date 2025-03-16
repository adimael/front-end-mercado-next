'use client';
import { useState } from 'react';
import styles from './styles.module.css';
import Button from '../components/button/Button';
import Input from '../components/input/Input';

export default function Compra() {
    const [formData, setFormData] = useState({
        id_compra: '',
        id_fornecedor: '',
        data_compra: '',
        valor_total: ''
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

        if (!formData.id_compra) newErrors.id_compra = "O ID da compra é obrigatório.";
        if (!formData.id_fornecedor) newErrors.id_fornecedor = "O ID do fornecedor é obrigatório.";
        if (!formData.data_compra) newErrors.data_compra = "A data da compra é obrigatória.";
        if (!formData.valor_total) {
            newErrors.valor_total = "O valor total é obrigatório.";
        } else if (isNaN(parseFloat(formData.valor_total))) {
            newErrors.valor_total = "O valor total deve ser um número válido.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const formatDateTime = (datetime) => {
        if (!datetime) return '';
        const date = new Date(datetime);
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:00`;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateForm()) return;

        const formattedData = {
            ...formData,
            data_compra: formatDateTime(formData.data_compra),
            valor_total: parseFloat(formData.valor_total).toFixed(2) // Garantir duas casas decimais
        };

        try {
            const response = await fetch('http://ceteia.guanambi.ifbaiano.edu.br:15050/api/compras', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formattedData)
            });

            const data = await response.json();

            if (response.ok) {
                alert(`Compra cadastrada com sucesso!`);
                setFormData({ id_compra: '', id_fornecedor: '', data_compra: '', valor_total: '' });
                setErrors({});
            } else {
                alert(`Erro: ${data.error || "Erro ao cadastrar a compra"}`);
            }
        } catch (error) {
            console.error("Erro ao enviar requisição:", error);
            alert("Erro ao conectar-se ao servidor.");
        }
    };

    return (
        <>
            <div className={styles.container1}>
                <p className={styles.title}>Cadastro de Compra</p>
            </div>
            <div className={styles.divForm}>
                <form onSubmit={handleSubmit}>
                    <div className={styles.divFormClient}>
                        <p className={styles.pForm}>ID da Compra:</p>
                        <Input type="text" name="id_compra" placeholder="Digite o ID da compra..." value={formData.id_compra} onChange={handleChange} />
                        {errors.id_compra && <p className={styles.error}>{errors.id_compra}</p>}
                    </div>

                    <div className={styles.divFormClient}>
                        <p className={styles.pForm}>ID do Fornecedor:</p>
                        <Input type="text" name="id_fornecedor" placeholder="Digite o ID do fornecedor..." value={formData.id_fornecedor} onChange={handleChange} />
                        {errors.id_fornecedor && <p className={styles.error}>{errors.id_fornecedor}</p>}
                    </div>

                    <div className={styles.divFormClient}>
                        <p className={styles.pForm}>Data da Compra:</p>
                        <Input type="datetime-local" name="data_compra" value={formData.data_compra} onChange={handleChange} />
                        {errors.data_compra && <p className={styles.error}>{errors.data_compra}</p>}
                    </div>

                    <div className={styles.divFormClient}>
                        <p className={styles.pForm}>Valor Total:</p>
                        <Input type="text" name="valor_total" placeholder="Digite o valor total..." value={formData.valor_total} onChange={handleChange} />
                        {errors.valor_total && <p className={styles.error}>{errors.valor_total}</p>}
                    </div>

                    <div className={styles.divButton}>
                        <Button text='Cadastrar' type="submit" />
                    </div>
                </form>
            </div>
        </>
    );
}
