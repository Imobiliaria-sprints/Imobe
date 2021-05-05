import React from 'react';
import { MdMenu } from 'react-icons/md'

import styles from './header.module.scss';


const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      <img src="/icons/logo.svg" alt="logo marca" />

      <MdMenu style={{width: 30, height:30, cursor: 'pointer'}}/>
   </div>
 )


}

export default Header;
