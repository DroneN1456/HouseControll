'use client'
import { Card, ListGroup } from "react-bootstrap"
import localFont from "next/font/local"

const AileronItalic = localFont({src: "../../../font/Aileron-ThinItalic.otf"})
const AileronLight = localFont({src: "../../../font/Aileron-UltraLight.otf"})

export default function HouseCard({house}: {house: any}){
    const formater = new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'})
    return (
        <div className="col-12 col-sm-6 col-md-4 p-0">
            <Card className="houseCard">
                <Card.Body>
                    <Card.Title className={AileronItalic.className + " houseTitle"}>{house.Name}</Card.Title>
                    <Card.Text className={AileronLight.className + " houseInfo"}>
                        Membros
                    </Card.Text>
                    <ListGroup className="houseMembers">
                        {house.Members.map((member: any) => {
                            return (
                                <ListGroup.Item key={member.Id}>
                                    {member.Name}{member.IsOwner && <i className="bi bi-person-fill-gear houseOwner"></i>}
                                </ListGroup.Item>
                            )
                        })}
                        </ListGroup>
                </Card.Body>
                <Card.Footer>
                    <Card.Text className={AileronItalic.className + " houseInfo m-0"}>
                        Devendo
                    </Card.Text>
                    <Card.Text className={AileronLight.className + " houseInfo " + (house.Owing <= 0 ? 'PositiveValue' : 'NegativeValue')}>
                        {formater.format(house.Owing)}
                    </Card.Text>
                </Card.Footer>
            </Card>
        </div>
    )
}