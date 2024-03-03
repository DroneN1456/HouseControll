'use client'

import { Button, Form } from "react-bootstrap"
import style from '../login.module.css'
import localFont from 'next/font/local'
import Link from "next/link"

const AileronItalic = localFont({src: "../../../font/Aileron-ThinItalic.otf"})

export default function LoginContainer(){
    return (
        <div className={style.LoginContainer}>
            <Form>
                <h1 className={AileronItalic.className + " p-1"}>House Controll</h1>
                <Form.Group>
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type="text" placeholder="Nome" />
                </Form.Group>
                <Form.Group className="mt-3">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control type="password" placeholder="Senha" />
                </Form.Group>
                <Button className="mt-3" style={{width: '100%'}}>
                    Entrar
                </Button>
                <div className="d-flex justify-content-center align-items-center mt-3">
                  <Link href="register">Registre-se</Link>
                </div>
            </Form>
        </div>
    )
}