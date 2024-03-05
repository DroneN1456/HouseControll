'use client'

import { Button, Form } from "react-bootstrap"
import style from '../login.module.css'
import localFont from 'next/font/local'
import Link from "next/link"
import { useForm } from "react-hook-form"
import {setCookie} from "nookies"

const AileronItalic = localFont({src: "../../../font/Aileron-ThinItalic.otf"})

export default function LoginContainer({loginCallback}: {loginCallback: any}){

    const {register, handleSubmit} = useForm();

    async function handleLogin(data: any){
        const res = await loginCallback(data)
        if(res.statusCode){
            alert('Usuario invalido!')
            return;
        }
        setCookie(null, 'token', res.token, {
            maxAge: 60 * 60,
            path: '/'
        });
    }

    return (
        <div className={style.LoginContainer}>
            <Form onSubmit={handleSubmit(handleLogin)}>
                <h1 className={AileronItalic.className + " p-1"}>House Controll</h1>
                <Form.Group>
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type="text" placeholder="Nome"  {...register('Name')}/>
                </Form.Group>
                <Form.Group className="mt-3">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control type="password" placeholder="Senha" {...register('Password')}/>
                </Form.Group>
                <Button className="mt-3" style={{width: '100%'}} type="submit">
                    Entrar
                </Button>
                <div className="d-flex justify-content-center align-items-center mt-3">
                  <Link href="register">Registre-se</Link>
                </div>
            </Form>
        </div>
    )
}