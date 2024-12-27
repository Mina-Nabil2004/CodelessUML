
export const initialNodes = []


export const classNode = {
  id: '0',
  type: 'class',
  position: { x: 350, y: 200 },
  data: {
    name: "Class",
    package: "src",
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
  position: { x: 350, y: 200 },
  data: {
    name: "Interface",
    package: "src",
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
  position: { x: 350, y: 200 },
  data: {
    name: "AbstractClass",
    package: "src",
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
  position: { x: 350, y: 200 },
  data: {
    name: "Enum",
    package: "src",
    scope: "public",

    attributes: []

  }
}





export const initialNodes2 = [
  {
    id: '1',
    type: 'class',
    position: { x: 100, y: 100 },
    data: {
      scope: "public",

      relations: {
        extendsId: 3,
        implements: [5, 2, 8, 9, 7]
      },

      attributes: [
        {
          type: "String",
          name: "car",
          scope: "public",
          isStatic: false,
          getter: false,
          setter: false,
          final: false
        },
        {
          type: "String",
          name: "car2",
          scope: "private",
          isStatic: false,
          getter: false,
          setter: false,
          final: false
        }
      ],

      methods: [
        {
          name: "findName",
          returnType: "int",
          scope: "public",
          isStatic: false,
          parameters: [{ "type": "int", "name": "amount" }, { "type": "String", "name": "param" }]
        }
      ],

      constructors: [
        {
          scope: "public",
          parameters: [{ "type": "int", "name": "amount" }, { "type": "String", "name": "param" }]
        }
      ]
    }
  },
  {
    id: '2',
    type: 'class',
    position: { x: 200, y: 200 },
    data: {
      scope: "public",

      relations: {
        extendsId: 3,
        implements: [5, 2, 8, 9, 7]
      },

      attributes: [
        {
          type: "String",
          name: "car",
          scope: "public",
          isStatic: false,
          getter: false,
          setter: false,
          final: false
        },
        {
          type: "String",
          name: "car2",
          scope: "private",
          isStatic: false,
          getter: false,
          setter: false,
          final: false
        }
      ],

      methods: [
        {
          name: "findName",
          returnType: "int",
          scope: "public",
          isStatic: false,
          parameters: [{ "type": "int", "name": "amount" }, { "type": "String", "name": "param" }]
        }
      ],

      constructors: [
        {
          scope: "public",
          parameters: [{ "type": "int", "name": "amount" }, { "type": "String", "name": "param" }]
        }
      ]
    }
  },
  {
    id: '3',
    type: 'class',
    position: { x: 300, y: 300 },
    data: {
      scope: "public",

      relations: {
        extendsId: 3,
        implements: [5, 2, 8, 9, 7]
      },

      attributes: [
        {
          type: "String",
          name: "car",
          scope: "public",
          isStatic: false,
          getter: false,
          setter: false,
          final: false
        },
        {
          type: "String",
          name: "car2",
          scope: "private",
          isStatic: false,
          getter: false,
          setter: false,
          final: false
        }
      ],

      methods: [
        {
          name: "findName",
          returnType: "int",
          scope: "public",
          isStatic: false,
          parameters: [{ "type": "int", "name": "amount" }, { "type": "String", "name": "param" }]
        }
      ],

      constructors: [
        {
          scope: "public",
          parameters: [{ "type": "int", "name": "amount" }, { "type": "String", "name": "param" }]
        }
      ]
    }
  }
]