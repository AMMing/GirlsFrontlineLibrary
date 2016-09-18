declare namespace AMing.Site {
    export class Index {
        asd: string;
    }
}

declare module "aming-site" {

    var index: AMing.Site.Index;
    export = index;
}