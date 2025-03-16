'use client'
import { useState } from 'react';
import styles from './styles.module.css';
import Button from '../components/button/Button';
import Input from '../components/input/Input';

export default function Venda() {
    const [formData, setFormData] = useState({
        id_cliente: '',
        data_venda: '',
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
        if (!formData.id_cliente) newErrors.id_cliente = "O ID do cliente é obrigatório.";
        if (!formData.data_venda) newErrors.data_venda = "A data da venda é obrigatória.";
        if (!formData.valor_total) newErrors.valor_total = "O valor total é obrigatório.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) return;

        try {
            const response = await fetch('http://ceteia.guanambi.ifbaiano.edu.br:15050/api/venda', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                alert(`Venda cadastrada com sucesso! ID: ${data.id_venda}`);
                setFormData({ id_cliente: '', data_venda: '', valor_total: '' });
                setErrors({});
            } else {
                alert(`Erro: ${data.error || "Erro ao cadastrar a venda"}`);
            }
        } catch (error) {
            console.error("Erro ao enviar requisição:", error);
            alert("Erro ao conectar-se ao servidor.");
        }
    };

    return (
        <>
            <div className={styles.container1}>
                <p className={styles.title}>Cadastro de Venda</p>
            </div>
            <div className={styles.divForm}>
                <form onSubmit={handleSubmit}>
                    <div className={styles.divFormClient}>
                        <p className={styles.pForm}>ID Cliente:</p>
                        <Input type="number" name="id_cliente" placeholder="Digite o ID do cliente..." value={formData.id_cliente} onChange={handleChange} />
                        {errors.id_cliente && <p className={styles.error}>{errors.id_cliente}</p>}
                    </div>

                    <div className={styles.divFormClient}>
                        <p className={styles.pForm}>Data da Venda:</p>
                        <Input type="datetime-local" name="data_venda" value={formData.data_venda} onChange={handleChange} />
                        {errors.data_venda && <p className={styles.error}>{errors.data_venda}</p>}
                    </div>

                    <div className={styles.divFormClient}>
                        <p className={styles.pForm}>Valor Total:</p>
                        <Input type="number" name="valor_total" placeholder="Digite o valor total..." step="0.01" value={formData.valor_total} onChange={handleChange} />
                        {errors.valor_total && <p className={styles.error}>{errors.valor_total}</p>}
                    </div>

                    <div className={styles.divButton}>
                        <Button text='Cadastrar Venda' type="submit" />
                    </div>
                </form>
            </div>
        </>
    );
}
