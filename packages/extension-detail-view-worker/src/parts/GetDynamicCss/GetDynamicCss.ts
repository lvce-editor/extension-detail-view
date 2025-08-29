// TODO make css specific to this component
export const getDynamicCss = (): string => {
  const fileMatchWidth = 100
  const schemaWidth = 200
  return `:root {
    --FileMatchWidth: ${fileMatchWidth}px;
    --SchemaWidth: ${schemaWidth}px;
  }`
}
