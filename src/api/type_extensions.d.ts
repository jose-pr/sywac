declare module '../api' {
    export interface Sywac<A extends {} = {}> {
      /**
       *  Add a boolean option
       * @param flags 
       * @param opts 
       */
      boolean<N extends string, O extends TypeBooleanOption>(flags: N | N[], opts?: O): Sywac<A & ArgvExtension<O&{aliases:N},boolean>>
      /**
       * Add a boolean option
       * @param opts 
       */
      boolean<O extends ValidTypeConfig<N, TypeBooleanOption>, N extends string>(opts: O): Sywac<A & ArgvExtension<O,boolean>>
    }
  }