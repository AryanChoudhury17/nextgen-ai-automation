import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

function WorkflowNode({ node, delay, onLabelChange, constraintsRef }) {
  const [editing, setEditing] = useState(false)
  const [labelValue, setLabelValue] = useState(node.label)
  const inputRef = useRef(null)

  useEffect(() => {
    setLabelValue(node.label)
  }, [node.label])

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus()
    }
  }, [editing])

  const saveLabel = () => {
    const trimmed = labelValue.trim()
    if (trimmed && trimmed !== node.label) {
      onLabelChange(node.id, trimmed)
    }
    setEditing(false)
  }

  const handleLabelKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      saveLabel()
    }
    if (event.key === 'Escape') {
      setEditing(false)
      setLabelValue(node.label)
    }
  }

  return (
    <motion.div
      className="workflow-node"
      drag
      dragMomentum={false}
      dragElastic={0.12}
      dragConstraints={constraintsRef}
      whileDrag={{ scale: 1.01 }}
      whileHover={{ y: -2 }}
      initial={{ opacity: 0, y: 18, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.42, ease: 'easeOut' }}
      role="listitem"
      aria-label={`Workflow node ${node.label}`}
    >
      <div className="workflow-node-icon" aria-hidden="true">
        {node.icon}
      </div>
      <div className="workflow-node-content">
        {editing ? (
          <input
            ref={inputRef}
            className="workflow-node-edit-input"
            value={labelValue}
            onChange={(event) => setLabelValue(event.target.value)}
            onBlur={saveLabel}
            onKeyDown={handleLabelKeyDown}
            aria-label={`Edit workflow node label ${node.label}`}
          />
        ) : (
          <button
            type="button"
            className="workflow-node-label"
            onClick={() => setEditing(true)}
            aria-label={`Edit label for ${node.label}`}
          >
            {node.label}
          </button>
        )}
      </div>
    </motion.div>
  )
}

export default WorkflowNode
