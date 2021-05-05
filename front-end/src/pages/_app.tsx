import Header from '../components/Header'
import '../styles/global.scss'
import styles from '../styles/app.module.scss';
import Sidebar from '../components/Sidebar';

function MyApp({ Component, pageProps }) {
  return (
    <div className={styles.appWrapper }>
      <main>
        <Header />
        <Component {...pageProps} />
      </main>
      <Sidebar />
    </div>
  )
}

export default MyApp
