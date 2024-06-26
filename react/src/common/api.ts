export interface FigmaConnectAPI {
  /**
   * Creates Figma documentation for a React component and a Figma component. This function is used to
   * define a code example that displays in Figma when that component is selected. The function must be
   * called with a link to the figmaNode and a reference to the React component.
   *
   * @param component A reference to the React component
   * @param figmaNodeUrl A link to the node in Figma, for example:`https://www.figma.com/file/123abc/My-Component?node-id=123:456`
   * @param meta {@link FigmaConnectMeta}
   */
  connect<P = {}>(component: any, figmaNodeUrl: string, meta?: FigmaConnectMeta<P>): void

  /**
   * Maps a Figma property to a boolean value for the connected component. This prop is replaced
   * with values from the Figma instance when viewed in Dev Mode. For example:
   * ```ts
   * props: {
   *  disabled: figma.boolean('Disabled'),
   * }
   * ```
   * Would show the `disabled` property if the Figma property "Disabled" is true.
   *
   * @param figmaPropName The name of the property on the Figma component
   */
  boolean(figmaPropName: string): boolean

  /**
   * Maps a Figma boolean property to a set of values for the connected component, providing
   * a value mapping for `true` and `false`. This prop is replaced with values from the
   * Figma instance when viewed in Dev Mode. Example:
   * ```ts
   * props: {
   *  label: figma.boolean('Disabled', {
   *    true: <Label />,
   *    false: <HiddenLabel />
   *  }),
   * }
   * ```
   * Would replace `label` with `<Label />` if the Figma property "Disabled" is true.
   *
   * @param figmaPropName The name of the property on the Figma component
   * @param valueMapping A mapping of values for `true` and `false`
   */
  boolean<V extends string | boolean | number | symbol | undefined | JSX.Element>(
    figmaPropName: string,
    valueMapping?: Record<'true' | 'false', V>,
  ): ValueOf<Record<'true' | 'false', V>>

  /**
   * Maps a Figma Variant property to a set if values for the connected component. This prop is replaced
   * with values from the Figma instance when viewed in Dev Mode. For example:
   * ```ts
   * props: {
   *  type: figma.enum('Type', {
   *    Primary: 'primary',
   *     Secondary: 'secondary',
   *  }),
   * }
   * ```
   * Would output "primary" if the Type Variant in Figma is set to "Primary".
   *
   * @param figmaPropName The name of the property on the Figma component
   * @param valueMapping A mapping of values for the Figma Variant
   */
  enum<V extends string | boolean | number | symbol | undefined | JSX.Element>(
    figmaPropName: string,
    valueMapping: PropMapping<Record<string, V>>,
  ): ValueOf<Record<string, V>>

  /**
   * Maps a Figma property to a string value for the connected component. This prop is replaced
   * with values from the Figma instance when viewed in Dev Mode. For example:
   * ```ts
   * props: {
   *  text: figma.string('Text'),
   * }
   * ```
   * Would replace `text` with the text content from the Figma property "Text".
   *
   * @param figmaPropName The name of the property on the Figma component
   */
  string(figmaPropName: string): string

  /**
   * Maps a Figma instance property for the connected component. This prop is replaced
   * with values from the Figma instance when viewed in Dev Mode. For example:
   * ```ts
   * props: {
   *  icon: figma.instance('Icon'),
   * }
   * ```
   * Would show the nested examples for the component passed to the "Icon" property in Figma.
   *
   * @param figmaPropName The name of the property on the Figma component
   */
  instance(figmaPropName: string): JSX.Element

  /**
   * Maps a Figma instance layer to a nested code example. For example:
   * ```ts
   * props: {
   *  icon: figma.children('Icon')
   * }
   * ```
   * Would show the nested code example for the child instance named 'Icon'. This also supports
   * an array: `tabs: figma.children(['Tab 1', 'Tab 2'])` to map multiple nested examples.
   *
   * @param figmaPropName The name of the property on the Figma component
   */
  children(layerNames: string | string[]): JSX.Element
}

export type ValueOf<T> = T[keyof T]

export type PropMapping<T> = {
  [key in keyof T]: T[key]
}

export interface FigmaConnectLink {
  name: string
  url: string
}

// ExtraExampleT allows us to pass in an extra type to the `example` property,
// so that in Storybook, we can use strings to refer to non-hoisted functions
export interface FigmaConnectMeta<T = {}, ExtraExampleT = never> {
  /**
   * Restricts this figma connect to any variants that fullfill the given filter.
   * The filter is a map of Figma variant names to values. Example:
   * ```ts
   * {
   *  variant: { "Has Icon": true }
   * }
   */
  variant?: Record<string, string | boolean | number>

  /**
   * Prop mappings for the connected component. This is used to map the values of the component's props
   * to the values that are used in Figma, using helper functions like `Figma.boolean`. For example:
   * ```ts
   * props: {
   *   disabled: figma.boolean('Disabled'),
   *   text: figma.string('Text'),
   *   size: figma.enum('Size', {
   *     slim: 'slim',
   *     medium: 'medium',
   *     large: 'large',
   *   }),
   * }
   */
  props?: T

  /**
   * The code example to display in Figma. Any mapped `props` is passed to the component,
   * where those values will be replaced with the mapped value when inspecting that instance in Figma.
   * @param props
   * @returns
   */
  example?: ((props: T) => React.Component | JSX.Element) | ExtraExampleT

  /**
   * A list of links that will display in Figma along with the examples
   */
  links?: FigmaConnectLink[]
}
