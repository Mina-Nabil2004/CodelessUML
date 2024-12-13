
export const initialNodes = [
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
   }
 ]
 