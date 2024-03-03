import LoginContainer from "./components/LoginContainer";

export default function Page(){
    return (
        <div className="container-fluid d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
            <div>
                <LoginContainer/>
            </div>
        </div>
    )
}