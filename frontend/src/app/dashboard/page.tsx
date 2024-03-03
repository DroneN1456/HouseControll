import Image from "next/image";
import styles from "./page.module.css";
import 'bootstrap/dist/css/bootstrap.min.css'

export default function Home({children}: {children: any}) {
  return (
    <main className="container-fluid d-flex flex-row row" style={{height: '100vh', padding: "0", margin: "0"}}>
      <div className="col-2">
        sidebar
      </div>
      <div className="d-flex flex-column col-10 boxShadow" style={{height: '100vh', padding: "0", margin: "0"}}>
        <div className="d-flex align-items-center justify-content-center title" style={{height: '100px'}}>
          header
        </div>
        <div className={styles.page}>
          {children}
        </div>
      </div>
    </main>
  );
}
