import React from 'react'
import styles from "../app.module.css"

export default function Popup({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
        <>
        {children}
        </>
    )
}
