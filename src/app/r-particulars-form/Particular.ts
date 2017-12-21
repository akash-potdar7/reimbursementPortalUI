// Bean class.
export class Particular {

        constructor(
                public id: number,
                public billDate: Date,
                public billNumber: string,
                public rType: any,
                public projectDetail: any,
                public noOfPersons: number,
                public amount: number
        ) { }
}