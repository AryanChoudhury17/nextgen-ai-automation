import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import PromptChip from './PromptChip'
import WorkflowVisualizer from './WorkflowVisualizer'
import { Sparkles } from 'lucide-react'

const promptExamples = [
  'Summarize uploaded PDFs',
  'Process incoming invoices',
  'Automate order processing',
  'Analyze security logs',
  'Customer support chatbot',
  'Generate weekly reports'
]

const workflows = {
  security: [
    { icon: '📥', label: 'Log Collection' },
    { icon: '🛡️', label: 'Threat Detection' },
    { icon: '⚡', label: 'Risk Scoring' },
    { icon: '📊', label: 'SOC Dashboard' }
  ],
  pdf: [
    { icon: '📤', label: 'Upload PDF' },
    { icon: '🧾', label: 'OCR' },
    { icon: '🧠', label: 'AI Summary' },
    { icon: '📦', label: 'Export Report' }
  ],
  customer: [
    { icon: '📥', label: 'Receive Query' },
    { icon: '🤖', label: 'AI Response' },
    { icon: '📚', label: 'Knowledge Base' },
    { icon: '✅', label: 'Close Ticket' }
  ],
  generic: [
    { icon: '📥', label: 'Receive Email' },
    { icon: '📄', label: 'Extract Invoice' },
    { icon: '🧠', label: 'AI Validation' },
    { icon: '📊', label: 'Save to Google Sheets' },
    { icon: '📧', label: 'Notify Finance Team' },
    { icon: '✅', label: 'Workflow Complete' }
  ]
}

const mockTypingLines = [
  'Analyzing your process...',
  'Mapping workflow nodes...',
  'Building automation path...',
  'Ready to deploy in seconds.'
]

function selectWorkflow(prompt) {
  const query = prompt.toLowerCase()
  if (query.includes('security')) return workflows.security
  if (query.includes('pdf')) return workflows.pdf
  if (query.includes('customer')) return workflows.customer
  return workflows.generic
}

function AIWorkflowGenerator() {
  const [prompt, setPrompt] = useState('')
  const [selectedExample, setSelectedExample] = useState(null)
  const [loading, setLoading] = useState(false)
  const [generatedNodes, setGeneratedNodes] = useState([])
  const [typingText, setTypingText] = useState('')
  const [canvasScale, setCanvasScale] = useState(1)

  const examplePrompt = useMemo(() => {
    return promptExamples.reduce((current, item) => {
      if (prompt.toLowerCase().includes(item.toLowerCase().split(' ')[0])) {
        return item
      }
      return current
    }, '')
  }, [prompt])

  const handleExampleClick = (example) => {
    setPrompt(example)
    setSelectedExample(example)
  }

  const handleGenerate = () => {
    if (!prompt.trim()) return
    setLoading(true)
    setGeneratedNodes([])
    setTypingText(mockTypingLines[0])

    const typingSequence = [
      { text: mockTypingLines[0], delay: 500 },
      { text: mockTypingLines[1], delay: 1000 },
      { text: mockTypingLines[2], delay: 1500 },
      { text: mockTypingLines[3], delay: 2000 }
    ]

    typingSequence.forEach(({ text }, index) => {
      setTimeout(() => {
        setTypingText(text)
      }, typingSequence[index].delay)
    })

    setTimeout(() => {
      const workflow = selectWorkflow(prompt)
      setGeneratedNodes(
        workflow.map((item, index) => ({
          id: `${item.label}-${index}`,
          icon: item.icon,
          label: item.label
        }))
      )
      setLoading(false)
      setTypingText('Workflow ready!')
    }, 2200)
  }

  const updateNodeLabel = (id, updatedLabel) => {
    setGeneratedNodes((current) =>
      current.map((node) => (node.id === id ? { ...node, label: updatedLabel } : node))
    )
  }

  const changeScale = (step) => {
    setCanvasScale((current) => Math.min(1.4, Math.max(0.82, current + step)))
  }

  return (
    <section className="section-wrap ai-workflow-section" id="workflow-generator">
      <motion.div
        className="section-heading"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <span className="section-label">AI Workflow Generator</span>
        <h2>Create intelligent workflows from plain language</h2>
        <p>Describe your business process in natural language and let AI generate an automation workflow in seconds.</p>
      </motion.div>

      <motion.div
        className="workflow-shell"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.08 }}
      >
        <div className="workflow-panel workflow-input-panel">
          <div className="panel-header">
            <span className="panel-title">Describe your process</span>
            <span className="panel-subtitle">Start with a simple prompt or pick an example.</span>
          </div>

          <label htmlFor="workflow-prompt" className="visually-hidden">
            Workflow prompt description
          </label>
          <textarea
            id="workflow-prompt"
            className="workflow-textarea"
            value={prompt}
            onChange={(event) => {
              setPrompt(event.target.value)
              setSelectedExample(null)
            }}
            placeholder="e.g. I receive invoices by email. Extract the invoice information. Store it in Google Sheets. Notify my finance team."
            rows={10}
            aria-label="Describe your business process"
          />

          <div className="prompt-chip-grid" role="group" aria-label="Example prompts">
            {promptExamples.map((example) => (
              <PromptChip
                key={example}
                label={example}
                active={selectedExample === example}
                onClick={() => handleExampleClick(example)}
              />
            ))}
          </div>

          <div className="cta-row">
            <button
              type="button"
              className="btn-primary workflow-generate-btn"
              onClick={handleGenerate}
              disabled={loading}
            >
              {loading ? 'Generating...' : 'Generate Workflow'}
            </button>
            <span className="workflow-hint">Example input shown after generation.</span>
          </div>

          <div className="workflow-status">
            <div className={`progress-bar ${loading ? 'active' : ''}`} aria-hidden="true" />
            <p className="typing-label">{loading ? typingText : 'Ready to create your workflow'}</p>
          </div>
        </div>

        <div className="workflow-panel workflow-preview-panel" aria-live="polite">
          <div className="preview-header">
            <div>
              <span className="panel-title">Generated workflow</span>
              <p className="panel-subtitle">Visual AI workflow preview with animated nodes and connectors.</p>
            </div>
            <div className="badge-glow">
              <Sparkles size={16} /> Live demo
            </div>
          </div>

          <div className="workflow-preview-card">
            <div className="canvas-controls">
              <span className="canvas-scale-label">Zoom</span>
              <div className="zoom-buttons">
                <button type="button" className="zoom-btn" onClick={() => changeScale(-0.08)} aria-label="Zoom out">
                  −
                </button>
                <button type="button" className="zoom-btn" onClick={() => changeScale(0.08)} aria-label="Zoom in">
                  +
                </button>
              </div>
              <span className="canvas-scale-value">{Math.round(canvasScale * 100)}%</span>
            </div>
            {generatedNodes.length > 0 ? (
              <WorkflowVisualizer nodes={generatedNodes} scale={canvasScale} onNodeLabelChange={updateNodeLabel} />
            ) : (
              <div className="workflow-empty-state">
                <p>Enter a prompt and click <strong>Generate Workflow</strong> to see the AI builder in action.</p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default AIWorkflowGenerator
