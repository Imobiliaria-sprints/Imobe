import Header from '../components/Header'
import '../styles/global.scss'
import styles from '../styles/app.module.scss';

function MyApp({ Component, pageProps }) {
  return (
    <div className={styles.appWrapper }>
      <main>
        <Header />
        <Component {...pageProps} />
      </main>

    </div>
  )
}

export default MyApp
