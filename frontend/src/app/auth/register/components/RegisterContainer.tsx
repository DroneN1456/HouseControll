'use client'

import { Button, Form } from "react-bootstrap"
import style from '../register.module.css'
import localFont from 'next/font/local'
import Link from "next/link"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import { useState } from "react"
const AileronItalic = localFont({src: "../../../font/Aileron-ThinItalic.otf"})


export default function RegisterContainer({RegisterCallback}: {RegisterCallback: any}){

    const {register, handleSubmit, watch, formState: {isValid, errors, touchedFields}} = useForm({
        mode: 'onChange'
    });
    const [validated, setValidated] = useState(false);
    const router = useRouter();
    const email = watch('Email')
    const password = watch('Password')

    async function HandleRegister(data: any){
        const res = await RegisterCallback({
            Email: data.Email,
            Name: data.Name,
            Password: data.Password
        });
        if(res.statusCode){
            toast(res.message, {type: 'error'})
            return;
        }else{
            router.push('login')
            toast('Usuário registrado, agora você precisa verificar no seu email', {type: 'warning'})
        }
    }
    return (
        <div className={style.RegisterContainer}>
            <Form onSubmit={handleSubmit(HandleRegister)} noValidate validated={validated}>
                <h1 className={AileronItalic.className + " p-1"}>House Controll</h1>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                    isInvalid={errors.Email != null}
                    isValid={touchedFields.Email && !errors.Email}
                     type="text"
                     placeholder="john@email.com"  
                     {...register('Email', {
                        required: true,
                        minLength: 5,
                        maxLength: 40,
                        pattern:/^\S+@\S+\.\S+$/,
                     })}/>
                     <Form.Control.Feedback type="invalid">Insira um Email Válido.</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mt-3">
                    <Form.Label>Confirmar Email</Form.Label>
                    <Form.Control
                     type="text"
                     isValid={errors.ConfirmEmail == null && touchedFields.ConfirmEmail}
                     isInvalid={errors.ConfirmEmail != null}
                     placeholder="john@email.com"  
                     {...register('ConfirmEmail', {
                        required: true,
                        minLength: 5,
                        maxLength: 40,
                        pattern:/^\S+@\S+\.\S+$/,
                        validate: (value) => (value === email && value != null)
                     })}/>
                </Form.Group>
                <Form.Group className="mt-3">
                    <Form.Label>Nome Completo</Form.Label>
                    <Form.Control
                     type="text"
                     isValid={errors.Name == null && touchedFields.Name}
                     isInvalid={errors.Name != null}
                     placeholder="John Doe"  
                     {...register('Name', {
                        required: true,
                        minLength: 5,
                        maxLength: 40,
                     })}/>
                </Form.Group>
                <Form.Group className="mt-3">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control
                     type="password"
                     autoComplete="password"
                     isValid={errors.Password == null && touchedFields.Password}
                     isInvalid={errors.Password != null}
                     placeholder="Senha"  
                     {...register('Password', {
                        required: true,
                        minLength: 5,
                        maxLength: 40,
                     })}/>
                </Form.Group>
                <Form.Group className="mt-3">
                    <Form.Label>Confirmar Senha</Form.Label>
                    <Form.Control
                     type="password"
                     autoComplete="password"
                     isValid={errors.ConfirmPassword == null && touchedFields.ConfirmPassword}
                     isInvalid={errors.ConfirmPassword != null}
                     placeholder="Confirmar Senha"  
                     {...register('ConfirmPassword', {
                        required: true,
                        minLength: 5,
                        maxLength: 40,
                        validate: (value) => (value === password && value != null)
                     })}/>
                </Form.Group>
                <Button className="mt-3" style={{width: '100%'}} type="submit">
                    Registrar
                </Button>
                <div className="d-flex justify-content-center align-items-center mt-3">
                  <Link href="login">Entrar</Link>
                </div>
            </Form>
        </div>
    )
}