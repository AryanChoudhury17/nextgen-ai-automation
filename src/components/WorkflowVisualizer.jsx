import { useRef } from 'react'
import { AnimatePresence } from 'framer-motion'
import WorkflowNode from './WorkflowNode'
import WorkflowArrow from './WorkflowArrow'

function WorkflowVisualizer({ nodes, scale = 1, onNodeLabelChange }) {
  const canvasRef = useRef(null)

  return (
    <div className="workflow-canvas-shell" role="list" aria-label="Generated workflow steps">
      <div className="workflow-canvas-wrapper">
        <div ref={canvasRef} className="workflow-canvas" style={{ transform: `scale(${scale})` }}>
          <AnimatePresence initial={false}>
            {nodes.map((item, index) => (
              <div key={item.id} className="workflow-step">
                <WorkflowNode
                  node={item}
                  delay={index * 0.12}
                  onLabelChange={onNodeLabelChange}
                  constraintsRef={canvasRef}
                />
                {index < nodes.length - 1 && <WorkflowArrow delay={index * 0.12 + 0.12} />}
              </div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default WorkflowVisualizer
