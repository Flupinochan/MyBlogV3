import { Grid, GridCol, Image, Space, Stack, Textarea, TextInput } from '@mantine/core'
import skillStyles from "./Skills.module.css";
import H2 from '../../components/H2';
import Button from '../../components/Button';
import contactImage from "../../assets/contact_img.png";

const Contact = () => {
  const erroeMessage = "入力エラー"

  return (
    <section className={skillStyles.section}>
      <H2 text='Contact' />
      <Space h="xl" />
      <Grid justify='space-between' align='center'>
        <GridCol span={6}>
          <Stack gap={30}>
            <TextInput
              size="md"
              styles={{ input: { backgroundColor: 'transparent' } }}
              placeholder='Your Name' />
            <TextInput
              size="md"
              styles={{ input: { backgroundColor: 'transparent' } }}
              placeholder='Your Email' />
            <Textarea
              size="md"
              styles={{ input: { backgroundColor: 'transparent' } }}
              placeholder='Message'
              autosize={true}
              maxRows={10}
              error={false ? erroeMessage : ""} />
            <div style={{ textAlign: "right" }}>
              <Button text='Submit' />
            </div>
          </Stack>
        </GridCol>
        <GridCol span={5}>
          <Image src={contactImage} alt="contact image" />
        </GridCol>
      </Grid>
    </section >
    // 送信時にThanks GIF
  )
}

export default Contact