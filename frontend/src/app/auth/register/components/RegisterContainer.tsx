'use client'

import { Button, Form } from "react-bootstrap"
import style from '../register.module.css'
import localFont from 'next/font/local'
import Link from "next/link"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"

const AileronItalic = localFont({src: "../../../font/Aileron-ThinItalic.otf"})


export default function RegisterContainer({RegisterCallback}: {RegisterCallback: any}){
    const {register, handleSubmit} = useForm();
    const router = useRouter();

    async function HandleRegister(data: any){
        if(data.Name == '' || data.Password == ''){
            alert("Preencha todos os campos!")
            return;
        }
        const status = await RegisterCallback(data);
        if(status != 201){
            alert('Algo deu errado.')
        }else{
            router.push('login')
            alert('Registrado com sucesso!')
        }
    }
    return (
        <div className={style.RegisterContainer}>
            <Form onSubmit={handleSubmit(HandleRegister)}>
                <h1 className={AileronItalic.className + " p-1"}>House Controll</h1>
                <Form.Group>
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type="text" placeholder="Nome" {...register('Name')}/>
                </Form.Group>
                <Form.Group className="mt-3">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control type="password" placeholder="Senha" {...register('Password')}/>
                </Form.Group>
                <Button className="mt-3" style={{width: '100%'}} type="submit">
                    Registrar
                </Button>
                <div className="d-flex justify-content-center align-items-center mt-3">
                  <Link href="login">Logar-se</Link>
                </div>
            </Form>
        </div>
    )
}