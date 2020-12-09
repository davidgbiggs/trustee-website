import React, { FormEvent } from 'react'

interface Props {
  onSubmit(event: FormEvent<HTMLFormElement>): void
  errorText: string
  className?: string
}

const BoxForm: React.FC<Props> = ({ children, onSubmit, errorText, className }) => {
  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    onSubmit(event)
  }

  return (
    <form className={`form ${className}`} onSubmit={handleSubmit}>
      <div className={errorText === 'none' ? 'alert alert-danger d-none' : 'alert alert-danger'} role="alert">
        {`${errorText}`}
      </div>
      {children}
    </form>
  )
}

export default BoxForm
