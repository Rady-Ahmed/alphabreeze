"use client";

import { motion } from "framer-motion";

export default function MapSection() {
  return (
    <section className="relative" id="map">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3452.8!2d31.35!3d30.08!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDA0JzQ4LjAiTiAzMcKwMjEnMDAuMCJF!5e0!3m2!1sar!2seg!4v1"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full"
          title="موقع ألفا بريز"
        />
      </motion.div>
    </section>
  );
}
