import localFont from 'next/font/local'

const AileronItalic = localFont({src: "../../../font/Aileron-ThinItalic.otf"})
const AileronLight = localFont({src: "../../../font/Aileron-UltraLight.otf"})

export default function ProfileCell({title, value, negative} : {title:string, value: string, negative: boolean}){
    return (
        <div className="d-flex flex-column col-12 col-sm-6 col-md-4 col-lg-3">
            <div className={AileronItalic.className + " cellTitle"}>{title}</div>
            <div className={AileronLight.className + " cellValue " + (negative ? 'NegativeValue' : 'PositiveValue')}>{value}</div>
        </div>
    )
}