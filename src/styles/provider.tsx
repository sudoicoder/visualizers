import {
  MantineProvider as BaseProvider,
  type MantineProviderProps as BaseProviderProps,
} from "@mantine/core"

export const StylesProvider: React.FC<StylesProviderProps> = ({ children }) => {
  return (
    <BaseProvider
      theme={{
        colorScheme: "dark",
      }}
      withNormalizeCSS
      withGlobalStyles
    >
      {children}
    </BaseProvider>
  )
}

type StylesProviderProps = Pick<BaseProviderProps, "children">
