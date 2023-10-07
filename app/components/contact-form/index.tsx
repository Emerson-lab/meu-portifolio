'use client'

import axios from "axios"
import { Button } from "../button"
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import { useForm } from "react-hook-form"
import { SectionTitle } from "../section-title"
import { zodResolver } from '@hookform/resolvers/zod'
import { fadeUpAnimation } from "@/app/lib/animations"
import { HiOutlineArrowNarrowRight } from "react-icons/hi"
import { ContactFormData, contactFormSchema } from './contactFormSchema'

export const ContactForm = () => {

  const {
    handleSubmit,
    register,
    reset,
    formState: { isSubmitting }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema)
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      await axios.post('/api/contact', data);
      toast.success('Mensagem enviada com sucesso!', {
        duration: 3000,
      });
      reset();
    } catch {
      toast.error('Ocorreu um erro ao enviar a mensagem. Tente novamente.', {
        duration: 5000
      });
    }
  }

  return (
    <section id="contact" className="py-16 px-6 md:py-32 flex items-center justify-center bg-gray-950">
      <div className="2-full max-w-[420px] mx-auto">
        <SectionTitle
          subtitle="contato"
          title="Vamos trabalhar juntos? Entre em contato"
          className="items-center text-center"
        />

        <motion.form
          className="mt-12 w-full flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
          {...fadeUpAnimation}
        >
          <input
            placeholder="Nome"
            className="w-full h-14 bg-gray-800 rounded-lg placeholder:text-gray-400 text-gray-500 p-4 focus:outline-none focus:ring-2 ring-emerald-600"
            {...register('name')}
          />
          <input
            placeholder="Email"
            type="email"
            className="w-full h-14 bg-gray-800 rounded-lg placeholder:text-gray-400 text-gray-500 p-4 focus:outline-none focus:ring-2 ring-emerald-600"
            {...register('email')}
          />
          <textarea
            placeholder="Mensagem"
            className="resize-none w-full h-[138px] bg-gray-800 rounded-lg placeholder:text-gray-400 text-gray-500 p-4 focus:outline-none focus:ring-2 ring-emerald-600"
            maxLength={500}
            {...register('message')}
          />
          <Button
            className="w-max mx-auto mt-6 shadow-button"
            disabled={isSubmitting}
          >
            Enviar mensagem
            <HiOutlineArrowNarrowRight size={18} />
          </Button>
        </motion.form>
      </div>

    </section>
  )
}