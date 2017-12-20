// Bean class.
export class Particular {

        constructor(
                public id: number,
                public billDate: Date,
                public billNumber: string,
                public typeName: any,
                public projectName: any,
                public noOfPersons: number,
                public amount: number
        ) { }
}