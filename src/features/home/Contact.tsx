import { Grid, GridCol, Image, Modal, Space, Stack, Text, Textarea, TextInput } from '@mantine/core'
import skillStyles from "./Skills.module.css";
import H2 from '../../components/H2';
import Button from '../../components/Button';
import contactImage from "../../assets/contact_img.png";
import { useForm } from "@mantine/form";
import { zodResolver } from 'mantine-form-zod-resolver';
import { z } from 'zod';
import { IContactRequest, IContactResponse } from '../../shared/interfaces/ContactInterface';
import { useDisclosure } from '@mantine/hooks';
import modalGif from "../../assets/modal.gif";
import { useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { notifications } from '@mantine/notifications';

// バリデーション
const validationSchema = z.object({
  name: z.string().nonempty({ message: "名前を入力してください" }),
  email: z.string().email({ message: "無効なメールアドレスです" }),
  message: z.string().min(10, { message: "10文字以上入力してください" }).max(1000, { message: "1000文字以内で入力してください" }),
});

const Contact = () => {
  // Modal
  const [opened, { open, close }] = useDisclosure(false);
  const [isSuccess, setIsSucsess] = useState(false);

  // From
  const form = useForm({
    mode: "controlled",
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    validate: zodResolver(validationSchema),
  });

  // Button Click処理
  const handleSubmit = async (values: IContactRequest) => {
    form.validate();

    try {
      notifications.show({
        title: "Sending",
        message: "メッセージを送信中...",
        position: "top-center",
        loading: true,
        autoClose: false,
        withCloseButton: false,
      })

      await new Promise(resolve => setTimeout(resolve, 1000));

      const response = await axiosInstance.post("/contact", values);
      const data: IContactResponse = response.data;
      console.log(data);

      notifications.clean();
      setIsSucsess(true);
      form.reset();
      open();

    } catch (error) {
      notifications.clean();
      setIsSucsess(false);
      open();
    }
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        centered
        transitionProps={{ transition: 'fade', duration: 200, timingFunction: 'linear' }}
        size="md">
        {/* Modal content */}
        <Stack justify='center' align='center'>
          {isSuccess ? (
            <>
              <Text size="xl" mah={20}>Thank you for your message!</Text>
              <Text size="xl">(*^_^*)</Text>
              <Image src={modalGif} alt="Thanks Image" />
            </>
          ) : (
            <>
              <Text size="xl" mah={20}>Sorry, something went wrong.</Text>
              <Text size="xl">m(_ _)m</Text>
            </>
          )}
        </Stack>
      </Modal>
      <section className={skillStyles.section} id='contact'>
        <H2 text='Contact' />
        <Space h="xl" />
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Grid justify='space-between' align='center'>
            <GridCol span={6}>
              <Stack gap={30}>
                <TextInput
                  size="md"
                  styles={{ input: { backgroundColor: 'transparent' } }}
                  placeholder='Your Name'
                  key={form.key('name')}
                  {...form.getInputProps('name')} />
                <TextInput
                  size="md"
                  styles={{ input: { backgroundColor: 'transparent' } }}
                  placeholder='Your Email'
                  key={form.key('email')}
                  {...form.getInputProps('email')} />
                <Textarea
                  size="md"
                  styles={{ input: { backgroundColor: 'transparent' } }}
                  placeholder='Message'
                  autosize={true}
                  maxRows={10}
                  key={form.key('message')}
                  {...form.getInputProps('message')} />
                <div style={{ textAlign: "right" }}>
                  <Button text='Submit' type='submit' />
                </div>
              </Stack>
            </GridCol>
            <GridCol span={5}>
              <Image src={contactImage} alt="contact image" />
            </GridCol>
          </Grid>
        </form>
      </section >
    </>
  )
}

export default Contact