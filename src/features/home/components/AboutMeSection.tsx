import H4 from "../../../components/H4"
import styles from "./AboutMeSection.module.css"
import React from "react"

interface Props {
  title: string,
  text1: string,
  text2: string
}

const AboutMeSection: React.FC<Props> = (props) => {
  return (
    <>
      <div className={styles.space1} />
      <H4 text={props.title} />
      <div className={styles.space2} />
      <p>{props.text1}</p>
      <p>{props.text2}</p>
    </>
  )
}

export default AboutMeSection