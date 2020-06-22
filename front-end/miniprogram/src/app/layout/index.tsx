import React from 'react';
import './index.scss';
import Provider from '@/components/provider';
import {APPC} from '../style';
import clsx from 'clsx';
import Footer from './footer';

const CLASS_PREFIX = APPC+'-layout';

interface Props{
  children?: React.ReactNode
  footer?: boolean
  className?: string
}

export default ({children, className, footer=false}: Props) => {
  return (
    <Provider className={clsx(CLASS_PREFIX+'-root', className)}>
      {children}
      {footer && <Footer/>}
    </Provider>
  )
}