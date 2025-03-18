'use client'
import { useState } from 'react';
import styles from './styles.module.css'
import Button from '../components/button/Button'
import Input from '../components/input/Input'

export default function Fornecedor() {
    const [formData, setFormData] = useState({
        id_fornecedor: '',
        nome: '',
        email: '',
        telefone: '',
        endereco: ''
    });

    const [errors, setErrors] = useState({});

    // Formata o telefone no padrão (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
    const handleTelefoneChange = (event) => {
        let value = event.target.value.replace(/\D/g, ''); // Remove tudo que não for número

        if (value.length > 11) {
            value = value.slice(0, 11); // Limita a 11 dígitos
        }

        if (value.length > 10) {
            // Formato para celulares: (XX) XXXXX-XXXX
            value = value.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
        } else if (value.length > 6) {
            // Formato para fixo: (XX) XXXX-XXXX
            value = value.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3');
        } else if (value.length > 2) {
            // Apenas código de área: (XX) XXXX
            value = value.replace(/^(\d{2})(\d{0,5})$/, '($1) $2');
        } else {
            // Apenas código de área
            value = value.replace(/^(\d*)$/, '($1');
        }

        setFormData((prevData) => ({
            ...prevData,
            telefone: value
        }));
    };

    // Função genérica para outros campos
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    // Função para validar os campos do formulário
    const validateForm = () => {
        let newErrors = {};

        if (!formData.nome) newErrors.nome = "O nome é obrigatório.";
        if (!formData.email) newErrors.email = "O e-mail é obrigatório.";
        if (!formData.telefone) newErrors.telefone = "O telefone é obrigatório.";
        if (!formData.endereco) newErrors.endereco = "O endereço é obrigatório.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Função para enviar os dados para a API
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateForm()) return; // Para se houver erros

        console.log("Enviando:", JSON.stringify(formData));

        try {
            const response = await fetch('http://ceteia.guanambi.ifbaiano.edu.br:15050/api/fornecedor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                alert(`Fornecedor cadastrado com sucesso!`);
                setFormData({ id_fornecedor: '', nome: '', email: '', telefone: '', endereco: '' });
                setErrors({});
            } else {
                alert(`Erro: ${data.error || "Erro ao cadastrar fornecedor"}`);
            }
        } catch (error) {
            console.error("Erro ao enviar requisição:", error);
            alert("Erro ao conectar-se ao servidor.");
        }
    };

    return (
        <>
            <div className={styles.container1}>
                <p className={styles.title}>Cadastro de Fornecedor</p>
            </div>
            <div className={styles.divForm}>
                <form onSubmit={handleSubmit}>
                    <div className={styles.divFormClient}>
                        <p className={styles.pForm}>Nome:</p>
                        <Input type="text" name="nome" placeholder="Digite o nome..." value={formData.nome} onChange={handleChange} />
                        {errors.nome && <p className={styles.error}>{errors.nome}</p>}
                    </div>

                    <div className={styles.divFormClient}>
                        <p className={styles.pForm}>E-mail:</p>
                        <Input type="email" name="email" placeholder="Digite o e-mail..." value={formData.email} onChange={handleChange} />
                        {errors.email && <p className={styles.error}>{errors.email}</p>}
                    </div>

                    <div className={styles.divFormClient}>
                        <p className={styles.pForm}>Telefone:</p>
                        <Input type="text" name="telefone" placeholder="Digite o telefone..." value={formData.telefone} onChange={handleTelefoneChange} maxLength="15" />
                        {errors.telefone && <p className={styles.error}>{errors.telefone}</p>}
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
