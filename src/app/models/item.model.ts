export class Item {
    constructor(
        public title: string,
        public price: number,
        public imgSrc: string,
        public category: string,
        public barcode: number,
        public producer: string,
        public description: string
    ) {}
}