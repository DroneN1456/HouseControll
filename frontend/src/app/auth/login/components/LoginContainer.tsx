'use client'

import { Button, Form } from "react-bootstrap"
import style from '../login.module.css'
import localFont from 'next/font/local'
import Link from "next/link"
import { useForm } from "react-hook-form"
import {setCookie} from "nookies"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import { useState } from "react"

const AileronItalic = localFont({src: "../../../font/Aileron-ThinItalic.otf"})

export default function LoginContainer({loginCallback}: {loginCallback: any}){

    const {register, watch, handleSubmit, formState: {isValid, errors, touchedFields}} = useForm({
        mode: 'onChange'
    });
    const email = watch('Email')
    const router = useRouter();

    async function handleLogin(data: any){
        const res = await loginCallback(data)
        if(res.statusCode){
            toast('Usuário ou Senha Inválidos !', {type: 'error'})
            return;
        }
        setCookie(null, 'token', res.token, {
            maxAge: 60 * 60,
            path: '/'
        });
        router.push('/dashboard/profile')
    }

    return (
        <div className={style.LoginContainer}>
            <Form onSubmit={handleSubmit(handleLogin)} noValidate validated={isValid}>
                <h1 className={AileronItalic.className + " p-1"}>House Controll</h1>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                     isValid={errors.Email == null && touchedFields.Email}
                     isInvalid={errors.Email != null}
                     type="text"
                     placeholder="john@email.com"  
                     {...register('Email', {
                        required: true,
                        minLength: 5,
                        maxLength: 40,
                        pattern:/^\S+@\S+\.\S+$/,
                     })}/>
                </Form.Group>
                <Form.Group className="mt-3">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control
                     type="password"
                     isValid={errors.Password == null && touchedFields.Password}
                     isInvalid={errors.Password != null}
                     placeholder="Senha"  
                     {...register('Password', {
                        required: true,
                        minLength: 5,
                        maxLength: 40,
                     })}/>
                </Form.Group>
                <Button className="mt-3" style={{width: '100%'}} type="submit">
                    Entrar
                </Button>
                <div className="d-flex justify-content-center align-items-center mt-3">
                  <Link href="register">Registrar</Link>
                </div>
            </Form>
        </div>
    )
}