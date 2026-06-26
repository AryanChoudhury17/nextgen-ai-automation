import { motion } from 'framer-motion'

function WorkflowArrow({ delay = 0 }) {
  return (
    <motion.div
      className="workflow-arrow"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.35, ease: 'easeOut' }}
      aria-hidden="true"
    >
      <span />
    </motion.div>
  )
}

export default WorkflowArrow
