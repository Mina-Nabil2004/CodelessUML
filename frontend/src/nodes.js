
export const initialNodes = []


export const classNode = {
  id: '0',
  type: 'class',
  position: { x: 0, y: 0 },
  data: {
    scope: "public",

    relations: {
      extendsId: null,
      implements: []
    },

    attributes: [],

    methods: [],

    constructors: []
  }
}

export const interfaceNode = {
  id: '0',
  type: 'interface',
  position: { x: 0, y: 0 },
  data: {
    scope: "public",

    relations: {
      extendsId: [],
    },

    attributes: [],

    methods: [],

  }
}

export const abstractClassNode = {
    id: '0',
    type: 'abstractClass',
    position: { x: 0, y: 0 },
    data: {
      scope: "public",
  
      relations: {
        extendsId: null,
        implements: []
      },
  
      attributes: [],
  
      methods: [],
      abstractmethods: [],
  
      constructors: []
    }
}

export const enumNode = {
  id: '0',
  type: 'enum',
  position: { x: 0, y: 0 },
  data: {
    scope: "public",

    methods: []

  }
}