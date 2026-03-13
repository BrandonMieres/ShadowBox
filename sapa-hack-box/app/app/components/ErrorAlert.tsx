import { AlertCircle } from "lucide-react"

interface ErrorAlertProps {
  message: string
}

const ErrorAlert = ({ message }: ErrorAlertProps) => {
  return (
    <div
      className="bg-red-500 bg-opacity-20 border border-red-500 text-red-100 px-4 py-3 rounded relative mb-4"
      role="alert"
    >
      <div className="flex items-center">
        <AlertCircle className="h-5 w-5 mr-2" />
        <span className="block sm:inline">{message}</span>
      </div>
    </div>
  )
}

export default ErrorAlert
