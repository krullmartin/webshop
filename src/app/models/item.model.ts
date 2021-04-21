export class Item {
    constructor(
        public id: number,
        public title: string,
        public price: number,
        public imgSrc: string,
        public category: string,
        public barcode: number,
        public producer: string,
        public description: string,
        public isActive: boolean,
        public size: string[],
        public count: number
    ) {}
}