
module AMing {
    namespace Models {
        export interface Paging<T> {
            PageIndex: number;
            PageSize: number;
            PageCount: number;
            List: Array<T>;
        }
    }
    export interface PageSettings {
        /**
         * 容器
         */
        content: HTMLElement;
        /**
         * ajax地址
         */
        url: {
            /**
             * 获取列表
             */
            list: string;
            /**
             * 获取单条数据
             */
            item?: string;
        };
        /**
         * 是否是分页格式数据
         */
        is_page?: boolean;
        page_size?: number;
    }
    export interface PageArge {
        index: number;
        size: number;
    }
    export abstract class Page<Type_Model, Type_Page extends PageArge>{
        constructor(protected settings: PageSettings) {
            settings = this.defaultSettings(settings);
        }

        /**
         * 
         */
        private defaultSettings(settings: PageSettings): PageSettings {
            settings.is_page = settings.is_page || true;

            return settings;
        }
        /**
         * 
         */
        protected loading(): void {

        }
        /**
         * 
         */
        protected loaded(): void {

        }
        /**
         * 
         */
        protected getArgeList(data: Type_Page): Type_Page {
            return data;
        }
        /**
         * 
         */
        private getList(index: number) {
            var page: any = {
                index: index,
                size: this.settings.page_size
            };
            this.loading();
            var args = this.getArgeList(page);
            $.ajax({
                url: this.settings.url.list,
                data: args
            })
                .done(data => this.getListResult(data))
                .always(x => this.loaded());
        }
        /**
         * 
         */
        protected getListResult(paging: Models.Paging<Type_Model>) {
            if (!!paging) {
                this.writePage(paging);
                if (!!paging.List && paging.List.length > 0) {
                    paging.List.forEach(x => this.writeItem(x));
                }
            } else {

            }
        }
        protected writeItem(item: Type_Model): JSX.Element {
            return (
                <div>{item}</div>
            );
        }
        protected writePage(paging: Models.Paging<Type_Model>): void {

        }

    }
}