'use client';
import styles from './styles.module.css';
import { useSearchParams } from "next/navigation";

export default function Grupo(){
    const dados = useSearchParams();
    const nome = dados.get('name');
    const email = dados.get('email');
    return (
        <div>
            <p className={styles.p}>Olá mundo!</p>
            <p className={styles.p}>{nome}</p>
            <p className={styles.p}>{email}</p>
        </div>
    )
}