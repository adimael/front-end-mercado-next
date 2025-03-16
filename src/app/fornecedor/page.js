'use client'
import { useState } from 'react';
import styles from './styles.module.css';
import Button from '../components/button/Button';
import Input from '../components/input/Input';

export default function Fornecedor() {
    // Estado para armazenar os dados do formulário
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        cnpj: '',
    });

    // Estado para mensagens de erro
    const [errors, setErrors] = useState({});

    // Função para capturar os valores dos inputs
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Função de validação dos campos
    const validateForm = () => {
        let newErrors = {};

        if (!formData.name.trim()) newErrors.name = 'O nome é obrigatório';
        if (!formData.email.trim()) newErrors.email = 'O e-mail é obrigatório';
        if (!formData.phone.trim()) newErrors.phone = 'O telefone é obrigatório';
        if (!formData.cnpj.trim()) newErrors.cnpj = 'O CNPJ é obrigatório';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Retorna true se não houver erros
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validar os dados antes de enviar
        if (!validateForm()) {
            alert('Preencha todos os campos obrigatórios.');
            return;
        }

        const formData = new FormData(event.target);

        try {
            let response = await fetch('../api/fornecedor', {
                method: 'POST',
                body: formData,
            });
            response = await response.json()

            alert(`Fornecedor cadastrado: ${response.nome} - ${response.email}`);

            // Limpar o formulário após envio bem-sucedido
            setFormData({
                name: '',
                email: '',
                phone: '',
                cnpj: '',
            });

            setErrors({});
        } catch (error) {
            console.error('Erro ao enviar formulário:', error);
        }
    };

    return (
        <>
            <div className={styles.container}>
                <p className={styles.title}>Cadastro de Fornecedor</p>
            </div>
            <div className={styles.formContainer}>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <p className={styles.label}>Nome do Fornecedor:</p>
                        <Input
                            type="text"
                            name="name"
                            placeholder="Digite o nome..."
                            value={formData.name}
                            onChange={handleChange}
                        />
                        {errors.name && <p className={styles.error}>{errors.name}</p>}
                    </div>

                    <div className={styles.formGroup}>
                        <p className={styles.label}>Email:</p>
                        <Input
                            type="email"
                            name="email"
                            placeholder="Digite o e-mail..."
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <p className={styles.error}>{errors.email}</p>}
                    </div>

                    <div className={styles.formGroup}>
                        <p className={styles.label}>Telefone:</p>
                        <Input
                            type="text"
                            name="phone"
                            placeholder="Digite o telefone..."
                            mask="(99) 99999-9999"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                        {errors.phone && <p className={styles.error}>{errors.phone}</p>}
                    </div>

                    <div className={styles.formGroup}>
                        <p className={styles.label}>CNPJ:</p>
                        <Input
                            type="text"
                            name="cnpj"
                            placeholder="Digite o CNPJ..."
                            mask="99.999.999/9999-99"
                            value={formData.cnpj}
                            onChange={handleChange}
                        />
                        {errors.cnpj && <p className={styles.error}>{errors.cnpj}</p>}
                    </div>

                    <div className={styles.formButton}>
                        <Button text="Cadastrar" type="submit" />
                    </div>
                </form>
            </div>
        </>
    );
}
