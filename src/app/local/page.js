'use client';
import { useState } from 'react';
import styles from './styles.module.css';
import Button from '../components/button/Button';
import Input from '../components/input/Input';

export default function Local() {
    const [formData, setFormData] = useState({
        id_local: '',
        nome: '',
        endereco: ''
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

        if (!formData.nome) newErrors.nome = "O nome é obrigatório.";
        if (!formData.endereco) newErrors.endereco = "O endereço é obrigatório.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateForm()) return;

        try {
            const response = await fetch('http://ceteia.guanambi.ifbaiano.edu.br:15050/api/local', { // Defina a URL correta aqui
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                alert("Local cadastrado com sucesso!");
                setFormData({ id_local: '', nome: '', endereco: '' });
                setErrors({});
            } else {
                alert(`Erro: ${data.error || "Erro ao cadastrar o local"}`);
            }
        } catch (error) {
            console.error("Erro ao enviar requisição:", error);
            alert("Erro ao conectar-se ao servidor.");
        }
    };

    return (
        <>
            <div className={styles.container1}>
                <p className={styles.title}>Cadastro de Local</p>
            </div>
            <div className={styles.divForm}>
                <form onSubmit={handleSubmit}>
                    <div className={styles.divFormClient}>
                        <p className={styles.pForm}>Nome:</p>
                        <Input type="text" name="nome" placeholder="Digite o nome do local..." value={formData.nome} onChange={handleChange} />
                        {errors.nome && <p className={styles.error}>{errors.nome}</p>}
                    </div>

                    <div className={styles.divFormClient}>
                        <p className={styles.pForm}>Endereço:</p>
                        <Input type="text" name="endereco" placeholder="Digite o endereço..." value={formData.endereco} onChange={handleChange} />
                        {errors.endereco && <p className={styles.error}>{errors.endereco}</p>}
                    </div>

                    <div className={styles.divButton}>
                        <Button text='Cadastrar' type="submit" />
                    </div>
                </form>
            </div>
        </>
    );
}
