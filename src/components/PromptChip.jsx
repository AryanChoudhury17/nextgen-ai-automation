import { motion } from 'framer-motion'

function PromptChip({ label, active, onClick }) {
  return (
    <motion.button
      type="button"
      className={`prompt-chip ${active ? 'active' : ''}`}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.96 }}
      aria-pressed={active}
    >
      {label}
    </motion.button>
  )
}

export default PromptChip
