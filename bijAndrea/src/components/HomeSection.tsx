import { motion } from 'framer-motion';
import { ReactNode } from 'react';


interface Props {
  title: string;
  icon?: string;
  children: ReactNode;
  link?: { to: string; label: string };
  className?: string;
}

export default function HomeSection({ title, icon, children, link, className }: Props) {
  return (
    <motion.section
      className={`space-y-6 ${className ?? ''}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h2 className="text-2xl font-bold text-center">
        {icon && <span className="mr-1">{icon}</span>}
        {title}
      </h2>

      {children}

      {link && (
        <div className="text-center mt-4">
          <a href={link.to} className="text-pink-600 underline font-medium">
            {link.label}
          </a>
        </div>
      )}
    </motion.section>
  );
}
