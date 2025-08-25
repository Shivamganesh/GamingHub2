"use client"

import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqData = [
  {
    question: "How do I create an account?",
    answer:
      "You can create an account by clicking the 'Login' button in the top right corner and selecting 'Sign Up'. Follow the on-screen instructions to complete your registration.",
  },
  {
    question: "What games are available on the platform?",
    answer:
      "We offer a wide variety of games across different genres, including action, RPG, racing, and more. Visit our 'Games' section to see the full list.",
  },
  {
    question: "How can I report a bug or an issue?",
    answer:
      "If you encounter any bugs or issues, please use the 'Contact Us' form in the footer or visit our community forums to report it. Our support team will assist you promptly.",
  },
  {
    question: "Is there a mobile app for the Gaming Hub?",
    answer:
      "Currently, the Gaming Hub is optimized for web browsers on both desktop and mobile devices. We are working on dedicated mobile applications for future releases.",
  },
  {
    question: "How do leaderboards work?",
    answer:
      "Leaderboards track the top players globally for each game based on their in-game scores. Your score is automatically updated after each game session.",
  },
]

const FAQSection = () => {
  return (
    <section id="faq" className="py-20 px-4 sm:px-4 md:px-8 lg:px-16 bg-dark-bg-primary">
      <motion.h2
        className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-anton text-center text-text-primary mb-8 sm:mb-10 md:mb-12"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
      >
        Frequently Asked Questions
      </motion.h2>
      <motion.div
        className="max-w-full sm:max-w-2xl md:max-w-3xl mx-auto bg-dark-bg-secondary rounded-lg shadow-lg border border-dark-bg-primary"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <Accordion type="single" collapsible className="w-full p-2 sm:p-4">
          {faqData.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-b border-dark-bg-primary">
              <AccordionTrigger className="text-base sm:text-lg font-inter text-text-primary hover:text-accent transition-colors duration-200 text-left">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-text-secondary font-inter leading-relaxed pt-2 pb-3 sm:pb-4 text-sm sm:text-base">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </section>
  )
}

export default FAQSection
