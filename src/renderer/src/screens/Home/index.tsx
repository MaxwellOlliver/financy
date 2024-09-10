export function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-4xl font-bold text-center">Welcome to Electron Vite</h1>
      <p className="text-lg text-center mt-4">Build an Electron app with React and TypeScript</p>
      <div className="mt-8">
        <a
          href="https://electron-vite.org/"
          target="_blank"
          rel="noreferrer"
          className="text-blue-500 hover:underline"
        >
          Documentation
        </a>
      </div>
    </div>
  )
}
