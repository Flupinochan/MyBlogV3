import { Grid, GridCol, Image, Space, Stack, Textarea, TextInput } from '@mantine/core'
import skillStyles from "./Skills.module.css";
import H2 from '../../components/H2';
import Button from '../../components/Button';
import contactImage from "../../assets/contact_img.png";
import amplifyOutputs from "../../../amplify_outputs.json";
import { useForm } from "@mantine/form";
import { zodResolver } from 'mantine-form-zod-resolver';
import { z } from 'zod';
import { IContactRequest } from '../../shared/interfaces/ContactInterface';

const apiEndpoint = amplifyOutputs.custom.API.MyBlogV3.endpoint + "/contact";

const validationSchema = z.object({
  name: z.string().nonempty({ message: "名前を入力してください" }),
  email: z.string().email({ message: "無効なメールアドレスです" }),
  message: z.string().min(10, { message: "10文字以上入力してください" }).max(1000, { message: "1000文字以内で入力してください" }),
});

const Contact = () => {
  const form = useForm({
    mode: "controlled",
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    validate: zodResolver(validationSchema),
  });

  const handleSubmit = async (values: IContactRequest) => {
    form.validate();

    try {
      const res = await fetch(apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        throw new Error("送信に失敗しました");
      }

      // 任意: サンクスメッセージ表示 or GIF
      alert("送信が完了しました。ありがとうございます！");
      form.reset();

    } catch (error) {
      console.error(error);
      alert("送信中にエラーが発生しました。");
    }
  };

  return (
    <section className={skillStyles.section}>
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
  )
}

export default Contact