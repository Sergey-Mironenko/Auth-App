import { useEffect, useRef } from "react"
import { useLoading } from "./utils/hooks"

export const Loader = () => {
  const interval: any = useRef(null);
  const [text, setText] = useLoading(interval, '');

  useEffect(() => {
    setText('...');

    return () => clearInterval(interval.current);
  }, [setText]);

  return (
    <div className="main__loader">
      <h1>{text}</h1>
    </div>
  )
}