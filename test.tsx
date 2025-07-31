import { createContext, FC, PropsWithChildren, useContext } from "hono/jsx"

const MyContext = createContext<{ greeting: string } | null>(null)

const ExtraDiv: FC<PropsWithChildren> = () => {
  return (
    <MyContext.Provider value={{ greeting: "I have an extra div" }}>
      <div>
        <MyConsumer />
      </div>
    </MyContext.Provider>
  )
}

const NoExtraDiv: FC<PropsWithChildren> = () => {
  return (
    <MyContext.Provider value={{ greeting: "I do not have an extra div" }}>
      <MyConsumer />
    </MyContext.Provider>
  )
}

const ExtraDivAsComponent: FC = () => {
  return (
    <MyContext.Provider value={{ greeting: "I have an extra div as a component" }}>
      <Box>
        <MyConsumer />
      </Box>
    </MyContext.Provider>
  )
}

const Box = ({ children }: PropsWithChildren) => {
  return <div class="box">{children}</div>
}

const MyConsumer: FC = () => {
  const context = useContext(MyContext)
  if (!context) {
    return <div>No context provided</div>
  }
  return <div>{context.greeting}</div>
}

const MyComponent: FC = () => {
  return (
    <div>
      <NoExtraDiv />
      <ExtraDivAsComponent />
      <ExtraDiv />
    </div>
  )
}

console.log(MyComponent().toString())

